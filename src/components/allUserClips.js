import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';

class AllUserClips extends Component {
  constructor(){
    super();
    this.state = {
    	clips: [],
      refresh: ''
    }
    this.deleteClip = this.deleteClip.bind(this);
    this.getData = this.getData.bind(this);
  }

  getData(){
    let user_id = this.props.match.params.user_id; 
    fetch(`http://localhost:8080/api/users/${user_id}`).then((res) => {
      return res.json();
    }).then((json) => {
      let user_clips = json.clips;
      this.setState({
          clips: user_clips
      });
    });
  }

  deleteClip(clipId){
    let user_id = this.props.match.params.user_id; 
    return (e) => {
      e.preventDefault();
      console.log(clipId);
      fetch(`http://localhost:8080/api/users/${user_id}/clips/${clipId}`, {
          method: 'delete'
      }).then((json) => {
        this.getData();
        });
    }
  }

  componentWillMount(){
    this.getData();
  }

  render() {
	  return (
	  	<div>
		  	{this.state.clips.map(clip => {
		  		return (
            <div>
  		  			<div className="clip">
  		  				<h4>{clip.concept}</h4>
  		  				<p>{clip.content}</p>
                <button type="button" className="btn btn-link postbuttons" onClick={this.deleteClip(clip._id) }>Delete</button>
                <button type="button" className="btn btn-link postbuttons">Edit</button>
  		  			</div>
            </div>
		  		)
		  	})}
	  	</div>
	  );
	}
}

export default withRouter(AllUserClips);
