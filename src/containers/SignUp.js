import React from 'react'
import SignUpForm from '../components/SignUpForm'
import { register } from '../actions'
import { connect } from 'react-redux'
import {browserHistory} from 'react-router'

class SignUp extends React.Component{
  constructor(props,context) {
      super(props,context);

      this.state = {
        error: null,
        user: {
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          firstname: "",
          lastname: ""
        }
      }
    }

  processForm(event){
    event.preventDefault();

    if(this.state.user.password!==this.state.user.confirmPassword){
      this.setState({error:{message:"Password didn't match"}});
      return;
    }


    this.props.dispatch(register(
      this.state.user.username,
      this.state.user.email,
      this.state.user.password,
      this.state.user.firstname,
      this.state.user.lastname));

  }

  changeUser(event) {
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

    console.log("signup. props: ",this.props);
    var error = this.state.error || this.props.error;
    return(
      <SignUpForm
        processForm={this.processForm.bind(this)}
        changeUser={this.changeUser.bind(this)}
        {...this.props}
        error={error}/>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("mapStateToProps. state: ",state);
  return {
    ...state.users.register
  }
}

SignUp = connect(mapStateToProps)(SignUp)
export default SignUp;
