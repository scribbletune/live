import { getProgression, playClip, stopClip, saveMidiFile } from './api';

const arpNotesOrderOptionsList = [
  ['01', '10', '0001', '0010', '1011', '1100', '1101'],
  ['0123', '3210', '1032', '2301', '010203', '101312', '232021', '323130', '001002003', '110113112', '223220221', '332331330'],
  [
    '01234567',
    '76543210',
    '32107654',
    '45670123',
    '10325476',
    '67453201',
    '01020304050607',
    '10131215141716',
    '20212324252627',
    '32313037363534',
    '45464740414243',
    '67646563626061',
    '76757473727170',
    '001002003004005006007',
    '110113112115114117116',
    '220221223224225226227',
    '332331330337336335334',
    '445446447440441442443',
    '667664665663662660661',
    '776775774773772771770'
  ],
];
const initialState = {
  keys: 'C Db D Eb E F Gb G Ab A Bb B'.split(' '),
  selectedKeyIdx: 2,
  scales: ['major', 'minor', 'dorian', 'lydian', 'mixolydian', 'phrygian', 'locrian', 'melodic minor', 'harmonic minor'],
  selectedScaleIdx: 5,
  arpLengthOptions: ['2', '4', '8'],
  selectedArpLengthOptionIdx: 1,
  arpNotesOrderOptions: arpNotesOrderOptionsList[1], // updates on arpLength change
  selectedArpNotesOrderOptionsIdx: 2,
  arpChordProgression: getProgression('phrygian'),
  arpClipSelectedChord: [
    0, 1, 0, 1, 0, 1, 0, 3
  ],
  subdivOptions: ['1/2', '1/4', '1/8', '1/16'],
  subdivs: ['2n', '4n', '8n', '16n'],
  selectedSubdivOption: 3,
  pattern: 'x-xx-xxx',
  bpm: 135,
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
        arpChordProgression: getProgression(state.scales[action.data.idx])
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

    case 'CHANGE_SUBDIV_OPTION':
      newState = {...state, ...{selectedSubdivOption: action.data.idx}}
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

    case 'CHANGE_PATTERN':
      newState = {...state, ...{pattern: action.data.pattern}}
      replayClip(newState);
      return newState;

    case 'CHANGE_BPM':
      newState = {...state, ...{bpm: action.data.bpm}}
      replayClip(newState);
      return newState;

    case 'PLAY':
      playClip(state);
      return {...state, ...{ isClipPlaying: true }};

    case 'STOP':
      stopClip();
      return {...state, ...{ isClipPlaying: false }};

    case 'SAVE_MIDI':
      saveMidiFile(state);
      // No state change required
      return state;

    default:
      return state;
  }
};