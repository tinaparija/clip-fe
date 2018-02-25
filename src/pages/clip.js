import React, { Component } from 'react';

class Clip extends Component {
 constructor(){
    super();
    this.state = {
    	concept:'',
    	content:''
    }
    this.postClip = this.postClip.bind(this);
  }

updateMyState(stateKey) {
  return (e) => {
      this.setState({
            [stateKey]: e.target.value
        })
    }
}
  postClip(e){
  	e.preventDefault();
	let user_id = this.props.match.params.user_id; 
	debugger
	fetch(`http://localhost:8080/api/users/${user_id}/clips`, {  
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			concept: this.state.concept,
			content: this.state.content,
		})
	}).then((res) => {
		console.log(res)
		return res.json()
	}).then((json) => {
		this.props.history.push(`/${user_id}`);
	});
  	

  }

  render() {
    return (
	  <div className = "container">
	  	 <div className = "row">
	      	<div className = "col col-md-8 offset-md-2 new_clip">
		      	<form onSubmit={this.postClip}>
		       		<div className="form-group">
					<input type="username" className="form-control" id="username" onChange={this.updateMyState('content')} placeholder="Concept / Title"/>
					</div>
					<div className="form-group">
					
					<textarea className="form-control" rows="8" onChange={this.updateMyState('concept')} placeholder="Content"></textarea>
					</div>

					<button type='submit' className='btn btn-secondary'>Post</button>
				</form>
			</div>
	      </div>
	  </div>
    );
  }
}

export default Clip;
