import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import Analytics from '../components/analytics';
import AnalyticsFull from '../components/analyticsFull';
import AllUserClips from '../components/allUserClips';
import UserInfo from '../components/userInfo'


class Profile extends Component {
  constructor(){
    super();
    this.state = {
      profile_view: 'allClips'
    }
    this.newClip = this.newClip.bind(this)
    this.allClips = this.allClips.bind(this)
    this.showAnalytics = this.showAnalytics.bind(this)
  }

  allClips(){
    this.setState({
      profile_view: "allClips"
    })
  }

  showAnalytics(){
    this.setState({
      profile_view: "analytics"
    })
  }

  newClip(){
    let user_id = this.props.match.params.user_id; 
    this.props.history.push(`/${user_id}/clip/new`);
  }

  render() {
      return (
        <div className="container profile_page">
        	<div className="row">
          	<div className="col col-md-12">
  	        	<div className="row topbar"> 
                <div className="col col-md-1">
                 <h3>Clip </h3>
                </div>
  	       			<div className="col offset-md-7 col-md-4 profile_buttons">
                  <button type="button" className="btn btn-link" onClick={this.allClips}>All Clips</button>
                  <button type="button" className="btn btn-link" onClick={this.showAnalytics}>Analytics</button>
                  <button type="button" className="btn btn-link" onClick={this.newClip}>New Clip</button>
                </div>
  	       		</div>
  	       		<div className="row"> 
                <div className="col col-md-2 userprofile">
  	      			  <UserInfo />
                  <Analytics />
                </div>
                <div className="col col-md-10 profile_content">
              <div className="row profile_container"> 
                {this.state.profile_view == "allClips" ? (<AllUserClips />) : (<AnalyticsFull />) }
              
              </div>
              </div> 
  	      		</div>
  	      
        		</div>
        
        	</div>      	
        </div> 
      );
  }
}

export default withRouter(Profile);
