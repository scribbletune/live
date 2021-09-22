/* eslint-disable react/jsx-no-bind */ // TODO: Fix arrow function props
/* eslint-disable react/jsx-props-no-spreading */

import { ApolloClient, ApolloProvider, InMemoryCache, useQuery, useMutation } from '@apollo/client';
import { ApolloLink } from '@apollo/client/core';
import { Query } from '@apollo/client/react/components';
import { onError } from '@apollo/client/link/error';
import { ImFileMusic, FiSave } from 'react-icons/all';
import React, { useState } from 'react';
import { Container, Button, Row, Col, Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as Tone from 'tone';
// import { Session, arp, scale } from 'scribbletune/browser'; // Webpack has difficulty loading from git repo
import browser from 'scribbletune/browser';

import Dropzone from 'react-dropzone';
// import { ExecutionResult } from 'graphql';
import Observable from 'zen-observable';
import { saveAs } from 'file-saver';

import {
  GET_IS_PLAYING,
  GET_DATA,
  WRITE_DATA,
  SET_VOLUME,
  STOP_CLIP,
  PLAY_CLIP,
  PLAY_ROW,
  START_STOP_TRACK,
  SET_TRANSPORT_TEMPO,
} from './gql';
import introspectionResult from './schema-introspection.json';

import NumberWithSpinners from './components/NumberWithSpinners';
import Transport from './components/Transport';
import Channel from './components/Channel';
import Master from './components/Master';
import ClipEditor from './components/ClipEditor';

import getResolvers from './resolvers';

import { getToneMonoSynth, samplers } from './sounds';
import PlayOnJZZ from './PlayOnJZZ';
import PlayOnSoundfontPlayer from './PlayOnSoundfontPlayer';
import PlayOnWebMidi from './PlayOnWebMidi';

// Gather loadable tracks on open.
import allTrackFiles from './tracks';

const { Session, arp, scale } = browser;

const appVersion = 'v0.0.1'; // TODO: extract from package.json (using Webpack plugins?)
const appRelease = 'build-2021-0824';
const appCopyright = '(c) 2021';

const connectToDevTools = process.env.NODE_ENV !== 'production';

window.Tone = Tone; // For the scribbletune lib to pick up the instance.
window.TrackLoadMethods = {
  // Mechanism for the loadable track file to deliver its functions
  sectionName: 'track',
};
const trackServiceProviders = {
  // Providers for the loadable track file functions
  scribbletune: {
    // from 'scribbletune/browser'

    arp,
    // ? chords, // from 'scribbletune/browser'
    scale, // from 'scribbletune/browser'
  },
  sounds: {
    // from './sounds'

    samplers,
    getToneMonoSynth,
  },
  PlayOnJZZ, // from './PlayOnJZZ'
  PlayOnSoundfontPlayer, // from './PlayOnSoundfontPlayer'
  PlayOnWebMidi, // from './PlayOnWebMidi'
};

let currentFileState = {};
let currentFileTrackSession;

/**
 * Introspection for devtools
 * Serves introspection operations. For example, the Apollo Client
 * Chrome Devtool issues an introspection operation when it opens
 * in order to display the schema.
 */
const introspectionLink =
  connectToDevTools &&
  new ApolloLink((operation, forward) => {
    switch (operation.operationName.toLowerCase()) {
      case 'introspectionquery':
        // ts: return new Observable<ExecutionResult>((subscriber) => {
        return new Observable((subscriber) => {
          subscriber.next({ data: introspectionResult });
          subscriber.complete();
        });
      default:
        break;
    }
    if (forward) {
      return forward(operation);
    }
    throw new Error(`Unable to handle operation ${operation.operationName}`);
  });
/** END introspection for devtools */

const mutationObservers = {
  setChannelVolume: (channelIdx, volume) => {
    currentFileTrackSession?.channels[channelIdx]?.setVolume(volume);
  },

  startChannelClip: (channelIdx, clipIdx) => {
    currentFileTrackSession?.channels[channelIdx]?.startClip(clipIdx);
  },

  stopChannelClip: (channelIdx, clipIdx) => {
    currentFileTrackSession?.channels[channelIdx]?.stopClip(clipIdx);
  },

  setTransportTempo: (bpmValue) => {
    currentFileTrackSession?.setTransportTempo(bpmValue);
  },

  startTransport: () => {
    currentFileTrackSession?.startTransport();
  },

  stopTransport: () => {
    currentFileTrackSession?.stopTransport();
  },
};

const resolvers = getResolvers(mutationObservers);
const stateCache = new InMemoryCache({
  typePolicies: {
    Channel: {
      keyFields: ['idx'],
    },
    Query: {
      fields: {
        channels: (ref, { args, cache }) => {
          if (ref) return ref;
          return resolvers.Query.channels(ref, args, { cache });
          // resolvers.Query.x are not called by @apollo/client/@3.4.8
        },
      },
    },
  },
});
const defaultOptions = {
  // The useQuery hook uses Apollo Client's watchQuery function
  watchQuery: {
    fetchPolicy: 'cache-only', // 'cache-and-network',
    errorPolicy: 'all', // 'ignore',
  },
  query: {
    fetchPolicy: 'cache-only', // 'network-only',
    errorPolicy: 'all',
  },
  mutate: {
    errorPolicy: 'all',
  },
};
const apolloLinks = [
  // Error handler
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
      );
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  }),
];
if (introspectionLink) {
  apolloLinks.push(introspectionLink); // For debugging, forwards schema to Chrome Apollo Devtools extension
}
const client = new ApolloClient({
  // uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  cache: stateCache,
  link: ApolloLink.from(apolloLinks),
  // typeDefs, // typeDefs don't seem to make a difference. Schema file in apollo.config.js and introspectionLink do.
  defaultOptions,
  resolvers,
  connectToDevTools,
});
// console.log('DEBUG: process.env.NODE_ENV=%o', process.env.NODE_ENV);
// console.log('DEBUG: window.__APOLLO_CLIENT__=%o', window.__APOLLO_CLIENT__);

