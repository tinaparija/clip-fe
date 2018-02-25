import React, { Component } from 'react';



class AnalyticsFull extends Component {
  constructor(){
  	super();
  	this.state = {
  		x: { x: [1, 2, 3, 4],
	  		  y: [10, 15, 13, 17],
	          mode: 'markers',
	          name: 'Scatter'
			}
  	}
  	this.createPlot = this.createPlot.bind(this);
  }

  createPlot(){
  }

  render() {
    return (
      <div className ="col-12 thisDiv">
        <p> Main Analytics Page </p>
      </div> 
    );
  }
}

export default AnalyticsFull;