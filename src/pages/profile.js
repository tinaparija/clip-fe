import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import Analytics from '../components/analytics';
import AllUserClips from '../components/allUserClips';
import UserInfo from '../components/userInfo'


class Profile extends Component {
  constructor(){
    super();
    this.state = {
      view: ''
    }
    this.newClip = this.newClip.bind(this)
  }

  newClip(){
    let user_id = this.props.match.params.user_id; 
    this.props.history.push(`/${user_id}/clip/new`);
  }

  render() {
    return (
      <div className="container">
      	<div className="row">
        	<div className="col col-md-12">
	        	<div className="row topbar"> 
              <div className="col col-md-1">
               <h3>Clip </h3>
              </div>
	       			<div className="col offset-md-7 col-md-4 profile_buttons">
                <button type="button" className="btn btn-link">All Clips</button>
                <button type="button" className="btn btn-link">Full Analytics</button>
                <button type="button" className="btn btn-link" onClick={this.newClip}>New Clip</button>
              </div>
	       		</div>
	       		<div className="row"> 
              <div className="col col-md-2 userprofile">
	      			  <UserInfo />
                <Analytics />
              </div>
              <div className="col col-md-10 profile_content">
            <div className="row clipcontainer"> 
              <AllUserClips />
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
