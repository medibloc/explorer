import { createAction, handleActions } from 'redux-actions';

// ACTION TYPES
export const LOAD = 'widgets/LOAD';
export const LOAD_SUCCESS = 'widgets/LOAD_SUCCESS';
export const LOAD_FAIL = 'widgets/LOAD_FAIL';

const initialState = {
  loading: false,
  loaded: false,
  error: null,
};

// REDUCER
const reducer = handleActions({
  [LOAD]: state => ({ ...state, loading: true }),
  [LOAD_SUCCESS]: state => ({
    ...state,
    loading: false,
    loaded: true,
  }),
  [LOAD_FAIL]: (state, action) => ({
    ...state,
    loading: false,
    loaded: false,
    error: action.paylod,
  }),
}, initialState);


// ACTION CREATORS
export const load = createAction(LOAD);
export const loadSuccess = createAction(LOAD_SUCCESS);
export const loadFail = createAction(LOAD_FAIL); // loadFail(error)

export default reducer;
