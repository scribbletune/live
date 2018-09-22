import { session } from 'scribbletune';
import { initialState } from './empty';

const s = session(initialState.channels);
Tone.Transport.bpm.value = 145;
Tone.Transport.start();

export const rootReducer = (state = initialState, action = {}) => {
  let newChannels;
  switch (action.type) {
    case 'PLAY_CLIP':
      s.channels[action.data.channelId].startClip(action.data.clipId);
      newChannels = state.channels.map((ch, idx) => {
        if (idx === action.data.channelId) {
          return {...ch, currentlyPlayingClipIdx: action.data.clipId}
        }
        return ch;
      });
      return {...state, channels: newChannels};

    case 'STOP_CLIP':
      s.channels[action.data.channelId].stopClip(action.data.clipId);
      newChannels = state.channels.map((ch, idx) => {
        if (idx === action.data.channelId) {
          return {...ch, currentlyPlayingClipIdx: -1}
        }
        return ch;
      });
      return {...state, channels: newChannels};

    case 'PLAY_ROW':
      s.startRow(action.data.rowId);
      newChannels = state.channels.map(ch => {
        return {...ch, currentlyPlayingClipIdx: action.data.rowId};
      });
      return {...state, channels: newChannels};

    default:
      return state;
  }
};
