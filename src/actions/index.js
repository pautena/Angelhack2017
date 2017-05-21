import firebase from 'firebase'

export const REQUEST_REGISTER = 'REQUEST_REGISTER'
export const FINISH_REGISTER = 'FINISH_REGISTER'
export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export const FINISH_LOGIN = 'FINISH_LOGIN'
export const LOGOUT  = 'LOGOUT'

export const REQUEST_PROFILE = 'REQUEST_PROFILE'
export const REQUEST_PROFILE_FULLFILLED = 'REQUEST_PROFILE_FULLFILLED'
export const REQUEST_PROFILE_REJECTED = 'REQUEST_PROFILE_REJECTED'

export const REQUEST_USER_PROFILE = 'REQUEST_USER_PROFILE'
export const REQUEST_USER_PROFILE_FULLFILLED = 'REQUEST_USER_PROFILE_FULLFILLED'
export const REQUEST_USER_PROFILE_REJECTED = 'REQUEST_USER_PROFILE_REJECTED'

export const REQUEST_EVENTS = 'REQUEST_EVENTS'
export const REQUEST_EVENTS_FULLFILLED = 'REQUEST_EVENTS_FULLFILLED'
export const REQUEST_EVENTS_REJECTED = 'REQUEST_EVENTS_REJECTED'

export const ADD_EVENT = 'ADD_EVENT'
export const FINISH_EVENT = 'FINISH_EVENT'
export const ON_BUY_TICKET = 'ON_BUY_TICKET'

export const GET_EVENT_USERS = 'GET_EVENT_USERS'
export const GET_EVENT_USERS_FULLFILLED = 'GET_EVENT_USERS_FULLFILLED'
export const GET_EVENT_USERS_REJECTED = 'GET_EVENT_USERS_REJECTED'


const requestLogin = ()=>{
  return {
    type:REQUEST_LOGIN
  }
}

const finishLogin = (success,error)=>{
  return {
    type:FINISH_LOGIN,
    success,error
  }
}

export const login = (email,password) =>{
  return (dispatch) =>{
    dispatch(requestLogin());
    return firebase.auth().signInWithEmailAndPassword(email,password)
      .then((user)=>{
        console.log("signIn success. user: ",user);
        dispatch(finishLogin(true,false));
      })
      .catch((error) =>{
        console.error("error on auth: ",error);
        dispatch(finishLogin(false,error));

      });
  }
}

const requestRegister = ()=>{
 return {
   type:REQUEST_REGISTER
 }
}

const finishRegister = (success,error)=>{
  return {
    type:FINISH_REGISTER,
    success,error
  }
}

export const register = (username,email,password,firstname,lastname) =>{


  return (dispatch) =>{
    dispatch(requestRegister());
    return firebase.auth().createUserWithEmailAndPassword(email,password)
      .then((result)=>{
        console.log("signUp success. user: ",result);
        var userprofile={
          email:email,
          username:username,
          firstname:firstname,
          lastname:lastname,
          stars:3
        }
        firebase.database().ref("users/"+result.uid).set(userprofile);

        dispatch(finishRegister(true,false));
      })
      .catch((error) =>{
        console.error("try to signUp error: ",error);
        dispatch(finishRegister(false,error));
      });
  }

}

export const logout = ()=>{
  firebase.auth().signOut().then(function() {
    console.log("logout finish ok");
  }, function(error) {
    console.error("logout with error: ",error);
  });
  return {
    type:LOGOUT
  }
}

const requestUserProfile = ()=>{
  return {
    type: REQUEST_USER_PROFILE
  }
}

const requestUserProfileFullfilled = (profile)=>{
  return {
    type: REQUEST_USER_PROFILE_FULLFILLED,
    profile:profile
  }
}

const requestUserProfileRejected = (error)=>{
  return {
    type: REQUEST_USER_PROFILE_REJECTED,
    error:error
  }
}

export const getUserProfile = (userId)=>{
  return (dispatch) =>{
    dispatch(requestUserProfile());
    return firebase.database().ref(`users/${userId}`).once('value')
      .then((snapshot)=>{
        var obj = snapshot.val();
        obj.id=userId;

        return obj;
      })
      .then((profile)=>{
        dispatch(requestUserProfileFullfilled(profile));
        return profile;
      })
      .catch((error)=>{
        console.error("getProfile. error: ",error);
        dispatch(requestUserProfileRejected(error));
      });
  }
}

const requestProfile = ()=>{
  return {
    type: REQUEST_PROFILE
  }
}

const requestProfileFullfilled = (profile)=>{
  return {
    type: REQUEST_PROFILE_FULLFILLED,
    profile:profile
  }
}

const requestProfileRejected = (error) =>{
  return {
    type: REQUEST_PROFILE_REJECTED,
    error:error
  }
}

