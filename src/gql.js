import gql from 'graphql-tag';

export const GET_DATA = gql`
  query {
    channels @client {
      idx
      activeClipIdx
      name
      volume
      clips @client {
        pattern
        notes
        randomNotes
        subdiv
        dur
      }
    }
  }
`;

export const PLAY_ROW = gql`
  mutation playRow($activeClipIdx: Number!) {
    playRow(activeClipIdx: $activeClipIdx) @client
  }
`;

export const STOP_CLIP = gql`
  mutation stopClip($channelId: Number!) {
    stopClip(channelId: $channelId) @client
  }
`;

export const PLAY_CLIP = gql`
  mutation playClip($channelId: Number!, $clipId: Number!) {
    playClip(channelId: $channelId, clipId: $clipId) @client
  }
`;

export const ADD_ROW = gql`
  mutation addRow($needlessVar: String!) {
    addRow(needlessVar: $needlessVar) @client
  }
`;
