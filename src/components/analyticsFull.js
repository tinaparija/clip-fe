import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import { LineChart, PieChart, ScatterChart } from 'react-chartkick';
window.Chart = require('chart.js');
window.Highcharts = require('highcharts');


class AnalyticsFull extends Component {
  constructor(){
  	super();
  	this.state = {
      clips: [],
      dates: {}
    }
    this.getData = this.getData.bind(this);
    this.createChart = this.createChart.bind(this);
  	}

    createChart(clips){
      // let clips = this.state.clips;
      console.log(clips);
      let count_holder = {}
      for (let i = 0; i < clips.length; i++){
        count_holder[(clips[i].date)] = 1
      }
      this.setState({
        dates: count_holder
      })
    }

    getData(){
    let user_id = this.props.match.params.user_id; 
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${user_id}/clips`).then((res) => {
      console.log(res)
        return res.json();
      }).then((json) => {
          this.createChart(json.clips);
      })
    };

  componentWillMount(){
    this.getData();
  }

  render() {

    return (
      <div className ="col-12 ">
        <p> Main Analytics Page </p>
        <LineChart data={this.state.dates} />
      </div> 
    );
  }
}

export default withRouter(AnalyticsFull);