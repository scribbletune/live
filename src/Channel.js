import React, { useState } from 'react';
import { Col } from 'react-bootstrap';
import Clip from './Clip';

function Channel({ channel }) {
  const [volume, setVolume] = useState(channel.volume || 0.7);
  return (
    <>
      <Col>
        {channel.clips &&
          channel.clips.map((c, idx) => {
            c.idx = idx;
            c.activeClipIdx = channel.activeClipIdx;
            c.channelId = channel.idx;
            return <Clip {...c} key={idx} />;
          })}
        <div className="volumeSlider">
          <input
            type="range"
            orient="vertical"
            min="0"
            max="1"
            value={volume}
            step="0.01"
            onChange={e => {
              setVolume(e.target.value);
            }}
          />
        </div>
        <h6 className="text-center">{channel.name}</h6>
      </Col>
    </>
  );
}

export default Channel;
