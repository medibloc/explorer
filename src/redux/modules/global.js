import { createAction, handleActions } from 'redux-actions';

// ACTION TYPES
const SET_WINDOW_SIZE = 'global/SET_WINDOW_SIZE';

const SET_SEARCH_TEXT = 'global/SET_SEARCH_TEXT';


const initialState = {
  // Mode - 0 : Desktop, 1 : Tablet, 2 : Mobile
  mode: 0,
  width: null,

  search: '',
};

// REDUCER
const reducer = handleActions({
  [SET_WINDOW_SIZE]: (state, action) => {
    const width = action.payload;
    let mode = 0;
    if (width <= 320) {
      mode = 2;
    } else if (width <= 720) {
      mode = 1;
    } else {
      mode = 0;
    }
    return {
      ...state,
      width,
      mode,
    };
  },

  [SET_SEARCH_TEXT]: (state, action) => ({ ...state, search: action.payload }),
}, initialState);


// ACTION CREATORS
export const setWindowSize = createAction(SET_WINDOW_SIZE);
export const setSearchText = createAction(SET_SEARCH_TEXT);

export default reducer;
