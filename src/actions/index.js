import firebase from 'firebase'

export const REQUEST_REGISTER = 'REQUEST_REGISTER'
export const FINISH_REGISTER = 'FINISH_REGISTER'
export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export const FINISH_LOGIN = 'FINISH_LOGIN'
export const LOGOUT  = 'LOGOUT'

export const REQUEST_PROFILE = 'REQUEST_PROFILE'
export const REQUEST_PROFILE_FULLFILLED = 'REQUEST_PROFILE_FULLFILLED'
export const REQUEST_PROFILE_REJECTED = 'REQUEST_PROFILE_REJECTED'

export const REQUEST_EVENTS = 'REQUEST_EVENTS'
export const REQUEST_EVENTS_FULLFILLED = 'REQUEST_EVENTS_FULLFILLED'
export const REQUEST_EVENTS_REJECTED = 'REQUEST_EVENTS_REJECTED'

export const ADD_EVENT = 'ADD_EVENT'
export const FINISH_EVENT = 'FINISH_EVENT'

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
            console.log("obj: ",obj);
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

  var event={
    name,description,type,date,place,owner,rating,numPeople,tickets
  }

  var ref = firebase.database().ref("event").push();
  ref.set(event);

  return {
    type: ADD_EVENT,
    id: ref.key,
    ...event
  }
}
