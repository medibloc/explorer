import { createAction, handleActions } from 'redux-actions';

// ACTION TYPES
const SET_WINDOW_SIZE = 'global/SET_WINDOW_SIZE';

const initialState = {
  width: null,
};

// REDUCER
const reducer = handleActions({
  [SET_WINDOW_SIZE]: (state, action) => ({ ...state, width: action.paylod }),
}, initialState);


// ACTION CREATORS
export const setWindowSize = createAction(SET_WINDOW_SIZE); // changeWindowSize(width)

export default reducer;
