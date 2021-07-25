import React, { useState } from 'react';
import { Col } from 'react-bootstrap';
import Clip from './Clip';

import { Mutation } from 'react-apollo';
// TODO: migrate from deprecated apollo-boost to @apollo/client: import { useMutation } from '@apollo/client';
import { SET_VOLUME } from './gql';

function Channel({ channel }) {
  const [volume, setVolumeState] = useState(channel.volume || 0.7);
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
          <Mutation mutation={SET_VOLUME}>
            {(setVolume, {data, loading, error}) => { return (
              <input
                type="range"
                orient="vertical"
                min="-60"
                max="6"
                value={volume}
                step="1"
                onChange={e => {
                  setVolumeState(e.target.value);
                  setVolume({ variables: { channelId: channel.idx, volume: e.target.value } })
                  //? .then( res => { this.props.refetch(); })
                  ;
                }}
              />
              );
            }}
          </ Mutation>
        </div>
        <h6 className="text-center">{channel.name}</h6>
      </Col>
    </>
  );
}

export default Channel;
