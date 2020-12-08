import { call, fork, put, select, take, delay, race, takeEvery, takeLatest } from 'redux-saga/effects'

// fetch 请求
function fetch() {
  return new Promise((resolve, reject) => {
    window
      .fetch('http://192.168.1.100:8080/config')
      .then(response => response.json())
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// saga 处理异步场景
function* fetchData() {
  try {
    const { result, timeout } = yield race({
      result: call(fetch),
      timeout: delay(30000)
    })
    if (timeout) throw new Error('请求超时！')
    yield put({ type: 'FETCH_SUCCESS', ...result })
  } catch (e) {
    console.warn(e)
    yield put({ type: 'FETCH_FAILURE', status: 'error', error: 'oops' })
  }
}

export function* watchFetchData() {
  yield takeEvery('FETCH_REQUEST', fetchData)

  // 等同于
  // while (true) {
  //   // take 返回一个原始的 Action 对象
  //   const action = yield take('FETCH_REQUEST')
  //   yield fork(fetchData, action)
  // }
}
