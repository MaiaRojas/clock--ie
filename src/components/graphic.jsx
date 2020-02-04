import React, { Component } from 'react';
// import moment from 'moment';
import CanvasJSReact from '../assets/canvasjs.react';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class SplineChart extends Component {
	render() {
		const { data } = this.props;
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
		<div style={{ minWidth: 400 }}>
			<h2 style={{ color: '#fff' }}>Attempts Chart</h2>
			<CanvasJSChart options = {options}
			/>
		</div>
		);
	}
}

export default SplineChart;