const getToasterType = (icon) => {
  switch (icon) {
    case 'error':
      return toast.TYPE.ERROR; // BiError
    case 'success':
      return toast.TYPE.SUCCESS; // BiCheckCircle
    case 'info':
      return toast.TYPE.INFO; // BiInfoCircle
    case 'warn':
    case 'warning':
      return toast.TYPE.WARNING;
    default:
      return toast.TYPE.DEFAULT;
  }
};
const newToast = (icon, title, text, details, duration = 30000) => {
  toast(
    <>
      <h5 as="div" className="text-title">
        {title}
      </h5>
      {text}
      <div className="text-muted">{details}</div>
    </>,
    {
      type: getToasterType(icon),
      autoClose: duration,
      theme: 'dark',
    }
  );
};

const setChState = (channelIdx, state, error, cache) => {
  const existingData = cache.readQuery({
    query: GET_DATA,
  });
  if (existingData?.channels) {
    const newChannels = existingData.channels?.map((ch) => {
      const newChannel = { ...ch };
      if (ch.idx === channelIdx) {
        newChannel.state = state;
        newChannel.error = { message: error?.message || '', stack: error?.stack || '' };
        // set channel state
      }
      return newChannel;
    });
    cache.writeQuery({
      query: WRITE_DATA,
      data: { channels: newChannels },
    });
  }
};

const onChannelEvent = (event, params) => {
  // Receive async events from scribbletune
  switch (event) {
    case 'error':
      {
        const { e, channel } = params;
        if (e && channel) {
          console.log(e);
          setChState(channel?.idx, 'error', e, stateCache);
        } else {
          console.log('Error: params=%o', params);
        }
      }
      break;
    case 'loaded':
      {
        const { channel } = params;
        if (channel) {
          console.log('Loaded channel idx %o "%o"', channel.idx, channel.name);
          setChState(channel?.idx, 'loaded', null, stateCache);
        } else {
          console.log('Loaded: params=%o', params);
        }
      }
      break;
    default:
      console.log('onChannelEvent() event=%o params=%o', event, params);
  }
};

let globalLogNotes = false;
const onPlayerEvent = (params) => {
  const { note, duration, time, counter, channel } = params;
  if (globalLogNotes) {
    console.log(
      'Player(%o chIdx=%o note=%o dur=%o delay=%o, counter=%o)',
      channel?.name,
      channel?.idx,
      note,
      duration,
      time,
      counter
    );
  }
};

