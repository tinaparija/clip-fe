import React, { Component } from 'react';
import { Switch, Route, withRouter} from 'react-router-dom';

class Auth extends Component {
  constructor(){
  	super();
  	this.state = {
  		login_email: '',
  		login_pw: '',
  		signup_email: '',
  		signup_pw:'',
  		name: '',
  	}
  	this.updateMyState = this.updateMyState.bind(this);
  	this.createUser = this.createUser.bind(this);
  	this.loginUser = this.loginUser.bind(this);
  	this.logoutUser = this.logoutUser.bind(this);
  }

updateMyState(stateKey) {
    return (e) => {
        this.setState({
            [stateKey]: e.target.value
        })
    }
}

loginUser(e){
	e.preventDefault()
	fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/login`, {  
	  method: 'POST',
	  headers: {
	    'Accept': 'application/json',
	    'Content-Type': 'application/json',
	  },
	  body: JSON.stringify({
	    email: this.state.login_email,
	    password: this.state.login_pw
	  })
	}).then((res) => {
		console.log(res.body);
	    return res.json()
	}).then((json) => {
		console.log(json)
	    this.props.user_id(json._id)
	});
}

logoutUser(e){
	e.preventDefault();
	fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/logout`).then((res) => {
      return res.json();
    }).then(json => {
    	console.log(json)
    })
}

createUser(e){
  	e.preventDefault();
  	fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users`, {  
	  method: 'POST',
	  headers: {
	    'Accept': 'application/json',
	    'Content-Type': 'application/json',
	  },
	  body: JSON.stringify({
	    name: this.state.name,
	    email: this.state.signup_email,
	    password: this.state.signup_pw
	  })
	}).then((res) => {
		console.log(res);
	    return res.json()
	}).then((json) => {
	    this.props.user_id(json._id)
	});
}

  render() {

  	if (this.props.view === 'login'){
  		return(
  			<div className="col col-md-4 offset-md-4">
	  			<form onSubmit={this.loginUser}>
	  				<div className="form-group">
				    	<label htmlFor="email">Email</label>
				   		<input type="email" className="form-control" required onChange={this.updateMyState('login_email')}/>
			 		</div>

				 	<div className="form-group">
					    <label htmlFor="password">Password</label>
					    <input type="password" className="form-control" required onChange={this.updateMyState('login_pw')}/>
				  	</div>
				   	<button type='submit' className='btn btn-primary'>Submit</button>
	  			</form> 
	  				<button type='submit' className='btn btn-primary' onClick={this.logoutUser}>Logout</button>
  			</div>
  		);
  	} else {
	    return (
	    	<div className="col col-md-4 offset-md-4">
		        <form onSubmit={this.createUser}>
		          <div className="form-group">
				    <label htmlFor="name">First Name</label>
				    <input type="name" className="form-control" required onChange={this.updateMyState('name')}/>
				  </div>

		          <div className="form-group">
				    <label htmlFor="email">Email</label>
				    <input type="email" className="form-control" required onChange={this.updateMyState('signup_email')}/>
				  </div>

				  <div className="form-group">
				    <label htmlFor="password">Password</label>
				    <input type="password" className="form-control" required onChange={this.updateMyState('signup_pw')}/>
				  </div>
				  <button type='submit' className='btn btn-primary'>Submit</button>
				</form >
			</div>
	    );
	}
  }
}

export default Auth;
