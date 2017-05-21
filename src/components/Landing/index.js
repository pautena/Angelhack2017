import React from 'react'
import './landing.css'
import {browserHistory} from 'react-router'

class Landing extends React.Component {
  constructor(props, context) {
    super(props, context)
      this.state = {
    }
  }

    componentDidMount() {

    }

    findParties(){
      browserHistory.push('/home')
    }

    render() {

        return (
          <div className="landing">
            <div className="landing-presentation">
              <div className="landing-presentation-text">
                <h1>InParties</h1>
                <h2>Integrate foreign people with local people with themed parties</h2>
                <div className="landing-cta">
                  <a href="#"
                    className="btn btn-success"
                    onClick={this.findParties.bind(this)}>Find parties</a>
                </div>
              </div>
              <div className="landing-presentation-image">
                <img src="http://lorempixel.com/400/300/food/" />
              </div>
            </div>
            <div className="landing-features">
              <div className="features">
                <div className="feature">
                  <i className="fa fa-spoon" aria-hidden="true"></i>
                  <h3>Food</h3>
                </div>
                <div className="feature">
                  <i className="fa fa-beer" aria-hidden="true"></i>
                  <h3>Drinks</h3>
                </div>
                <div className="feature">
                  <i className="fa fa-music" aria-hidden="true"></i>
                  <h3>Music</h3>
                </div>
              </div>
              <div>
                <h3>Collaborate in the partuy in your own way<br />Share what you have</h3>
              </div>
            </div>
            <div className="landing-integration">
              <div className="landing-integration-image">
                <img src="http://lorempixel.com/400/300/people/" />
              </div>
              <div className="landing-integration-text">
                <h2>Aiming for social integration and inclusion</h2>
              </div>
            </div>
          </div>
        )
    }
}

export default Landing;
