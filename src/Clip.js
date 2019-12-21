import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { ButtonGroup, Button, Modal } from 'react-bootstrap';
import { STOP_CLIP, PLAY_CLIP } from './gql';
import Editor from './Editor';

function Clip(props) {
  const [showModal, setShowModal] = useState(false);
  // const [isPlaying, setIsPlaying] = useState(false);
  const [clipStr, setClipStr] = useState(props.clipStr || '');

  // useEffect(() => {
  //   const clipCode = document.getElementById('clipCode');

  //   /*eslint-disable */
  //   clipCode &&
  //     CodeMirror.fromTextArea(clipCode, {
  //       lineNumbers: true,
  //       mode: 'javascript',
  //     });
  //   /*eslint-enable */
  // });

  const getClipButton = () => {
    if (clipStr === "''") {
      return (
        <Button variant="outline-secondary" disabled={true}>
          &#x25CB;
        </Button>
      );
    }

    if (props.activeClipIdx === props.idx) {
      // Clip is playing
      return (
        <Mutation
          mutation={STOP_CLIP}
          variables={{ channelId: props.channelId }}
        >
          {stopClip => (
            <Button variant="danger" onClick={stopClip}>
              {' '}
              &#9632;
            </Button>
          )}
        </Mutation>
      );
    } else {
      // Clip is stopped
      return (
        <Mutation
          mutation={PLAY_CLIP}
          variables={{ channelId: props.channelId, clipId: props.idx }}
        >
          {playClip => (
            <Button variant="success" onClick={playClip}>
              {' '}
              &#9658;
            </Button>
          )}
        </Mutation>
      );
    }
  };

  const getModal = () => {
    return (
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit clip</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Editor />
          {/* <textarea
            id="clipCode"
            onChange={e => setClipStr(e.target.value)}
            value={clipStr}
          /> */}
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <div className="clip">
      <ButtonGroup>
        {getClipButton()}
        <Button
          variant={clipStr ? 'secondary' : 'outline-secondary'}
          onClick={() => setShowModal(true)}
          dangerouslySetInnerHTML={{
            __html: '⚙',
          }}
        />
      </ButtonGroup>
      {getModal()}
    </div>
  );
}

export default Clip;
