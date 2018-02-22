import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';

class AllUserClips extends Component {
  constructor(){
    super();
    this.state = {
    	clips: []
    }
  }

  componentWillMount(){
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

  render() {
	  return (
	  	<div>
		  	{this.state.clips.map(clip => {
		  		return (
            <div>
  		  			<div className="clip">
  		  				<h4>{clip.concept}</h4>
  		  				<p>{clip.content}</p>
                <button type="button" className="btn btn-link postbuttons">Delete</button>
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
