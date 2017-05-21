import React from 'react'
import {Input} from 'reactstrap'


class EventBuyButton extends React.Component{

  constructor(props){
    super(props);
    this.state ={
      tooltipOpened:false,
      bring:null
    }
  }

  handleBuy(){
    if(this.state.bring==null){
      console.lerror("error bring ==null")
      return;
    }
    this.props.onClickBuy(this.state.bring);
  }

  toogle(){
    console.log("toogle button dialog");
    this.setState({tooltipOpened:!this.state.tooltipOpened});
  }

  handleChangeBring(event){
    var bring = event.target.value;
    this.setState({bring:bring});
  }

  render(){

    var styles={
      dialog:{
        visibility:this.state.tooltipOpened?'visible':'hidden'
      }
    }
    return(
      <div>
        <button
        className="btn-create-event"
        onClick={this.toogle.bind(this)}
        style={{float:'right',marginRight:'16px',opacity:1}}>
        {this.props.isJoined?
          <span>Joined</span>:
          <span>Join (7$)</span>
        }
        </button>

        <div className="create-event-dialog" style={styles.dialog}>
          <Input
            type="text"
            placeholder="What are you going to bring?"
            onChange={this.handleChangeBring.bind(this)}/>
          <button
            className="btn-confirm-join"
            onClick={this.handleBuy.bind(this)}
            style={{opacity:1}}>
            Confirm
            </button>
        </div>
      </div>
    )
  }
}

export default EventBuyButton;

//onClickBuy
