export default  {
        redraw: true,
        legend: { display: false },
        scales: {
            xAxes: [{
              type: 'time',
              time: {
                unit: 'week',
                stepSize: 2,
                displayFormats: { week: 'MMM D YYYY' }
                },
              scaleLabel: {
                labelString: 'Time',
                display: false,
                fontColor: 'darkblue',
                fontSize: 14
              }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero:false,
                    callback: function(label, index, labels) {
                       return `$ ${label.toFixed(2)}`;
                     },
                     suggestedMin: 3
                },
                scaleLabel: {
                labelString: 'Amount',
                display: false,
                fontColor: 'darkblue',
                fontSize: 14
              }
            }]
        },
        tooltips: {
          enabled: true,
          backgroundColor: 'cornsilk',
          titleFontColor: 'black',
          bodyFontColor: 'black',
          xPadding: 15,
          yPadding: 15,
          bodyFontSize: 16,
          titleFontSize: 16,
          titleMarginBottom: 10,
          displayColors: false
        },
        maintainAspectRatio: true    
    }; 