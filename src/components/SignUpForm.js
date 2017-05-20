import React from 'react'
import './SignUpForm.css'
import {Alert,Button, Card, CardTitle, InputGroup, InputGroupAddon, Input} from 'reactstrap'
import FontIcon from "@epferrari/react-fa-icon"


class SignUpForm extends React.Component{

  render(){
    return(
      <div className="root">
        <Card block>
          <CardTitle>Sign up</CardTitle>
          {this.props.success && <Alert color="success">User registered correctly</Alert>}
          {this.props.error && <Alert color="danger">{this.props.error.message}</Alert>}
          <form action="/" onSubmit={this.props.processForm}>
            <InputGroup className="login-input">
              <InputGroupAddon>@</InputGroupAddon>
              <Input name="username" placeholder="Username" onChange={this.props.changeUser} required={true}/>
            </InputGroup>
            <InputGroup className="login-input">
              <InputGroupAddon>@</InputGroupAddon>
              <Input name="email" type="email" placeholder="Email" onChange={this.props.changeUser} required={true}/>
            </InputGroup>
            <InputGroup className="login-input">
              <InputGroupAddon><FontIcon icon="key"/></InputGroupAddon>
              <Input name="password" placeholder="Password" type="password"
                     onChange={this.props.changeUser} required={true}/>
            </InputGroup>
            <InputGroup className="login-input">
              <InputGroupAddon><FontIcon icon="key"/></InputGroupAddon>
              <Input name="confirmPassword" placeholder="Confirm password" type="password"
                     onChange={this.props.changeUser} required={true}/>
            </InputGroup>
            <InputGroup className="login-input">
              <InputGroupAddon>@</InputGroupAddon>
              <Input name="firstname" placeholder="First name" onChange={this.props.changeUser} required={true}/>
            </InputGroup>
            <InputGroup className="login-input">
              <InputGroupAddon>@</InputGroupAddon>
              <Input name="lastname" placeholder="Last name" onChange={this.props.changeUser} required={true}/>
            </InputGroup>
            <Button>Sign up</Button>
          </form>
        </Card>
      </div>
    );
  }
}

export default SignUpForm;
