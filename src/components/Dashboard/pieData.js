let pieChartData = (data) => {
  let labels, totals, totalPieAmount;
  if (data && data.length > 0) {
      labels = data.map(el => el.description);
      let amounts = data.map(el => el.history ? el.history.map(el => {
          return Math.ceil(el.amount/100);
      }) : []);
  totals = amounts.map(el => {
    return el.reduce((total,amount) => {
        return total + amount;
      },0);
  });
  totalPieAmount = totals.reduce((total,amount) =>{
    return total + amount;
    },0);
  }
  return [totals,labels, totalPieAmount];
};

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
    
export default pieChartData;
export {pieOptions};