export const getProfile = ()=>{
  return (dispatch) =>{
    dispatch(requestProfile());
    return firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        firebase.database().ref(`users/${user.uid}`).once('value')
          .then((snapshot)=>{
            var obj = snapshot.val();
            return obj;
          })
          .then((profile)=>{
            dispatch(requestProfileFullfilled(profile));
            return profile;
          })
          .catch((error)=>{
            console.error("getProfile. error: ",error);
            dispatch(requestProfileRejected(error));
          });

      }
    });
  }
}

export const setProfileImage = (file) =>{
  return (dispatch) =>{
    return firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        console.log("setProfileImage. user: ",user);
        console.log("setProfileImage. file: ",file);

        var storage = firebase.storage();
        var storageRef = storage.ref();
        var profileImageRef = storageRef.child(`profile/${user.uid}/${file.name}`);

        var uploadTask = profileImageRef.put(file);

        uploadTask.on('state_changed', (snapshot)=>{
          var percent = 100* (snapshot.bytesTransferred/snapshot.totalBytes);
          console.log("setProfileImage. inProgress. percent: "+percent);
          // Observe state change events such as progress, pause, and resume
          // See below for more detail
        }, (error) =>{
          console.error("setProfileImage. error: ",error);
        }, () =>{
          var downloadURL = uploadTask.snapshot.downloadURL;
          console.log("setProfileImage. success. downloadUrl: ",downloadURL);
          firebase.database().ref(`users/${user.uid}/pictureUrl`)
            .set(downloadURL)
            .catch((error)=>{
              console.error("error: ",error);
            });
        });
      }
    });
  }
}


export const addEvent = (name,description,type,date,place,rating,numPeople,tickets) => {
  var owner = firebase.auth().currentUser.uid;

  console.log("owner: ",owner);

  date = date.toString();

  var event={
    name,description,type,date,place,owner,rating,numPeople,tickets
  }

  var ref = firebase.database().ref("event").push();
  ref.set(event);

  firebase.database().ref(`user-events/${ref.key}/${owner}`).set(true);

  return {
    type: ADD_EVENT,
    id: ref.key,
    ...event
  }
}

const requestEvents = ()=>{
  return {
    type:REQUEST_EVENTS
  }
}

const requestEventsFullfilled = (events)=> {
  return {
    type:REQUEST_EVENTS_FULLFILLED,
    events:events
  }
}

const requestEventsRejected = (error) =>{
  return {
    type:REQUEST_EVENTS_REJECTED,
    error:error
  }
}

export const getEvents = ()=>{
  return (dispatch) =>{
    dispatch(requestEvents());

    return firebase.database().ref('/event').once('value')
      .then((snapshot) =>{
        var obj = snapshot.val();
        console.log("getEvents. obj: ",obj);
        return obj;
      })
      .then((obj)=>{
        var count=0;
        var events = Object.keys(obj).map((key) => {
          return {
            ...obj[key],
            _id:key,
            id:count++,
            users:[]
          };
        });

        return events;
      })
      .then((events)=>{
        dispatch(requestEventsFullfilled(events));
      })
      .catch((error)=>{
        console.error("getEvents. error: ",error);
        dispatch(requestEventsRejected(error));
      });
  }
}

export const buyTicket = (eventId,bring)=>{
  var userId = firebase.auth().currentUser.uid;

  console.log("userId: ",userId);

  var data ={
    bring:bring
  }
  firebase.database().ref(`user-events/${eventId}/${userId}`).set(data);
  return {
    type: ON_BUY_TICKET
  }
}

const requestEventUsers = ()=>{
  return{
    type:GET_EVENT_USERS
  }
}

const finishedGetEventUser = (eventId,user) =>{
  return{
    type:GET_EVENT_USERS_FULLFILLED,
    user:user,
    eventId:eventId
  }
}

const requestGetEventUsersRejected = (error) =>{
  return{
    type:GET_EVENT_USERS_REJECTED,
    error:error
  }
}

export const getEventUsers = (eventId)=>{
  return (dispatch) =>{
    dispatch(requestEventUsers());

    return firebase.database().ref(`user-events/${eventId}`).once('value')
      .then((snapshot) =>{
        var obj = snapshot.val();
        console.log("getEventUsers. obj: ",obj);
        return obj;
      })
      .then((obj)=>{
        var events = Object.keys(obj).map((key) => {
          var content = obj[key];
          console.log("user-event: ",key,", content: ",content);

          firebase.database().ref(`users/${key}`).once('value')
          .then((snapshot)=>{
            var obj = snapshot.val();
            obj.id=key;
            obj.content=content;
            console.log("get user. obj: ",obj);
            dispatch(finishedGetEventUser(eventId,obj))
            return obj;
          })
          .catch((error)=>{
            console.error("pick userInfo: ",error);
          });
        });
      })
      .catch((error)=>{
        console.error("getEvents. error: ",error);
        dispatch(requestGetEventUsersRejected(error));
      });
  }
}
