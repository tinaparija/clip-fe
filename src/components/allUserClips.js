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
    this.showEditView = this.showEditView.bind(this);
    this.getData = this.getData.bind(this);
  }

  getData(){
    let user_id = this.props.match.params.user_id; 
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${user_id}/clips`).then((res) => {
      return res.json();
    }).then((json) => {
      this.setState({
          clips: json.clips
      });
    });
  }

  deleteClip(clipId){
    let user_id = this.props.match.params.user_id; 
    return (e) => {
      e.preventDefault();
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${user_id}/clips/${clipId}`, {
          method: 'delete', body: {credentials: "include"}
      }).then((json) => {
        this.getData();
        });
    }
  }

  showEditView(clipId){
    let user_id = this.props.match.params.user_id; 
    return (e) => {
      e.preventDefault();
      this.props.history.push(`/${user_id}/clip/${clipId}`);
    }
  }

  componentWillMount(){
    this.getData();
  }

  render() {
     if (!this.state.clips[0]){
        return(
        <div>
          <p>No posts yet! Start writing :)</p>
        </div>
       )
     }
     return (
      <div>
        {this.state.clips.map(clip => {
        return (
            <div>
              <div className="clip">
                <h4>{clip.concept}</h4>
                <p>{clip.content}</p>
                <button type="button" className="btn btn-link postbuttons" onClick={this.deleteClip(clip._id)}>Delete</button>
                <button type="button" className="btn btn-link postbuttons" onClick={this.showEditView(clip._id)}>Edit</button>
              </div>
            </div>
          )
        })}
      </div>
    );
  }
}

export default withRouter(AllUserClips);
