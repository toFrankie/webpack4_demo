import userHelper from '../utils/userHelper'

export const getUser = (data, callback) => {
  return (dispatch, getState) => {
    dispatch({ type: 'FETCH_REQUEST', status: 'requesting' })
    userHelper
      .getUser(data)
      .then(res => {
        dispatch({ type: 'FETCH_SUCCESS', ...res })
        callback && callback(res)
      })
      .catch(err => {
        dispatch({ type: 'FETCH_FAILURE', ...err })
      })
  }
}
