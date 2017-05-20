
import {REQUEST_LOGIN,FINISH_LOGIN,
  REQUEST_REGISTER,FINISH_REGISTER,LOGOUT,
  REQUEST_PROFILE,REQUEST_PROFILE_FULLFILLED,REQUEST_PROFILE_REJECTED} from '../actions'

var initialState = {
  profile:{}
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_LOGIN:
      console.log("do action login");
      return {
        success:false,
        inProgres:true,
        error:null
      };
    case FINISH_LOGIN:
      console.log("finish login");
      return {
        success:action.success,
        inProgres:false,
        error:action.error
      };
    case REQUEST_REGISTER:
      console.log("do action register");
      return {
        success:false,
        inProgres:true,
        error:null
      };
    case FINISH_REGISTER:
      console.log("finish register");

      return {
        success:action.success,
        inProgres:false,
        error:action.error
      };
    case REQUEST_PROFILE:
    case REQUEST_PROFILE_REJECTED:
      return state.profile
    case REQUEST_PROFILE_FULLFILLED:
      return action.profile
    default:
      return state
  }
}


const users = (state = initialState, action) => {

  if(state.login){
      delete state.login;
  }

  switch (action.type) {
    case REQUEST_LOGIN:
    case FINISH_LOGIN:
      return {
        ...state,
        login:user(undefined, action)
      }
    case REQUEST_REGISTER:
    case FINISH_REGISTER:
      return {
        ...state,
        register:user(undefined, action)
      }
    case LOGOUT:
      return state
    case REQUEST_PROFILE:
    case REQUEST_PROFILE_FULLFILLED:
    case REQUEST_PROFILE_REJECTED:
    return{
      ...state,
      profile:user(undefined,action)
    }
    default:
      return state
  }
}

export default users;
