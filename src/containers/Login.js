import React from 'react'
import LoginForm from '../components/LoginForm'
import { login } from '../actions'
import { connect } from 'react-redux'
import {browserHistory} from 'react-router'


class Login extends React.Component{

  constructor(props,context){
    super(props,context);

    this.state = {
      successMessage:null,
      errors:null,
      user:{
        email:"",
        password:""
      }
    }
  }


  processForm(event){
    event.preventDefault();
    console.log("try to login with user ",this.state.user);
    this.props.dispatch(login(this.state.user.email,this.state.user.password));
  }

  changeUser(event){
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  render(){
    if(this.props.success){
      setTimeout(()=>{
        console.log("redirect to /home");
        browserHistory.push('/home');
      },2000);
    }

    return(
      <LoginForm
        processForm={this.processForm.bind(this)}
        changeUser={this.changeUser.bind(this)}
        {...this.props}/>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("mapStateToProps. state: ",state);
  return {
    ...state.users.login
  }
}

Login = connect(mapStateToProps)(Login)
export default Login;
