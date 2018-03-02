import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import { LineChart, PieChart, ScatterChart, ColumnChart} from 'react-chartkick';
window.Chart = require('chart.js');
window.Highcharts = require('highcharts');


class AnalyticsFull extends Component {
  constructor(){
    super();
    this.state = {
      dates: {},
      top_word:'',
      clips: []
    }
    this.getData = this.getData.bind(this);
    this.createChart = this.createChart.bind(this);
    this.setTopWord = this.setTopWord.bind(this);
    this.setClips = this.setClips.bind(this);
    }

    setClips(clips){
      this.setState({
        clips: clips 
      })
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
      let currentDate = new Date();
      console.log(currentDate);
      
      let oneWeekAgo = new Date();
      oneWeekAgo.setDate(currentDate.getDate() - 7);

      let twoWeeksAgo = new Date();
      twoWeeksAgo.setDate(currentDate.getDate() - 14)
      console.log(twoWeeksAgo)

      let threeWeeksAgo = new Date();
      threeWeeksAgo.setDate(currentDate.getDate() - 21)
      console.log(threeWeeksAgo)

      let fourWeeksAgo = new Date();
      fourWeeksAgo.setDate(currentDate.getDate() - 28)
      console.log(fourWeeksAgo)

      let oneWeekClips = dates_array.filter (x => x > oneWeekAgo)
      let twoWeekClips = dates_array.filter (x => x < oneWeekAgo && x > twoWeeksAgo)
      let threeWeekClips = dates_array.filter (x => x < twoWeeksAgo && x > threeWeeksAgo);
      let fourWeekClips = dates_array.filter (x => x < threeWeeksAgo && fourWeeksAgo);

      this.setState({
        dates: {"four weeks ago": fourWeekClips.length, 
                "three weeks ago": threeWeekClips.length, 
                "two weeks ago": twoWeekClips.length, 
                "last week": oneWeekClips.length
               }
      })
    }

    getData(){
    let user_id = this.props.match.params.user_id; 
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${user_id}/clips`).then((res) => {
        return res.json();
      }).then((json) => {
          this.createChart(json.clips);
          this.setTopWord(json.top_word);
          this.setClips(json.clips);
      })
    };

  componentWillMount(){
    this.getData();
  }

  render() {
      if (!this.state.clips[0]){
        return(
        <div>
          <p>Analytics unavailable because there are no posts.</p>
        </div>
       )
      }
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