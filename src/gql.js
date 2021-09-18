import { gql } from '@apollo/client';

export const GET_IS_PLAYING = gql`
  query queryIsPlaying {
    isPlaying @client
  }
`;

export const GET_DATA = gql`
  query queryGetData {
    channels @client {
      idx
      activeClipIdx
      name
      volume
      state
      error {
        message
        stack
      }
      clips {
        clipStr
        pattern
      }
    }
    isPlaying @client
    tempoBpm @client
  }
`;

export const GET_VOLUME = gql`
  query queryChannelVolume($channelIdx: Int) {
    channels(idx: $channelIdx) @client {
      volume
    }
  }
`;

export const WRITE_DATA = gql`
  query queryWriteData {
    channels @client
    isPlaying @client
    tempoBpm @client
  }
`;

export const PLAY_ROW = gql`
  mutation playRow($activeClipIdx: Int!) {
    playRow(activeClipIdx: $activeClipIdx) @client
  }
`;

export const STOP_CLIP = gql`
  mutation stopClip($channelIdx: Int!) {
    stopClip(channelIdx: $channelIdx) @client
  }
`;

export const PLAY_CLIP = gql`
  mutation playClip($channelIdx: Int!, $clipId: Int!) {
    playClip(channelIdx: $channelIdx, clipId: $clipId) @client
  }
`;

export const SET_TRANSPORT_TEMPO = gql`
  mutation setTransportTempo($tempoBpm: Float!) {
    mutationResolverSetTempo(tempoBpm: $tempoBpm) @client
  }
`;

export const START_STOP_TRACK = gql`
  mutation startStopTrack($isPlaying: Boolean!) {
    mutationResolverStartStopTrack(isPlaying: $isPlaying) @client
  }
`;

export const SET_VOLUME = gql`
  mutation setVolume($channelIdx: Int!, $volume: Int!) {
    setVolume(channelIdx: $channelIdx, volume: $volume) @client
  }
`;
