import React from 'react'
import './Chip.css'


class Chip extends React.Component{

  render(){
    return(
      <div className="chip">
        <img src={this.props.image} alt="Person" width="96" height="96"/>
        {this.props.name}
        <span className="closebtn" onClick={this.props.onClose}>&times;</span>
      </div>
    );
  }
}

export default Chip;
