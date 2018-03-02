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
    this.getHomePage = this.getHomePage.bind(this);
    this.getAboutPage = this.getAboutPage.bind(this);
  }

  getUserId(id) {
    this.props.history.push(`/${id}`);
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
        <div className="row">
          <div className="col col-md-4 offset-md-4 col-sm-12">
          <section id="signup_box">
            <button type="button" className="btn btn-link" onClick={(e) => this.auth_view(e, "signup")}>Sign Up</button>
             <button type="button" className="btn btn-link" onClick={(e) => this.auth_view(e, "login")}>Login</button>
             <p></p>
          </section>
          </div>
        </div> 
        <div className="row">
          <div className="col">
            <Auth view = {this.state.auth_type} user_id={this.getUserId}/>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
