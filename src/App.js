import React from 'react';
import { connect } from 'react-redux';
import Channel from './Channel';

const App = ({ channels }) => {
  const channelsList = channels.map((ch, idx) => <Channel channel={ch} />);
  return (
    <div class="row">
      {channelsList}
    </div>
  );
};

const mapStateToProps = state => ({ channels: state.channels });
export default connect(mapStateToProps)(App);