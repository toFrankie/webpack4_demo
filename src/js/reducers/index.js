import { combineReducers } from 'redux'
import countReducer from './countReducer'
import statusReducer from './statusReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
  count: countReducer,
  status: statusReducer,
  user: userReducer
})

export default rootReducer