export const initApp = dispatch => (dispatch({ type: 'INIT' }));

export const changeKey = (dispatch, data) => (dispatch({type: 'CHANGE_KEY', data }));
export const changeScale = (dispatch, data) => (dispatch({type: 'CHANGE_SCALE', data }));
export const changeArpLength = (dispatch, data) => (dispatch({type: 'CHANGE_ARP_LENGTH', data }));
export const changeArpOrder = (dispatch, data) => (dispatch({type: 'CHANGE_ARP_ORDER', data }));
export const changeSubdivOption = (dispatch, data) => (dispatch({type: 'CHANGE_SUBDIV_OPTION', data }));
export const changeClipChord = (dispatch, clipIdx, selectedChordIdx) => (dispatch({
  type: 'CHANGE_CLIP_CHORD',
  data: { clipIdx, selectedChordIdx }
}));
export const changePattern = (dispatch, ptn) => {
  if (ptn.match(/[^x\-]/)) {
    return;
  }
  return dispatch({type: 'CHANGE_PATTERN', data: {
    pattern: ptn
  } });
};

export const changeBpm = (dispatch, bpm) => {
  if (bpm.match(/[^\d]/)) {
    return;
  }
  return dispatch({type: 'CHANGE_BPM', data: {
    bpm: bpm
  } });
};

export const play = dispatch => (dispatch({type: 'PLAY' }));
export const stop = dispatch => (dispatch({type: 'STOP' }));
export const saveMidi = dispatch => (dispatch({type: 'SAVE_MIDI' }));
