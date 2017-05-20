import React from 'react'
import './ToggleSwitch.css'

class ToggleSwitch extends React.Component{


  handleToogleChange(e){
    this.props.onChange(e.target.checked);
  }


  render(){
    return(
      <label className="switch">
        <input type="checkbox" checked={this.props.default}
           onChange={this.handleToogleChange.bind(this)}/>
        <div className="slider round"></div>
      </label>
    );
  }
}

export default ToggleSwitch;
