import React from 'react'
import ReactDOM from 'react-dom'
import './EventCard.css'
import Avatar from 'react-avatar'
import { Tooltip } from 'reactstrap'
import FaIcon  from '@epferrari/react-fa-icon'


class EventCard extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      tooltipOpen: false
    };
  }


  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  componentDidMount() {
    console.log("EventCard. props: ",this.props);
    this.ensureVisible();
  }

  componentDidUpdate() {
    this.ensureVisible();
  }

  ensureVisible() {
    if (this.props.active) {
      this.props.scrollIntoView(ReactDOM.findDOMNode(this));
    }
  }

  render(){
    var pictureUrl =null;
    if(this.props.pictureUrl!=null){
      pictureUrl=this.props.pictureUrl;
    }

    if(pictureUrl){
        var avatar = (
          <Avatar size={25} src={pictureUrl}
            round={true}
            className="card-user avatar"
            onMouseEnter={this.toggle.bind(this)}
            onMouseExit={this.toggle.bind(this)}>
            <Tooltip placement="right" isOpen={this.state.tooltipOpen} target="TooltipExample" toggle={this.toggle}>
              Hello world!
            </Tooltip>
          </Avatar>
          );
    }else {
        avatar = (
          <Avatar size={25}  round={true}
            className="card-user avatar"
            onMouseEnter={this.toggle.bind(this)}
            onMouseExit={this.toggle.bind(this)}>
            <Tooltip placement="right" isOpen={this.state.tooltipOpen} target="TooltipExample" toggle={this.toggle}>
              Hello world!
            </Tooltip>
          </Avatar>
        );
    }

    if(this.props.backgroundImage){
      var style={backgroundImage:`url(${this.props.backgroundImage})`,backgroundSize:'contain'};
      //var style={backgroundImage:`linearGradient(rgba(0,0,0,0.3), rgba(0,0,0,0.2)), url('${this.props.backgroundImage}')`};
    }else{
      var style={background:'rgba(222,222,222,0.32)'};
    }

    console.log("EventCard. style: ",style);

    return(
      <div className="card"
        onClick={()=>this.props.onClickCard(this.props.id)}
        style={style}>
        <div className="card-category">
          {this.props.type}
          <span style={{marginLeft:'8px'}}>
            10<FaIcon icon="user"/>
          </span>
          <span style={{marginLeft:'8px'}}>
            10<FaIcon icon="ticket"/>
          </span>
        </div>

        <div className="card-description">
          <h2>{this.props.title}</h2>
          <p>{this.props.content}</p>
        </div>
        {avatar}
      </div>
    );
  }
}

export default EventCard
