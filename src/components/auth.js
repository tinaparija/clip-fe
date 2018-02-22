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
  }

updateMyState(stateKey) {
    return (e) => {
        this.setState({
            [stateKey]: e.target.value
        })
    }
}

 createUser(e){
  	e.preventDefault();
  	fetch('http://localhost:8080/api/users', {  
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
	    return res.json()
	}).then((json) => {
	    this.props.user_id(json._id)
	});
}

  render() {
  	if (this.props.view === 'login'){
  		return(
  			<div className="col col-md-4 offset-md-4">
	  			<form>
	  				<div className="form-group">
				    	<label htmlFor="email">Email</label>
				   		<input type="email" className="form-control" id="email"  />
			 		</div>

				 	<div className="form-group">
					    <label htmlFor="password">Password</label>
					    <input type="password" className="form-control" id="password" />
				  	</div>
				   	<button type='submit' className='btn btn-primary'>Submit</button>

	  			</form> 
  			</div>
  		);
  	}
    return (
    	<div className="col col-md-4 offset-md-4">
	        <form onSubmit={this.createUser}>
	          <div className="form-group">
			    <label htmlFor="name">Name</label>
			    <input type="name" className="form-control" id="name" onChange={this.updateMyState('name')}/>
			  </div>

	          <div className="form-group">
			    <label htmlFor="email">Email</label>
			    <input type="email" className="form-control" id="email" onChange={this.updateMyState('signup_email')}/>
			  </div>

			  <div className="form-group">
			    <label htmlFor="password">Password</label>
			    <input type="password" className="form-control" id="password" onChange={this.updateMyState('signup_pw')}/>
			  </div>
			  <button type='submit' className='btn btn-primary'>Submit</button>
			</form >
		</div>
    );
  }
}

export default Auth;
