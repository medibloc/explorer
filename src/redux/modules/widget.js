import { fromJS } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

// ACTION TYPES
const LOAD = 'widgets/LOAD';
const LOAD_SUCCESS = 'widgets/LOAD_SUCCESS';
const LOAD_FAIL = 'widgets/LOAD_FAIL';

const initialState = fromJS({
  loading: false,
  loaded: false,
  error: null,
});

// REDUCER
const reducer = handleActions({
  [LOAD]: state => state.set('loading', true),
  [LOAD_SUCCESS]: state => state
    .set('loading', false)
    .set('loaded', true),
  [LOAD_FAIL]: (state, action) => state
    .set('loading', false)
    .set('loaded', false)
    .set('error', action.payload),
}, initialState);


// ACTION CREATORS
export const load = createAction(LOAD);
export const loadSuccess = createAction(LOAD_SUCCESS);
export const loadFail = createAction(LOAD_FAIL); // loadFail(error)

export default reducer;
