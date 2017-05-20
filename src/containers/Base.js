import React, { PropTypes as T } from 'react'
import NavigationBar from '../components/NavigationBar'
import {connect} from 'react-redux'
import {getProfile} from '../actions'
import AddEvent from './AddEvent'

export class Base extends React.Component {
  static contextTypes = {
    router: T.object
  }

  constructor(props){
    super(props);
    this.state={
      addEventOpened:false
    }
  }

  componentDidMount(){
      console.log("componentDidMount. props: ",this.props);
      this.props.onGetProfile();
  }

  setAddEventOpened(addEventOpened){
    this.setState({addEventOpened:addEventOpened});
  }

  render() {
    let children = null;
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth //sends auth instance to children
      })
    }

    return (
      <div>
        <NavigationBar
          auth={this.props.route.auth}
          profile={this.props.profile}
          onClickOpenAddEventDialog={()=>this.setAddEventOpened(true)}/>
          <div className="container">
            {children}
          </div>
          <AddEvent
            open={this.state.addEventOpened}
            profile={this.props.profile}
            cancelCreateEvent={()=>this.setAddEventOpened(false)}
            onFinishCreateEvent={()=>this.setAddEventOpened(false)}/>
      </div>

    )
  }
}


const mapStateToProps = (state,ownProps) => {
  return {
    profile: state.users.profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetProfile: ()=>{
      dispatch(getProfile());
    }
  }
}

Base = connect(
  mapStateToProps,
  mapDispatchToProps
)(Base)

export default Base;
