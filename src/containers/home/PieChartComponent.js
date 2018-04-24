import React from 'react'
import {Pie} from 'react-chartjs-2';

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

export const PieChartComponent = (props) => ({
	render() {
    return(
      <div style={{height: '500px', width: '500px', position: 'relative'}}>
        <Pie data={this.props.data} height={350} width={350} options={chartOptions}/>
      </div>
    );
	}
});

