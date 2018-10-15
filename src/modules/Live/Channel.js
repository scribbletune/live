import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { playClip, stopClip } from './store/actions';
import Clip from './Clip';
import styled from 'styled-components';

const Header = styled.h6`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  background: tomato;
  color: white;
  height: 50px;
  margin: 0;
  border: 1px solid black;
`;

const Channel = ({ channel, playClipHandler, stopClipHandler }) => {
  const clipsList = channel.clips.map(
    (clip, idx) => <Clip 
      key={idx}
      pattern={clip.pattern} 
      isActive={channel.currentlyPlayingClipIdx === idx} 
      onClickPlay={playClipHandler.bind(null, channel.id, idx)}
      onClickStop={stopClipHandler.bind(null, channel.id, idx)}
    />
  );
  return (
    <div className="col px-0">
      <Header>{channel.name}</Header>
      <ul className="list-unstyled">{clipsList}</ul>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    playClipHandler: playClip,
    stopClipHandler: stopClip
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(Channel);
