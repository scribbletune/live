import React from 'react';
import { render } from 'react-dom';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
import { GET_DATA } from './gql';
import getResolvers from './resolvers';
import App from './App';
import track from './tracks/dummy';
import './index.css';

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  resolvers: getResolvers(track),
});

cache.writeData({
  data: {
    ...track,
    isPlaying: false,
  },
});

render(
  <ApolloProvider client={client}>
    <Query query={GET_DATA}>
      {({ data: { channels, isPlaying } }) => {
        return <App channels={channels} isPlaying={isPlaying} />;
      }}
    </Query>
  </ApolloProvider>,
  document.getElementById('root')
);
