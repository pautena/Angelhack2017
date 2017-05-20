import {ADD_EVENT, FINISH_EVENT,REQUEST_EVENTS,
  REQUEST_EVENTS_FULLFILLED,REQUEST_EVENTS_REJECTED } from '../actions'

  const initialState = {
  data:[],
  frontend:{}
}


const event = (state = {}, action) => {
  switch (action.type) {
    case ADD_EVENT:
      return {
        id: action.id,
        name: action.name,
        description:action.description,
        people:action.people,
        date:action.date,
        place:action.place,
        completed:false
      }
    case FINISH_EVENT:
      if (state.id !== action.id) {
        return state
      }

      return Object.assign({}, state.data, {
        completed: true
      })
    case REQUEST_EVENTS:
      return {
        frontend:{
          success:false,
          inProgres:true,
          error:null
        }
      }
    case REQUEST_EVENTS_FULLFILLED:
      return {
        data:action.events,
        frontend:{
          success:true,
          inProgres:false,
          error:null
        }
      }
    case REQUEST_EVENTS_REJECTED:
      return {
        frontend:{
          success:false,
          inProgres:false,
          error:action.error
        }
      }
    default:
      return state
  }
}

const events = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_EVENTS:
      var result = event(undefined,action);

      var frontend = state.frontend;
      frontend.get = result;
      return {
        ...state,
        frontend
      }
    case REQUEST_EVENTS_FULLFILLED:
      result = event(undefined,action);

      frontend = state.frontend;
      frontend.get = result.frontend;

      return {
        ...state,
        data:result.data,
        frontend
      }
    case REQUEST_EVENTS_REJECTED:
      result = event(undefined,action);
      frontend = state.frontend;
      frontend.get = result.frontend;

      return {
        ...state,
        frontend
      }
    case ADD_EVENT:
      return {
        ...state,
        data:event(undefined, action)
      }
    case FINISH_EVENT:
      return {
        ...state,
        data:state.data.map(t =>
          event(t, action)
        )
      }
    default:
      return state
  }
}

export default events
