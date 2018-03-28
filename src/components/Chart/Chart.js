import React from 'react';
import {Line} from 'react-chartjs-2';
import colors from '../colors';
export default class JsChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        datasets: [{
          data: this.props.data,
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderColor: 'Aquamarine',
          pointBackgroundColor: colors
        }]
      },
      chartOptions: {
        scales: {
            xAxes: [{
              type: 'time',
              time: {
                unit: 'week',
                displayFormats: {
                  week: 'MMM D YY'
                }
                }
            }]
        },
        tooltips: {
          enabled: true
        },
        maintainAspectRatio: false
    }
    };
  }

  render() {
    return (
      <div>
        <Line data={this.state.chartData} options={this.state.chartOptions}
              width={550} height={250} />
      </div>
    );
  }
}