const setCurrentFile = (state) => {
  currentFileState = state;
  // TODO setCurrentFileIsDirty(state.isDirty); // currentFileIsDirty
  // We have a hacky arrangement to pre-load an example track file before App().
  // We should properly use setCurrentFileIsDirty() which is only available inside App().
  // However, for pre-load, openTrack() should be on top level, so can't access setCurrentFileIsDirty().
  // Instead, we save to currentFileState.isDirty and App() initializes local state with it.
};
const openTrack = (file, fileName, fileText, fileData, setCurrentFileFnc, cache) => {
  currentFileTrackSession?.stopTransport();
  setCurrentFileFnc({
    file: false,
    name: '(none)',
    text: '',
    data: {},
    isDirty: false,
  });
  currentFileTrackSession = {};

  const track = {
    ...fileData,
    channels: fileData.channels.map((ch, idx) => {
      if (ch.external) {
        ch.external = {
          ...ch.external,
          __typename: 'ExternalOutput',
        };
      }
      ch.clips = ch.clips.map((c) => ({
        pattern: '',
        ...c,
        ...{ clipStr: c.pattern ? JSON.stringify(c) : "''" },
        __typename: 'Clip',
      }));
      return {
        ...ch,
        __typename: 'Channel',
        activeClipIdx: -1,
        idx,
        state: 'loading',
        error: { message: '', stack: '' },
      };
    }),
  };

  // if (track.leadSheet) {}
  track.tempoBpm = track.leadSheet?.tempoBpm || track.tempoBpm || 120;

  const channels = track.channels.map((ch) => {
    let countClipStrClipsUsed = 0;
    let countPatternClipsUsed = 0;
    const channelClips = ch.clips.map((cl, idx) => {
      try {
        if (cl.pattern) {
          countPatternClipsUsed += cl.pattern.length > 0;
        } else if (cl.clipStr) {
          countClipStrClipsUsed += cl.clipStr !== "''" && cl.clipStr.length > 0 ? 1 : 0;
          const clipObj = JSON.parse(cl.clipStr);
          [
            'pattern',
            'notes',
            'randomNotes',
            'dur',
            'subdiv',
            'shuffle',
            'arpegiate',
            'amp',
            'sizzle',
            'accent',
            'accentLow',
            'sizzleReps',
            // 'durations', // - internal
            // 'offlineRendering', 'offlineRenderingCallback',
          ].forEach((key) => {
            if (clipObj[key]) {
              cl[key] = clipObj[key];
            }
          });
          if (!clipObj['pattern']) {
            console.log('Channel %o clip #%o uses clipStr but has no pattern', ch.name, idx);
          }
        }
      } catch (e) {
        if (cl.clipStr !== "''") {
          console.log('Channel %o clip #%o Error %o', ch.name, idx, e);
        }
      }
      return cl;
    });
    console.log(
      'Channel %o has %o clips with clipStr and %o clips with pattern',
      ch.name,
      countClipStrClipsUsed,
      countPatternClipsUsed
    );
    ch.clips = channelClips;
    ch.eventCb = onChannelEvent;
    ch.playerCb = onPlayerEvent;
    return ch;
  });
  const session = new Session(channels);

  // Prune all props not in allowedTrackProps
  const allowedTrackProps = ['channels', 'isPlaying', 'tempoBpm', 'leadSheet']; // TODO: Implement extracting of all prop names from GQL schema.
  Object.getOwnPropertyNames(track)
    .filter((name) => !allowedTrackProps.includes(name))
    .forEach((name) => {
      track[name] = undefined;
      console.log(`Unknown property "${name}" in file "${fileName}" track data.`);
    });

  cache.writeQuery({
    query: WRITE_DATA,
    data: {
      ...track,
      isPlaying: false,
      // isConnected: true, // Example monitoring network connection
    },
  });
  setCurrentFileFnc({
    file,
    name: fileName,
    text: fileText,
    data: fileData,
    isDirty: true, // TODO: WIP: false; // Or, maybe example track should be Save-able (as a template)? Then make button "SaveAs" or export? UX decision.
  });
  currentFileTrackSession = session;
};

