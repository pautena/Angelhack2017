import { combineReducers } from 'redux'
import users from './users'
import events from './events'

const reducer = combineReducers({
  events,
  users
})

export default reducer
