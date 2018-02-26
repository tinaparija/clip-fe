import React, { Component } from 'react';
import { Switch, Route, withRouter} from 'react-router-dom';
import Auth from '../components/auth'

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
      <div className ="container">
        <div className ="row topbar" >
          <div className="col col-md-1 col-sm-1">
            <h3>Clip </h3>
          </div>
          <div className="col offset-md-9 col-md-4 profile_buttons">
            <button type="button" className="btn btn-link">Home</button>
          </div>
          

        </div>
        
      </div>
    );
  }
}

export default withRouter(About);
