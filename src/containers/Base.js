import React, { PropTypes as T } from 'react'
import NavigationBar from '../components/NavigationBar'
import {connect} from 'react-redux'
import {getProfile} from '../actions'
import {browserHistory} from 'react-router'

export class Base extends React.Component {
  static contextTypes = {
    router: T.object
  }

  componentDidMount(){
      console.log("componentDidMount. props: ",this.props);
      this.props.onGetProfile();
  }

  onClickAddEvent(){
    browserHistory.push('/event/add');
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
          onClickOpenAddEventDialog={this.onClickAddEvent.bind(this)}/>
          <div className="container">
            {children}
          </div>
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
