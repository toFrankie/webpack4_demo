import { all, fork } from 'redux-saga/effects'
import { watchFetchData } from './fetchData'

// eslint-disable-next-line require-yield
function* helloSaga() {
  console.log('Hello Saga!')
}

function* rootSaga() {
  yield all([
    // fork(helloSaga),
    fork(watchFetchData)
  ])
}

export default rootSaga
