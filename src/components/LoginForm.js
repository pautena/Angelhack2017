import React from 'react'
import {Button,Card,CardTitle,InputGroup,InputGroupAddon,Input,Alert} from 'reactstrap'
import './LoginForm.css'
import FontIcon from "@epferrari/react-fa-icon"

class LoginForm extends React.Component{


  render(){

    return(
      <div className="root">

        <Card block>
          <CardTitle>Login</CardTitle>
          {this.props.success && <Alert color="success">Login success</Alert>}
          {this.props.error && <Alert color="danger">{this.props.error.message}</Alert>}
          <form action="/" onSubmit={this.props.processForm.bind(this)}>
            <InputGroup className="login-input">
              <InputGroupAddon><FontIcon icon="user"/></InputGroupAddon>
              <Input name="email" placeholder="Email"
                onChange={this.props.changeUser} required={true}/>
            </InputGroup>
            <InputGroup className="login-input">
              <InputGroupAddon><FontIcon icon="key"/></InputGroupAddon>
              <Input name="password" placeholder="Password" type="password"
                onChange={this.props.changeUser} required={true}/>
            </InputGroup>
            <Button>Login</Button>
          </form>
        </Card>
      </div>
    );
  }
}

export default LoginForm;
