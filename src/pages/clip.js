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
		debugger
		return res.json()
	}).then((json) => {
		debugger
		console.log(json);
	});
  	
  }

  render() {
    return (
      <div className = "row">
      	<div className = "col">
	      	<form onSubmit={this.postClip}>
	       		<div className="form-group">
				<label htmlFor="concept">Concept</label>
				<input type="username" className="form-control" id="username" onChange={this.updateMyState('content')}/>
				</div>

				<div className="form-group">
				<label htmlFor="content">Content</label>
				<textarea className="form-control" rows="8" onChange={this.updateMyState('concept')}></textarea>
				</div>

				<button type='submit' className='btn btn-primary'>Submit</button>
			</form>
		</div>
      </div>
    );
  }
}

export default Clip;
