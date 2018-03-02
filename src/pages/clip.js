import React, { Component } from 'react';

class Clip extends Component {
  constructor(){
    super();
    this.state = {
      concept:'',
      content:'',
      clip: ''
    }
    this.postClip = this.postClip.bind(this);
    this.editClip = this.editClip.bind(this);
  }

  updateMyState(stateKey) {
    return (e) => {
      this.setState({
          [stateKey]: e.target.value
      })
    }
  }

  editClip(e){
    e.preventDefault();
    let user_id = this.props.match.params.user_id; 
    let clip_id = this.props.match.params.type; 
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${user_id}/clips/${clip_id}`, {  
        method: 'PUT',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            concept: this.state.concept,
            content: this.state.content,
        }), credentials: "include"
    }).then((res) => {
        return res.json()
    }).then((json) => {
        this.props.history.push(`/${user_id}`);
    });
  }

  postClip(e){
    console.log("post");
    e.preventDefault();
    let user_id = this.props.match.params.user_id; 
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${user_id}/clips`, {  
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            concept: this.state.concept,
            content: this.state.content,
        }), credentials: "include"
    }).then((res) => {
        console.log(res)
        return res.json()
    }).then((json) => {
        this.props.history.push(`/${user_id}`);
    });
  }

  componentWillMount(){
    let user_id = this.props.match.params.user_id;
    let clip_id = this.props.match.params.type;
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${user_id}/clips/${clip_id}`).then((res) => {
      return res.json();
      console.log(res);
    }).then((json) => {
      if (json){
        this.setState({
        concept: json.concept,
        content: json.content
      })
      } else {
        this.setState({
        clip: "new clip"
      })
      }
    });
  }

  render() {
    if (this.state.clip === "new clip"){
      return (
      <div className = "container">
        <div className = "row">
           <div className = "col col-md-8 offset-md-2 new_clip">
                <form onSubmit={this.postClip}>
                    <div className="form-group clip_input">
                        <input type="username" required maxlength="30" className="form-control clip_input clip_title" id="username" onChange={this.updateMyState('concept')} placeholder="Concept / Title"/>
                        <p id="clip_divider">- - - - - - </p>
                    </div>
                    <div className="form-group ">
                        <textarea className="form-control clip_input" required maxlength="500" rows="8" onChange={this.updateMyState('content')} placeholder="Content"></textarea>
                    </div>
                    <p id="max-length-note"> Write it down in less than 500 characters.</p> 
                    <button type='submit' className='btn btn-secondary clip_submit'>Post</button>
                </form>
            </div>
          </div>
        </div>
    );
    }
    console.log("render edit")
    return (
      <div className = "container">
        <div className = "row">
           <div className = "col col-md-8 offset-md-2 new_clip">
                <form onSubmit={this.editClip}>
                    <div className="form-group clip_input">
                        <input type="username" required value={this.state.concept} maxlength="30" className="form-control clip_input clip_title" id="username" onChange={this.updateMyState('concept')}/>
                        <p id="clip_divider">- - - - - - </p>
                    </div>
                    <div className="form-group ">
                        <textarea className="form-control clip_input" required value={this.state.content} maxlength="500" rows="8" onChange={this.updateMyState('content')} placeholder="Content"></textarea>
                    </div>
                    <p id="max-length-note"> Write it down in less than 500 characters.</p> 
                    <button type='submit' className='btn btn-secondary clip_submit'>Update</button>
                </form>
            </div>
          </div>
        </div>
    )
    
  }
}

export default Clip;
