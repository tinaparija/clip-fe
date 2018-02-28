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
      let dates_array = []
      for (let i = 0; i < clips.length; i++){
        let clip_date = new Date(clips[i].date); 
        dates_array.push(clip_date);
      }

      let oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      let twoWeeksAgo = new Date();
      twoWeeksAgo.setDate(oneWeekAgo.getDate() - 14)

      let threeWeeksAgo = new Date();
      threeWeeksAgo.setDate(oneWeekAgo.getDate() - 21)

      let fourWeeksAgo = new Date();
      fourWeeksAgo.setDate(oneWeekAgo.getDate() - 28)

      let oneWeekClips = dates_array.filter (x => x > oneWeekAgo)
      let twoWeekClips = dates_array.filter (x => x < oneWeekAgo && x > twoWeeksAgo)
      let threeWeekClips = dates_array.filter (x => x < twoWeeksAgo && x > threeWeeksAgo);
      let fourWeekClips = dates_array.filter (x => x < threeWeeksAgo && x > fourWeeksAgo);
      // let count_holder = {}
      // for (let i = 0; i < clips.length; i++){
      //   console.log(clips[i].date);
      //   count_holder[(clips[i].date)] = 1
      // }
      this.setState({
        dates: {four_weeks_ago: fourWeekClips.length, 
                three_weeks_ago: threeWeekClips.length, 
                two_weeks_ago: twoWeekClips.length, 
                last_week: oneWeekClips.length
               }
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
          <LineChart discrete={true} messages={{empty: "No data"}} data={this.state.dates} />
        </section> 
      </div> 
    );
  }
}

export default withRouter(AnalyticsFull);