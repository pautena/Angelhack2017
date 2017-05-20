import React from 'react'
import './EnterInput.css'


class EnterInput extends React.Component{


  handleKeyPress(e){
    console.log("handleKeyPress. event:",e.key);
    if(e.key==='Enter'){
      e.preventDefault();
      this.props.onKeyEnterPress(e.target.value);
      e.target.value="";
    }
  }


  render(){
    return(
      <input name="people" className="people-input"
        onKeyPress={this.handleKeyPress.bind(this)}/>
    );
  }
}

export default EnterInput;
