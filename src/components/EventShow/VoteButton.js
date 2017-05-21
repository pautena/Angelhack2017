import React from 'react'
import { Button,Modal,ModalHeader,ModalBody,ModalFooter } from 'reactstrap'
import UserVote from './UserVote'


class VoteButton extends React.Component{

  constructor(props){
    super(props);
    this.state ={
      modalOpened:false
    }
  }

  toggle(){
    console.log("toogle button modalOpened");
    this.setState({modalOpened:!this.state.modalOpened});
  }

  render(){

    console.log("VoteButton. props: ",this.props);

    var users = this.props.users.map((user)=>{
      return (
        <UserVote
        size={50}
        user={user}/>
      )
    })

    var styles={
      dialog:{
        visibility:this.state.tooltipOpened?'visible':'hidden'
      }
    }
    return(
      <div>
        <button
        className="btn-vote-event"
        onClick={this.toggle.bind(this)}
        style={{float:'right',marginRight:'16px',opacity:1}}>
          <span>Vote</span>
        </button>


        <Modal isOpen={this.state.modalOpened} toggle={this.toggle.bind(this)}>
          <ModalHeader toggle={this.toggle.bind(this)}>Vote</ModalHeader>
          <ModalBody>
            {users}
          </ModalBody>
          <ModalFooter>
            <button className="btn-vote-confirm" onClick={this.toggle.bind(this)}>Vote</button>{' '}
            <button className="btn-vote-cancel" onClick={this.toggle.bind(this)}>Cancel</button>
          </ModalFooter>
        </Modal>

      </div>
    )
  }
}

export default VoteButton;
