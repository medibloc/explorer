const loggerMiddleware = store => next => action => {
  // Record current state
  console.log('Current : ', store.getState());
  // Record action
  console.log('Action : ', action);

  // Pass action to nex middleware or reducer
  const result = next(action);

  // Record next state
  console.log('Next : ', store.getState());

  return result; // 여기서 반환하는 값은 store.dispatch(ACTION_TYPE) 했을때의 결과로 설정됩니다
}

export default loggerMiddleware; // 불러와서 사용 할 수 있도록 내보내줍니다.
