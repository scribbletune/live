import React, { useCallback } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import './Clip.css';

// Sub-Component
const ClipDisabledButton = ({ onContextMenu }) => (
  <Button variant="outline-secondary" onContextMenu={onContextMenu}>
    &#x25CB;
  </Button>
);

// Sub-Component
const ClipStopButton = ({ clip, stopClip, onContextMenu }) => {
  // Pattern: "avoid binding arrow functions in render"
  const onButtonClick = useCallback(
    () => {
      stopClip?.({ variables: { channelIdx: clip.channelIdx } });
    },
    [stopClip, clip.channelIdx] // Array of dependencies for which the memoization should update
  );
  return (
    <Button variant="danger" onClick={onButtonClick} onContextMenu={onContextMenu}>
      {' '}
      &#9632;
    </Button>
  );
};

// Sub-Component
const ClipPlayButton = ({ clip, playClip, onContextMenu }) => {
  // Pattern: "avoid binding arrow functions in render"
  const onButtonClick = useCallback(
    () => {
      playClip?.({ variables: { channelIdx: clip.channelIdx, clipId: clip.idx } });
    },
    [playClip, clip.channelIdx, clip.idx] // Array of dependencies for which the memoization should update
  );
  return (
    <Button variant="success" onClick={onButtonClick} onContextMenu={onContextMenu}>
      {' '}
      &#9658;
    </Button>
  );
};

// Sub-Component
const ClipButton = ({ clip, playClip, stopClip, onContextMenu }) => {
  if (!clip.pattern && (!clip.clipStr || clip.clipStr === "''")) {
    return <ClipDisabledButton onContextMenu={onContextMenu} />;
  }

  if (clip.activeClipIdx === clip.idx) {
    // Clip is playing
    return <ClipStopButton clip={clip} stopClip={stopClip} onContextMenu={onContextMenu} />;
  }
  // Clip is stopped
  return <ClipPlayButton clip={clip} playClip={playClip} onContextMenu={onContextMenu} />;
};

// Sub-Component
const GearsButton = ({ clip, setShowModal, btnVariant }) => {
  // Pattern: "avoid binding arrow functions in render"
  const onShowModal = useCallback(
    () => {
      setShowModal?.({ show: true, clip });
    },
    [setShowModal, clip] // Array of dependencies for which the memoization should update
  );
  return (
    <Button variant={btnVariant} onClick={onShowModal}>
      ⚙
    </Button>
  );
};

function Clip({ clip, showGears, stopClip, playClip, setShowModal }) {
  console.log('REDRAW: Channel %s Clip %s clip.pattern=%o', clip.channelIdx, clip.idx, clip.pattern);

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

  // Pattern: "avoid binding arrow functions in render"
  const handleRightClick = useCallback(
    (e) => {
      e.preventDefault();
      setShowModal?.({ show: true, clip });
    },
    [setShowModal, clip] // Array of dependencies for which the memoization should update
  );
  const btnVariant = clip.pattern || clip.clipStr ? 'secondary' : 'outline-secondary';
  return (
    <div className="clip">
      <ButtonGroup>
        <ClipButton clip={clip} playClip={playClip} stopClip={stopClip} onContextMenu={handleRightClick} />
        <CSSTransition in={showGears} timeout={500} classNames="slide-right" unmountOnExit>
          <div className={`slide-right-drawer btn btn-${btnVariant}`}>
            <GearsButton clip={clip} setShowModal={setShowModal} btnVariant={btnVariant} />
          </div>
        </CSSTransition>
      </ButtonGroup>
    </div>
  );
}

export default React.memo(Clip);
