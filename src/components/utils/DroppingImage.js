import React from 'react'
import Avatar from 'react-avatar'
import Dropzone from 'react-dropzone'


class DroppingImage extends React.Component{

  constructor(props){
    super(props);

    this.state={
      droppedImg:null
    }

  }

  onDropImage(files){
    console.log("onDropImage. files: ",files);
    var file = files[0];
    this.setState({droppedImg:file});
    this.props.onDropImage(file);
  }

  render(){
    var pictureUrl =null;
    if(this.props.pictureUrl!=null){
      pictureUrl=this.props.pictureUrl;
    }

    if (this.state.droppedImg) {
        var avatar = (<Avatar size={this.props.size} src={this.state.droppedImg.preview}
                              round={true} className="avatar"/>);
    } else if(pictureUrl){
        avatar = (<Avatar size={this.props.size} src={pictureUrl} round={true} className="avatar"/>);
    }else {
        avatar = (<Avatar size={this.props.size}  round={true} className="avatar"/>);
    }

    return(
      <div className={this.props.innerClassName}
        style={{width:this.props.size,height:this.props.size}}>
          <Dropzone
              className="dropzone-img"
              multiple={false}
              accept="image/*"
              onDrop={this.onDropImage.bind(this)}
              style={{width:this.props.size,height:this.props.size}}>
              {avatar}
          </Dropzone>
      </div>
    );
  }
}

export default DroppingImage;
