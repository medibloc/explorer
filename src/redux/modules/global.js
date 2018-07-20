import { createAction, handleActions } from 'redux-actions';


// ACTION TYPES
const SET_WINDOW_SIZE = 'global/SET_WINDOW_SIZE';

const SET_SEARCH_TEXT = 'global/SET_SEARCH_TEXT';

const OPEN_LANGUAGE = 'global/OPEN_LANGUAGE';
const OPEN_NAVBAR = 'global/OPEN_NAVBAR';

const CHANGE_LANGUAGE = 'global/CHANGE_LANGUAGE';

const MOVE_PAGE = 'global/MOVE_PAGE';

const initialState = {
  // Mode - 0 : Desktop, 1 : Tablet, 2 : Mobile
  mode: 0,
  width: null,

  search: '',

  languageOpen: false,
  navBarOpen: false,

  language: 'en',

  page: 1,
};

// REDUCER
const reducer = handleActions({
  [SET_WINDOW_SIZE]: (state, action) => {
    const width = action.payload;
    let mode = 0;
    if (width < 800) {
      mode = 2;
    } else if (width < 1200) {
      mode = 1;
    } else {
      mode = 0;
    }
    return {
      ...state,
      width,
      mode,
      navBarOpen: false,
      languageOpen: mode === 2,
    };
  },

  [SET_SEARCH_TEXT]: (state, action) => ({ ...state, search: action.payload }),

  [OPEN_LANGUAGE]: state => ({ ...state, languageOpen: !state.languageOpen }),
  [OPEN_NAVBAR]: state => ({ ...state, navBarOpen: !state.navBarOpen }),

  [CHANGE_LANGUAGE]: (state, action) => ({
    ...state,
    language: action.payload,
    languageOpen: false,
  }),

  [MOVE_PAGE]: (state, action) => {
    let page = action.payload;
    if (page < 1) page = 1;
    return { ...state, page };
  },
}, initialState);

// ACTION CREATORS
export const changeLanguage = createAction(CHANGE_LANGUAGE);
export const movePage = createAction(MOVE_PAGE);
export const openLanguage = createAction(OPEN_LANGUAGE);
export const openNavBar = createAction(OPEN_NAVBAR);
export const setSearchText = createAction(SET_SEARCH_TEXT);
export const setWindowSize = createAction(SET_WINDOW_SIZE);

export default reducer;
