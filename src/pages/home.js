import React, { Component } from 'react';
import { Switch, Route, withRouter} from 'react-router-dom';
import Auth from '../components/auth'

class Home extends Component {
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
        </div>
        <div className="row">
          <div className="col col-md-6 offset-md-3 subtitle">
            <p>Finish your thought.</p>
          </div>
        </div>
        <div className="row">
          <div className="col col-md-4 col-sm-12 offset-md-4">
          <section id="signup_box">
             <button type="button" className="btn btn-link" onClick={(e) => this.auth_view(e, "signup")}>Sign Up</button>
             <button type="button" className="btn btn-link" onClick={(e) => this.auth_view(e, "login")}>Login</button>
          </section>
          </div>
          <Auth view = {this.state.auth_type} user_id={this.getUserId}/>
         </div>
      </div>
    );
  }
}

export default withRouter(Home);