const loadData = (file, name, data, text, setCurrentFileFnc) => {
  if (!data || !data.getTrack) {
    // console.log('Failed loading file "%o", no valid data=%o', fileName, fileData);
    newToast(
      'error',
      'Error',
      `Failed loading file "${name}"`,
      `No valid track. File format should use window.TrackLoadMethods to install getTrack`
    );
    return;
  }
  // 3. Execute .getTrack from the file
  // console.log('Loaded file "%o", data=%o, executing...', fileName, fileData);
  try {
    data.track = data.getTrack(trackServiceProviders);
  } catch (e) {
    // console.log('Failed loading file "%o", execution error=%o', fileName, e);
    newToast('error', 'Error', `Failed getting data from file "${name}"`, `Error ${e.message}`);
    return;
  }
  // 4. Load track data into session
  // console.log('Executed file "%o", track=%o', fileName, fileData.track);
  openTrack(file, name, text, data.track, setCurrentFileFnc, stateCache);
  newToast('success', 'Success', `Loaded file "${name}"`, `Track data loaded Ok.`);
};

// Load embedded example file
// console.log('DEBUG allTrackFiles=%o', allTrackFiles);
loadData(null, allTrackFiles[0].name, allTrackFiles[0].data, allTrackFiles[0].text, setCurrentFile);
// TODO: Add UI menu to open any of the examples.

const enableSidebar = true; // WIP
const enableMenubar = true; // WIP

// React hook for scribbletune transport start/stop // TODO: remove
function useScribbletuneIsPlaying(store) {
  // const { loading, error, data } = useQuery(GET_IS_PLAYING, { client: store });
  const { data } = useQuery(GET_IS_PLAYING, { client: store });
  // Compare time between direct intercept (in resolvers.js) and called from React hook (here)
  // The delay here is 10ms.
  // if (data.isPlaying) {
  //   currentFileTrackSession?.startTransport();
  // } else {
  //   currentFileTrackSession?.stopTransport();
  // }
  return data.isPlaying;
}

