import React, { Component } from 'react';
import moment from 'moment';
import CanvasJSReact from '../assets/canvasjs.react';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class SplineChart extends Component {
	render() {
		const { data } = this.props;
		// console.log('data', moment(this.props.data[0].date).format('MMMM Do YYYY, h:mm:ss a'))
		const dataPointsx = data.map(({ time, date }) => ({ x: new Date(date), y: time }))
		console.log(dataPointsx)

		const options = {
			animationEnabled: true,
			title:{
				text: "Attempts"
			},
			axisX: {
				title: "Date",
				// valueFormatString: "MMM"
			},
			axisY: {
				title: "Time",
				suffix: "ms",
			},
			data: [{
				yValueFormatString: "#,###ms",
				xValueFormatString: "h:m:s:tt",
				type: "spline",
				dataPoints: dataPointsx,
			}]
		}

		return (
		<div>
			<h1>React Spline Chart</h1>
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default SplineChart;
