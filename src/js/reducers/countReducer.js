// count reducer
const countReducer = (prevState = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case 'ADD':
      return prevState + payload
    case 'SUB':
      return prevState - payload
    default:
      return prevState
  }
}

export default countReducer
