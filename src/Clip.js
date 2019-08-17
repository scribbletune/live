import React from 'react';
import { Mutation } from 'react-apollo';
import { Button } from 'react-bootstrap';
import { STOP_CLIP, PLAY_CLIP } from './gql';

function Clip(props) {
  const getClipButton = () => {
    if (props.pattern === '') {
      return <Button variant="outline-secondary">&#x25CB;</Button>;
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

  return <div className="clip">{getClipButton()}</div>;
}

export default Clip;
