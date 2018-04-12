let totalPieAmount = 0;
let pieChartData = (data) => {
let labels = data.map(el => el.description);
let amounts = data.map(el => el.history.map(el => {
  return Math.ceil(el.amount/100);
  }));
let totals = amounts.map(el => {
  return el.reduce((total,amount) => {
    return total + amount;
    },0);
});
totalPieAmount = totals.reduce((total,amount) =>{
  return total + amount;
},0);

  return [totals,labels];
};
export default pieChartData;

const pieOptions = {
        redraw: true,
        tooltips: {
          enabled: true,
          backgroundColor: 'cornsilk',
          titleFontColor: 'black',
          bodyFontColor: 'black',
          bodyFontSize: 18,
          bodySpacing: 55,
          displayColors: false
        },
      legend: {
        position: 'bottom',
        labels: {
          fontSize: 16,
          fontColor: 'black'
        }
      },
      responsive: true
    };
export {pieOptions, totalPieAmount};