function App() {
  // console.log('REDRAW: App');
  const [setVolume] = useMutation(SET_VOLUME, { client });
  const [stopClip] = useMutation(STOP_CLIP, { client });
  const [playClip] = useMutation(PLAY_CLIP, { client });
  const [playRow] = useMutation(PLAY_ROW, { client });
  const [startStopTrack] = useMutation(START_STOP_TRACK, { client });
  const [setTransportTempo] = useMutation(SET_TRANSPORT_TEMPO, { client });

  // Some local state variables (not using context or Apollo)
  const [currentFileIsDirty, setCurrentFileIsDirty] = useState(currentFileState.isDirty);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showGears, setShowGears] = useState(false);
  const [showModal, setShowModal] = useState({ show: false, clip: {} });
  const [logNotes, setLogNotes] = useState(globalLogNotes);

  // Experiment: Control scribbletune here instead of in resolvers.js
  useScribbletuneIsPlaying(client);

  const onSidebarClose = () => setShowSidebar(false);
  const onSidebarOpen = () => setShowSidebar(true);
  const handleShowGearsChangeEvent = () => {
    setShowGears(!showGears);
  };
  const handleLogNotesChangeEvent = () => {
    setLogNotes(!logNotes);
    globalLogNotes = !logNotes;
  };
  const handleBpmValueChangeEvent = (value) => {
    setTransportTempo({ variables: { tempoBpm: +value } });
  };

  const loadScript = (urlOrFilePath, fileName, file, sectionName, fileText, onLoad) => {
    window.TrackLoadMethods[sectionName] = undefined;
    window.TrackLoadMethods.sectionName = sectionName; // Tell the loadable script where to post its data
    const script = document.createElement('script');
    script.src = urlOrFilePath;
    script.type = 'application/javascript';
    script.async = true;
    script.addEventListener('load', () => {
      onLoad(file, fileName, window.TrackLoadMethods[sectionName], fileText, (state) => {
        setCurrentFileIsDirty(state.isDirty);
        setCurrentFile(state);
      });
      document.body.removeChild(script);
    });
    document.body.appendChild(script); // Initiates script loading
  };
  const onFileOpen = (files) => {
    // console.log('onFileOpen() files=%o', files);
    const file = files[0];
    // eslint-disable-next-line compat/compat
    const filePath = (window.URL || window.webkitURL).createObjectURL(file);

    // 1. Read raw text file contents
    const reader = new FileReader();
    reader.onload = () => {
      // console.log(reader.result);
      const fileText = reader.result;
      // 2. Load the script
      loadScript(filePath, file.name, file, 'track', fileText, loadData);
    };
    reader.onerror = () => {
      newToast('error', 'Error', `Failed reading file "${file.name}"`, `Error ${reader.error}`);
      // console.log(reader.error);
    };
    reader.readAsText(file); // Initiates file reading
  };
  const onFileOpenReject = (rejectedFiles) => {
    // console.log('onFileOpenReject() rejectedFiles=%o', rejectedFiles);
    newToast(
      'error',
      'Error',
      `Cannot open file(s) "${rejectedFiles.map((f) => f.file.name).join('", "')}"`,
      rejectedFiles.length > 0
        ? `Can only open 1 file, but ${rejectedFiles.length} files given.`
        : 'Wrong file type / extension, expected ".js"'
    );
  };
  const handleFileSave = () => {
    // console.log('handleFileSave()');
    if (currentFileState.text?.length > 0) {
      // const blob = new Blob(['Hello, world!'], { type: 'text/plain;charset=utf-8' });
      // const blob = new Blob([currentFileState.text], { type: 'text/plain;charset=utf-8' });
      // const blob = new Blob([currentFileState.text], { type: 'text/javascript;charset=utf-8' });
      const blob = new Blob([currentFileState.text], { type: 'application/javascript;charset=utf-8' });
      saveAs(blob, currentFileState.name || '');
    }
    setCurrentFileIsDirty(false); // currentFileIsDirty = false;
  };

  const onHideModal = () => {
    setShowModal({ show: false, clip: {} });
  };
  const ClipEditorModal = () => (
    <Modal show={showModal.show} onHide={onHideModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          Edit Clip {showModal.clip?.idx} Channel {showModal.clip?.channelIdx} {showModal.clip?.channelName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ClipEditor clip={showModal.clip} />
        {/* <textarea
            id="clipCode"
            onChange={e => setClipStr(e.target.value)}
            value={clip.clipStr}
          /> */}
      </Modal.Body>
    </Modal>
  );

  let channelsCnt;
  let clipsCnt;
  return (
    <ApolloProvider client={client}>
      <Query query={GET_DATA}>
        {({ data: { channels, isPlaying, tempoBpm } }) => {
          channelsCnt = channels.length;
          clipsCnt = channels.reduce(
            (acc, ch) => (acc === undefined || acc < ch.clips.length ? ch.clips.length : acc),
            0
          );

          return (
            <Container fluid>
              <Row md={12} className="">
                <Col md={12}>
                  <Navbar bg="primary" variant="dark" className="toolbar">
                    {enableSidebar && (
                      <>
                        <Offcanvas show={showSidebar} onHide={onSidebarClose}>
                          <Container fluid>
                            <Row md={12} className="mb-0">
                              <Col md={12}>
                                <Navbar bg="primary" variant="dark" className="toolbar">
                                  <Button onClick={onSidebarClose} className="navbar-toggler-custom btn-sidebar-close">
                                    <span className="navbar-toggler-icon" />
                                  </Button>
                                  <Navbar.Brand href="#home">
                                    <img src="logo192.png" className="d-inline-block" alt="Live logo" />
                                    <span>Live Scribble</span>
                                  </Navbar.Brand>
                                  <Navbar.Text>{appVersion}</Navbar.Text>
                                </Navbar>
                              </Col>
                            </Row>
                            <Row>
                              <Col className="me-1">
                                <p className="text-start fst-italic text-muted">
                                  <small>{appCopyright}</small>
                                </p>
                              </Col>
                              <Col className="me-1">
                                <p className="text-end fst-italic text-muted">
                                  <small>{appRelease}</small>
                                </p>
                              </Col>
                            </Row>
                          </Container>
                          <Offcanvas.Body>
                            <ListGroup>
                              <ListGroup.Item>Uno</ListGroup.Item>
                              <ListGroup.Item>Dos</ListGroup.Item>
                              <ListGroup.Item>Tres</ListGroup.Item>
                              <ListGroup.Item>About</ListGroup.Item>
                            </ListGroup>
                          </Offcanvas.Body>
                        </Offcanvas>
                        <Button onClick={onSidebarOpen} className="navbar-toggler-custom btn-sidebar-open">
                          <span className="navbar-toggler-icon" />
                        </Button>
                      </>
                    )}

                    <Navbar.Brand href="#home">
                      <img src="logo192.png" className="d-inline-block" alt="Live logo" />
                      <span>Live Scribble</span>
                    </Navbar.Brand>

                    {enableMenubar && (
                      <>
                        <Nav className="me-auto">
                          <Nav.Link href="#home">Home</Nav.Link>
                          <Nav.Link href="#features">Features</Nav.Link>
                        </Nav>
                      </>
                    )}

                    <Navbar.Text>
                      <Form>
                        <Form.Switch
                          onChange={handleShowGearsChangeEvent}
                          id="custom-switch"
                          label="⚙"
                          checked={showGears}
                        />
                        <Form.Switch
                          onChange={handleLogNotesChangeEvent}
                          id="custom-switch"
                          label="log"
                          checked={logNotes}
                        />
                      </Form>
                    </Navbar.Text>

                    <Navbar.Collapse className="justify-content-end">
                      <Nav className="file">
                        <Dropzone
                          onDropRejected={(rejectedFiles) => onFileOpenReject(rejectedFiles)}
                          onDropAccepted={(acceptedFiles) => onFileOpen(acceptedFiles)}
                          accept={
                            [
                              'text/javascript',
                              'application/javascript',
                            ] /* see https://react-dropzone.js.org/#section-components */
                          }
                          maxFiles={1}
                        >
                          {({ getRootProps, getInputProps, isDragActive }) => (
                            <div {...getRootProps()}>
                              <Nav.Link className="file-name">
                                <input {...getInputProps()} />

                                {
                                  // TODO: untangle
                                  // eslint-disable-next-line no-nested-ternary
                                  isDragActive ? (
                                    '> Drop File Here <'
                                  ) : currentFileState.name ? (
                                    <>
                                      <ImFileMusic size="1.25rem" /> {currentFileState.name}
                                    </>
                                  ) : (
                                    'Open File'
                                  )
                                }
                              </Nav.Link>
                            </div>
                          )}
                        </Dropzone>
                        {currentFileIsDirty && (
                          <Nav.Link className="file-dirty" onClick={handleFileSave}>
                            <FiSave size="1.25rem" /> Save
                          </Nav.Link>
                        )}
                      </Nav>

                      <Navbar.Text className="field-bpm">
                        <Form>
                          <NumberWithSpinners
                            value={tempoBpm}
                            setValue={handleBpmValueChangeEvent}
                            units="bpm"
                            controlId="bpm"
                            repeatingBtnSlowTimeMs="200"
                            repeatingBtnFastTimeMs="100"
                            repeatingBtnFastDelayMs="2000"
                          />
                        </Form>
                      </Navbar.Text>

                      <Navbar.Text className="transport">
                        <Transport isPlaying={isPlaying} startStopTrack={startStopTrack} />
                      </Navbar.Text>
                    </Navbar.Collapse>
                  </Navbar>
                </Col>
              </Row>
              <Row>
                {channelsCnt &&
                  channels.map((channel) => (
                    <Channel
                      channel={channel}
                      key={channel.idx}
                      showGears={showGears}
                      setShowModal={setShowModal}
                      setVolume={setVolume}
                      stopClip={stopClip}
                      playClip={playClip}
                    />
                  ))}
                <Master count={channelsCnt && clipsCnt} playRow={playRow} />
              </Row>

              <ClipEditorModal />
              <ToastContainer hideProgressBar="true" />
            </Container>
          );
        }}
      </Query>
    </ApolloProvider>
  );
}

export default App;
