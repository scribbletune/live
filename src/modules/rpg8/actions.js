export const initApp = dispatch => (dispatch({ type: 'INIT' }));

export const changeKey = (dispatch, data) => (dispatch({type: 'CHANGE_KEY', data }));
export const changeScale = (dispatch, data) => (dispatch({type: 'CHANGE_SCALE', data }));
export const changeArpLengthOption = (dispatch, data) => (dispatch({type: 'CHANGE_ARP_LENGTH', data }));