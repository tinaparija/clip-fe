import React, { Component } from 'react';
import './App.css';
import { Switch, Route} from 'react-router-dom';
import Home from './pages/home';
import Profile from './pages/profile';
import Clip from './pages/clip';


class App extends Component {
  constructor(){
  	super();
  	this.state = {
      user_id:'',
      post_type:'',
  	}  
    this.setUserId = this.setUserId.bind(this);
  }

  setUserId(id){
    this.setState({
        user_id: id,
    })
  }

  render() {
    return (
      <div className="App">
       <Switch>
		    <Route exact path='/' render={(props) => (<Home user_id={this.props.setUserId} /> )} />
		    <Route exact path='/:user_id' component={Profile}/>
		    <Route exact path='/:user_id/clip/:type' component={Clip}/>
 		   </Switch>
      </div>
    );
  }
}

export default App;
