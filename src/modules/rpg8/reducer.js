import { getProgression, playClip, stopClip } from './api';

const arpNotesOrderOptionsList = [
  ['01', '10'],
  ['0123', '3210', '1032', '2301'],
  ['01234567', '76543210', '32107654', '45670123', '10325476', '67453201'],
];
const initialState = {
  keys: 'C Db D Eb E F Gb G Ab A Bb B'.split(' '),
  selectedKeyIdx: 0,
  scales: 'major minor dorian lydian mixolydian phrygian locrian'.split(' '),
  selectedScaleIdx: 0,
  arpLengthOptions: ['2', '4', '8'],
  selectedArpLengthOptionIdx: 1,
  arpNotesOrderOptions: ['0123', '3210', '1032', '2301'], // updates on arpLength change
  selectedArpNotesOrderOptionsIdx: 0,
  arpChordProgression: getProgression('major'),
  arpClipSelectedChord: [
    4, 5, 6, 5, 0, 1, 2, 3
  ],
  isClipPlaying: false
};

const replayClip = (state) => {
  if (state.isClipPlaying) {
    stopClip();
    playClip(state);
  }
}

export const rootReducer = (state = initialState, action = {}) => {
  let newState;
  switch (action.type) {
    case 'CHANGE_KEY':
      newState = {...state, ...{selectedKeyIdx: action.data.idx}};
      replayClip(newState);
      return newState;
    case 'CHANGE_SCALE':
      newState = {...state, ...{
        selectedScaleIdx: action.data.idx,
        arpChordProgression: getProgression(state.scales[state.selectedScaleIdx])
      }};
      replayClip(newState);
      return newState;
    case 'CHANGE_ARP_LENGTH':
      newState = {...state, ...{
        selectedArpLengthOptionIdx: action.data.idx,
        arpNotesOrderOptions: arpNotesOrderOptionsList[action.data.idx],
        selectedArpNotesOrderOptionsIdx: 0
      }};
      replayClip(newState);
      return newState;
    case 'CHANGE_ARP_ORDER':
      newState = {...state, ...{selectedArpNotesOrderOptionsIdx: action.data.idx}}
      replayClip(newState);
      return newState;
    case 'CHANGE_CLIP_CHORD':
      let newArpClipSelectedChord = [...state.arpClipSelectedChord];
      newArpClipSelectedChord[action.data.clipIdx] = action.data.selectedChordIdx.idx; // Selector sends an object {idx: n}
      newState = {
        ...state,
        ...{ arpClipSelectedChord: newArpClipSelectedChord}
      }
      replayClip(newState);
      return newState;
    case 'PLAY':
      playClip(state);
      return {...state, ...{ isClipPlaying: true }};
    case 'STOP':
      stopClip();
      return {...state, ...{ isClipPlaying: false }};
    default:
      return state;
  }
};