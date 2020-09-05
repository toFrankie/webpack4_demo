import { all, fork } from 'redux-saga/effects'

function* helloSaga() {
    console.log('Hello Saga!')
}

function* rootSaga() {
    yield all([fork(helloSaga)])
}

export default rootSaga