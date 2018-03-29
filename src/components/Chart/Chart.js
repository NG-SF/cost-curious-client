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
        legend: {
            display: false
          },
        scales: {
            xAxes: [{
              type: 'time',
              time: {
                unit: 'week',
                displayFormats: {
                  week: 'MMM D YY'
                }
                },
              scaleLabel: {
                labelString: 'Date',
                display: true,
                fontColor: 'darkblue',
                fontSize: 14
              }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero:true,
                    stepSize: 1.0
                },
                scaleLabel: {
                labelString: 'Amount, $',
                display: true,
                fontColor: 'darkblue',
                fontSize: 14
              }
            }]
        },
        tooltips: {
          enabled: true,
          backgroundColor: 'azure',
          titleFontColor: 'black',
          bodyFontColor: 'black',
          xPadding: 15,
          yPadding: 15,
          bodyFontSize: 15,
          titleFontSize: 15,
          titleMarginBottom: 10,
          displayColors: false
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