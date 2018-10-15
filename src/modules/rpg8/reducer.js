const initialState = {
  keys: 'C Db D Eb E F Gb G Ab A Bb B'.split(' '),
  selectedKeyIdx: 0,
  scales: 'major minor dorian lydian mixolydian phrygian locrian'.split(' '),
  selectedScaleIdx: 0,
  arpLengthOptions: ['2', '4', '8'],
  selectedArpLengthOptionIdx: 1,
  arpNotesOrderOptions: ['0123', '3210', '1032', '2301'], // updates on arpLength change
  arpNotesOrder: 0,
  arpChordProgression: [
    'I',
    'ii',
    'iii',
    'IV',
    'V',
    'vi',
    'vii'
  ],
  arpClipSelectedChord: [
    0, 1, 2, 3, 4, 5, 6  
  ]
};

export const rootReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'CHANGE_KEY':
      return {...state, ...{selectedKeyIdx: action.data.idx}}
    case 'CHANGE_SCALE':
      return {...state, ...{selectedScaleIdx: action.data.idx}}
    case 'CHANGE_ARP_LENGTH':
      return {...state, ...{selectedArpLengthOptionIdx: action.data.idx}}
    default:
      return state;
  }
};