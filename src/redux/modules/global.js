import { createAction, handleActions } from 'redux-actions';

// ACTION TYPES
const SET_WINDOW_SIZE = 'global/SET_WINDOW_SIZE';

const SET_SEARCH_TEXT = 'global/SET_SEARCH_TEXT';

const OPEN_NAVBAR = 'global/OPEN_NAVBAR';
const OPEN_LANGUAGE = 'global/OPEN_LANGUAGE';
const CHANGE_LANGUAGE = 'global/CHANGE_LANGUAGE';
const MOVE_PAGE = 'global/MOVE_PAGE';


const initialState = {
  // Mode - 0 : Desktop, 1 : Tablet & Mobile ( < 640px )
  mode: 0,
  width: null,

  page: 1,

  navBarOpen: false,
  languageOpen: false,

  language: 'en',

  search: '',
};

// REDUCER
const reducer = handleActions({
  [SET_WINDOW_SIZE]: (state, action) => {
    const width = action.payload;
    let mode = 0;
    if (width <= 640) {
      mode = 1;
    } else {
      mode = 0;
    }
    return {
      ...state,
      width,
      mode,
      navBarOpen: false,
    };
  },

  [OPEN_NAVBAR]: state => ({ ...state, navBarOpen: !state.navBarOpen }),
  [OPEN_LANGUAGE]: state => ({ ...state, languageOpen: !state.languageOpen }),
  [MOVE_PAGE]: (state, action) => {
    let page = action.payload;
    if (page < 1) page = 1;
    return { ...state, page };
  },
  [CHANGE_LANGUAGE]: (state, action) => ({ ...state, language: action.payload, languageOpen: false }),

  [SET_SEARCH_TEXT]: (state, action) => ({ ...state, search: action.payload }),
}, initialState);


// ACTION CREATORS
export const setWindowSize = createAction(SET_WINDOW_SIZE);
export const setSearchText = createAction(SET_SEARCH_TEXT);
export const openNavBar = createAction(OPEN_NAVBAR);
export const openLanguage = createAction(OPEN_LANGUAGE);
export const changeLanguage = createAction(CHANGE_LANGUAGE);
export const movePage = createAction(MOVE_PAGE);

export default reducer;
