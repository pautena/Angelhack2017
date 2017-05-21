import React from 'react'
import Avatar from 'react-avatar'
import {Row,Col} from 'reactstrap'
import Rating from 'react-rating'


class UserVote extends React.Component{


  render(){
    console.log("UserVote. props: ",this.props.user);

    var pictureUrl="";
    if(this.props.user){
      pictureUrl= this.props.user.pictureUrl;
    }

    if(pictureUrl){
        var avatar = (<Avatar size={this.props.size} src={pictureUrl} round={true} className="avatar"/>);
    }else {
        avatar = (<Avatar size={this.props.size}  round={true} className="avatar"/>);
    }
    return(<Row>
      <Col xs={3}>
        {avatar}
      </Col>
      <Col xs={4} style={{paddingTop:'12px'}}>
        {this.props.user.firstname} {this.props.user.lastname}
      </Col>
      <Col xs={5} style={{textSize:'24px',paddingTop:'12px'}}>
        <Rating
            empty="fa fa-star-o"
            full="fa fa-star"
            start={0}
            stop={5}/>
      </Col>

    </Row>)
  }
}

export default UserVote;
