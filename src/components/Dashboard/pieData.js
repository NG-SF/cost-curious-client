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
  return [totals,labels];
};
export default pieChartData;