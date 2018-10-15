import { scale, progression } from 'scribbletune';

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
  arpChordProgression: progression.get('major'),
  arpClipSelectedChord: [
    4, 5, 6, 5, 0, 1, 2, 3
  ]
};

export const rootReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'CHANGE_KEY':
      return {...state, ...{selectedKeyIdx: action.data.idx}}
    case 'CHANGE_SCALE':
      return {...state, ...{
        selectedScaleIdx: action.data.idx,
        arpChordProgression: progression.get(state.scales[state.selectedScaleIdx])
      }}
    case 'CHANGE_ARP_LENGTH':
      return {...state, ...{
        selectedArpLengthOptionIdx: action.data.idx,
        arpNotesOrderOptions: arpNotesOrderOptionsList[action.data.idx],
        selectedArpNotesOrderOptionsIdx: 0
      }}
    case 'CHANGE_ARP_ORDER':
      return {...state, ...{selectedArpNotesOrderOptionsIdx: action.data.idx}}
    case 'CHANGE_CLIP_CHORD':
      let newArpClipSelectedChord = [...state.arpClipSelectedChord];
      newArpClipSelectedChord[action.data.clipIdx] = action.data.selectedChordIdx.idx; // Selector sends an object {idx: n}
      return {
        ...state,
        ...{ arpClipSelectedChord: newArpClipSelectedChord}
      }
    default:
      return state;
  }
};