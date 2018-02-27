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
	  }), credentials: "include"
	}).then((res) => {
		console.log(res.body);
	    return res.json()
	}).then((json) => {
		console.log(json)
	    this.props.user_id(json._id)
	});
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
	  }), credentials: "include"
	}).then((res) => {
		console.log(res);
	    return res.json()
	}).then((json) => {
	    this.props.user_id(json._id)
	});
}

  render() {
  		return(
  			
	  			<div className="col col-md-4 col-sm-12 offset-md-4">
		  			<form style = {this.props.view == 'login' ? {} : {display: 'none'}}onSubmit={this.loginUser}>
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
		  				

			        <form style={this.props.view !== 'login' ? {} : {display: 'none'}} onSubmit={this.createUser}>
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

export default Auth;
