import React, { Component } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class SplineChart extends Component {
	render() {
		const { data } = this.props;
		const dataPointsx = data.map(({ time, date }) => ({ x: new Date(date), y: time }))

		const options = {
			animationEnabled: true,
			title:{
				text: "Attempts"
			},
			axisX: {
				title: "Date",
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
			<h2 style={{ color: '#fff' }}>Attempts Chart</h2>
			<CanvasJSChart options = {options}
			/>
		</div>
		);
	}
}

export default SplineChart;
