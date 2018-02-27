import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import { LineChart, PieChart, ScatterChart, ColumnChart} from 'react-chartkick';
window.Chart = require('chart.js');
window.Highcharts = require('highcharts');


class AnalyticsFull extends Component {
  constructor(){
  	super();
  	this.state = {
      clips: [],
      dates: {}, 
      top_word:''
    }
    this.getData = this.getData.bind(this);
    this.createChart = this.createChart.bind(this);
    this.setTopWord = this.setTopWord.bind(this);
  	}

    setTopWord(word){
      this.setState({
          top_word: word
      })
    }

    createChart(clips){
      let count_holder = {}
      for (let i = 0; i < clips.length; i++){
        console.log(clips[i].date);
        count_holder[(clips[i].date)] = 1
      }
      this.setState({
        dates: count_holder
      })
    }

    getData(){
    let user_id = this.props.match.params.user_id; 
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${user_id}/clips`).then((res) => {
        return res.json();
      }).then((json) => {
          this.createChart(json.clips);
          this.setTopWord(json.top_word)

      })
    };

  componentWillMount(){
    this.getData();
  }

  render() {
    return (
      <div className ="col-12 ">
        <h4> Clip Analytics </h4>
         <section>
          <p> Your top word is: </p>
          <h5 id ="top_word">{this.state.top_word}</h5>
        </section> 
        <section id = "graph"> 
          <p> Your posts per week: </p>
          <LineChart data={this.state.dates} />
        </section> 
      </div> 
    );
  }
}

export default withRouter(AnalyticsFull);