import React, { Component } from 'react';
import { Switch, Route, withRouter} from 'react-router-dom';

class About extends Component {
  constructor(){
    super();
    this.state = {
    }
    this.auth_view = this.auth_view.bind(this);
    this.getHomePage = this.getHomePage.bind(this);
    this.getAboutPage = this.getAboutPage.bind(this);
  }


  auth_view(e, val){
    e.preventDefault();
    this.setState({
      auth_type: val
    })
  }

  getHomePage(e){
    e.preventDefault();
    this.props.history.push(`/`);
  }

  getAboutPage(e){
    e.preventDefault();
    this.props.history.push(`/about`);
  }

  render() {
    return (
      <div>
        <div className ="row topbar" >
          <div className="col col-md-1 col-sm-1">
            <h3 className ="logo">Clip </h3>
          </div>
          <div className="col offset-md-8 offset-sm-8 profile_buttons">
            <button type="button" className="btn btn-link" onClick={this.getAboutPage}>About</button>
            <button type="button" className="btn btn-link" onClick={this.getHomePage}>Home</button>
          </div>
        </div>
        <div className="row">
          <div className="col col-md-6 offset-md-3 subtitle">
            <p>Finish your thought.</p>
          </div>
        </div>

        <div className="row about_content">
          <div className ="col col-md-6 offset-md-3 about-content"> 
            <p>Clip was designed to help writers overcome mental blocks one paragraph at a time. By encouraging writers to post one complete and coherent paragraph per post, Clip focuses on making ideas concrete rather than let concepts swim around in writers' heads ad infinitum, or let the weight of writing a full essay, column, blog post, etc. get in the way of testing the concept. </p>
            <p>Clip also provides user analytics on posts, including posts per week and most used words. </p>
          </div> 
        </div> 

        <div className="row about_content">
          <div className ="col col-md-6 offset-md-3 "> 
            <h5>Clean & intuitive writing interface:</h5> 
            <img src="images/clip.jpg" className ="about-image" height="320" width="360"/>
            <h5>Analytics to help you become a better writer:</h5> 
            <img src="images/analytics.jpg" className ="about-image"height="320" width="360"/>
          </div> 
        </div> 

        <div className="row">
          <div className ="col col-md-6 offset-md-3 bottom-about"> 
            <p>Happy writing!</p>
            <button className='btn btn-secondary clip_submit' onClick={this.getHomePage}>Home</button>
          </div> 
        </div> 
      </div>
    );
  }
}

export default withRouter(About);
