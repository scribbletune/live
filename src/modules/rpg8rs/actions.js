export const play = dispatch => (dispatch({type: 'PLAY' }));
export const stop = dispatch => (dispatch({type: 'STOP' }));
export const saveMidi = dispatch => (dispatch({type: 'SAVE_MIDI' }));
export const updateClip = (dispatch, data) => (dispatch({type: 'UPDATE_CLIP', data }));