import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';

class UserInfo extends Component {
  constructor(){
    super();
    this.state = {
    	user: {}
    }
    this.logoutUser = this.logoutUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  logoutUser(e){
  e.preventDefault();
  fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/logout`, {credentials: "include"}).then((res) => {
      return res.json();
    }).then(json => {
      console.log(json)
      this.props.history.push(`/`);
    })
  }

  deleteUser(e){
      e.preventDefault();
      let user_id = this.props.match.params.user_id; 
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${user_id}`, {
          method: 'delete'
      }).then((json) => {
        console.log(json);
        this.props.history.push(`/`);
      });
  }

  componentWillMount(){
    let user_id = this.props.match.params.user_id; 
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${user_id}`).then((res) => {
      return res.json();
    }).then((json) => {
      this.setState({
      		user: json
      });
    });
  }

  render() {
    return (
      <div className ="col col-12">
        <p> Good to see you, {this.state.user.name}</p>
        <button type="button" className="btn btn-link info_buttons" type="button" onClick={this.logoutUser}>Logout</button>
        <button type="button" className="btn btn-link info_buttons" type="button" onClick={this.deleteUser}>Delete Account</button>

      </div> 
    );
  }
}

export default withRouter(UserInfo);
