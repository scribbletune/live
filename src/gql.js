import gql from 'graphql-tag';

export const GET_DATA = gql`
  query {
    channels @client {
      idx
      activeClipIdx
      name
      volume
      clips @client {
        clipStr
      }
    }
    isPlaying @client
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

export const START_STOP_TRACK = gql`
  mutation startStopTrack($isPlaying: Boolean!) {
    startStopTrack(isPlaying: $isPlaying) @client
  }
`;

export const SET_VOLUME = gql`
  mutation setVolume($channelId: Number!, $volume: Number!) {
    setVolume(channelId: $channelId, volume: $volume) @client
  }
`;
