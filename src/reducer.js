import { session, transport } from 'scribbletune';
import { initialState } from './sessions/empty';

export const rootReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    default:
      return state;
  }
};
