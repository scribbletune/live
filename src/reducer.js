import { session, transport } from 'scribbletune';
import { initialState } from './sessions/empty';

export const rootReducer = (state = initialState, action = {}) => {
  let newState, newChannels;
  switch (action.type) {
    case 'PLAY_CLIP':
      newChannels = state.channels.map((ch, idx) => {
        if (idx === action.data.channelId) {
          return {...ch, currentlyPlayingClipIdx: action.data.clipId}
        }
        return ch;
      });
      return {...state, channels: newChannels};

    case 'STOP_CLIP':
      newChannels = state.channels.map((ch, idx) => {
        if (idx === action.data.channelId) {
          return {...ch, currentlyPlayingClipIdx: -1}
        }
        return ch;
      });
      return {...state, channels: newChannels};

    case 'PLAY_ROW':

      return state;

    default:
      return state;
  }
};
