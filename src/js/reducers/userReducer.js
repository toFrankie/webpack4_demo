// user reducer
const userReducer = (prevState = {}, action) => {
  const { type, ...payload } = action
  switch (type) {
    case 'FETCH_REQUEST':
    case 'FETCH_FAILURE':
    case 'FETCH_SUCCESS':
      return payload
    default:
      return prevState
  }
}

export default userReducer
