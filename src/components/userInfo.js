import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';

class UserInfo extends Component {
  constructor(){
    super();
    this.state = {
    	user: {}
    }
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
      </div> 
    );
  }
}

export default withRouter(UserInfo);
