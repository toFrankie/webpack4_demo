// status reducer
const statusReducer = (prevState = {}, action) => {
  const { type } = action
  switch (type) {
    case 'LOGIN_IN':
      return 'online'
    case 'LOGIN_OUT':
      return 'offline'
    default:
      return prevState
  }
}

export default statusReducer
