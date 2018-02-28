import React, { Component } from 'react';
import { Switch, Route, withRouter} from 'react-router-dom';

class About extends Component {
  constructor(){
  	super();
  	this.state = {
  		auth_type:'',
  	}
  	this.auth_view = this.auth_view.bind(this);
    this.getUserId = this.getUserId.bind(this);
  }

  getUserId(id) {
    console.log(id);   
    this.props.history.push(`/${id}`);
  }

  auth_view(e, val){
  	e.preventDefault();
  	this.setState({
  		auth_type: val
  	})
  }

  render() {
    return (
      <div className>
        <div className ="row topbar" >
          <div className="col col-md-1 col-sm-1">
            <h3>Clip </h3>
          </div>
          <div className="col offset-md-9 col-md-4 profile_buttons">
            <button type="button" className="btn btn-link">Home</button>
          </div>
        </div>
        <div className = "row">
          <div className ="col col-md-6 offset-md-3">
          <p>Clip was designed to help writers overcome mental blocks one paragraph at a time. By encouraging writers to post one complete and coherent paragraph per post, Clips focuses on making ideas concrete rather than let concepts swim around in writers' heads ad infinitum -- or let the weight of writing a full essay, column, blog post, etc. get in the way of testing the concept.</p>
          <img src="/images/post.jpg" height="300" width="350" />
          <img src="/images/analytics.jpg" height="300" width="350"/>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(About);
