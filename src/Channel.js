import React from 'react';
import { connect } from 'react-redux';
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

const Channel = ({ channel }) => {
  const clipsList = channel.clips.map(
    (clip, idx) => <Clip pattern={clip.pattern} isActive={channel.currentlyPlayingClipIdx === idx} id={idx} />
  );
  return (
    <div class="col-lg-1 px-0">
      <Header>{channel.name}</Header>
      <ul class="list-unstyled">{clipsList}</ul>
    </div>
  );
};

export default Channel;