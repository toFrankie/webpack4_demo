import { combineReducers } from 'redux'
import countReducer from './countReducer'
import statusReducer from './statusReducer'

const rootReducer = combineReducers({
  count: countReducer,
  status: statusReducer
})

export default rootReducer