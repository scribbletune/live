import React from 'react';
import { render } from 'react-dom';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
import { GET_DATA } from './gql';
import resolvers from './resolvers';
import App from './App';
import track from './track';
import './index.css';

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  resolvers: resolvers,
});

cache.writeData({
  data: {
    ...track,
  },
});

render(
  <ApolloProvider client={client}>
    <Query query={GET_DATA}>
      {({ data: { channels } }) => {
        return <App channels={channels} />;
      }}
    </Query>
  </ApolloProvider>,
  document.getElementById('root')
);
