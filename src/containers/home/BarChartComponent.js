import React from 'react'
import {Bar} from 'react-chartjs-2';

const chartOptions = {
  maintainAspectRatio: false,
  responsive: false,
  legend: {
    position: 'left',
    labels: {
      boxWidth: 10
    }
  }
}

export const BarChartComponent = (props) => ({
	render() {
        return(
        <div style={{height: '500px', width: '500px', position: 'relative'}}>
            <Bar data={this.props.data} height={250} width={500} options={chartOptions} />
        </div>
        );
	}
});

