import React, { useCallback } from 'react';
// import PropTypes from 'prop-types'; // npm install --save prop-types
import { Col } from 'react-bootstrap';
// import * as Tone from 'tone';
import Clip from './Clip';
import ChannelState from './ChannelState';

// React hook for scribbletune channel volume
// function useScribbletuneGetVolume(channelIdx, store) {
//   const { loading, error, data } = useQuery(GET_VOLUME, {
//     variables: { channelIdx },
//     client: store,
//   });
//   console.log(
//     'useScribbletuneGetVolume(%o) @%o loading=%o error=%o data=%o volume=%o',
//     channelIdx,
//     Tone.now(),
//     loading,
//     error,
//     data,
//     data?.channels[0]?.volume
//   );
//   return data?.channels[0]?.volume;
// }

function Channel({ channel, showGears, setShowModal, setVolume, stopClip, playClip }) {
  // console.log('REDRAW: Channel %s volume=%s %o', channel.idx, channel.volume, channel);
  // useScribbletuneGetVolume(channel.idx); // Using volume here to set scribbletune channel volume is possiblem but this approach adds 10ms latency vs. observer in resolvers.js

  // Pattern: "avoid binding arrow functions in render"
  const onVolume = useCallback(
    (e) => {
      setVolume?.({
        variables: {
          channelIdx: channel.idx,
          volume: e.target.value,
        },
      });
      // ? .then( res => { this.props.refetch(); })
    },
    [setVolume, channel.idx] // Array of dependencies for which the memoization should update
  );

  return (
    <React.Fragment key={channel.idx}>
      <Col>
        {channel.clips &&
          channel.clips.map((c, idx) => {
            // Make a shallow copy, as 'c' passed to us is protected from changes by @apollo/client@3
            const clip = { ...c, idx };
            clip.activeClipIdx = channel.activeClipIdx;
            clip.channelIdx = channel.idx;
            clip.channelName = channel.name;
            return (
              <Clip
                clip={clip}
                key={clip.idx}
                showGears={showGears}
                stopClip={stopClip}
                playClip={playClip}
                setShowModal={setShowModal}
              />
            );
          })}
        <div className="volume-slider">
          <input type="range" orient="vertical" min="-60" max="6" value={channel.volume} step="1" onChange={onVolume} />
        </div>
        <h6 className="text-center">{channel.name}</h6>
        <ChannelState state={channel.state} error={channel.error} />
      </Col>
    </React.Fragment>
  );
}

// Channel.propTypes = {
//   channel: PropTypes.object.isRequired,
//   showGears: PropTypes.bool.isRequired,
// };

export default React.memo(Channel);

// const channelPropsEqual = (prevProps, nextProps) => {}; // Could fine-tune which props change requires rerender
// export default React.memo(Channel, channelPropsEqual);
