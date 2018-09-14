import React from 'react';
import { connect } from 'react-redux';

const Channel = ({ channel }) => {
  return <h4>{channel.name}</h4>
};

export default Channel;