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

  render() {
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
                    <button type='submit' className='btn btn-secondary clip_submit'>Post</button>
                </form>
            </div>
          </div>
        </div>
    );
  }
}

export default Clip;
