import {playClips, stopClips} from './api';

const initialState = {
  isPlaying: false,
  bpm: 135,
  arps: []
};

const replayClips = (state) => {
  if (state.isClipPlaying) {
    stopClips();
    playClips(state.arps);
  }
}

export const rootReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'UPDATE_CLIP':
      let newArps = [...state.arps];
      newArps[action.data.clipIdx] = action.data.clipData;
      let newState = {...state, ...{arps: newArps, isClipPlaying: false}};
      stopClips();
      return newState;

    case 'PLAY':
      playClips(state);
      return {...state, ...{ isClipPlaying: true }};

    case 'STOP':
      stopClips();
      return {...state, ...{ isClipPlaying: false }};

    default:
      return state;
  }
};