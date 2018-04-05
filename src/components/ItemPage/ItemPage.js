import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {removeTransaction, fetchData} from '../../actions/items';
import {Line} from 'react-chartjs-2';
import colors from '../colors';
import moment from 'moment';
import numeral from 'numeral';
import RequiresLogin from '../Auth/RequiresLogin';
import './ItemPage.css';

export class ItemPage extends React.Component {
  constructor () {
    super()
    this.state = {
      isHidden: true
    }
  }
  toggleHidden () {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  componentDidMount() {
    this.props.fetchData(this.props.userId); 
  }

  render() {
    const dataId = this.props.match.params.dataId;
    //find obj that holds transactions to display
    const singleItemObj = this.props.items.filter(item => item._id === dataId);
    let total = 0;
    let chartData = [];

    let max = singleItemObj[0] ? singleItemObj[0].history.sort((a,b) => {
     return a.amount < b.amount ? 1 : -1;
    }).filter((item, i)=> i === 0)[0] : 0;

    let min = singleItemObj[0] ? singleItemObj[0].history.sort((a,b) => {
     return a.amount > b.amount ? 1 : -1;
    }).filter((item, i)=> i === 0)[0] : 0;  

//map through transactions to display them in a table
    const row = singleItemObj[0] ? singleItemObj[0].history.sort((a,b) => {
     return a.createdAt < b.createdAt ? 1 : -1;
    }).map((item) => {
      const amount = numeral((item.amount)/100).format('$0,0.00');
      const date = moment(item.createdAt).format('MMMM Do, YYYY');
      const chartDate = moment(item.createdAt).format('D-MMM-YY');
      const chartAmount = (item.amount/100).toFixed(2);
      const itemId = item._id;
      total += item.amount;
      chartData.push({x: chartDate, y: chartAmount});     
      return (
            <tr key={itemId}>
              <td>{amount}</td>
              <td>{date}</td>
              <td>{item.place}</td>
              <td><Link to={`/api/edit/${dataId}/${itemId}`}>Edit</Link></td>
              <td><button onClick={() => this.props.removeTransaction(dataId, itemId)}>Remove</button></td>
            </tr>);               
    }) : [];

  let lineData = {
        datasets: [{
          data: chartData,
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderColor: 'ForestGreen',
          pointBackgroundColor: colors
        }]
      };
  let lineOptions = {
        redraw: true,
        legend: { display: false },
        scales: {
            xAxes: [{
              type: 'time',
              time: {
                unit: 'day',
                stepSize: 7,
                displayFormats: { week: 'MMM D YY' }
                },
              scaleLabel: {
                labelString: 'Time',
                display: true,
                fontColor: 'darkblue',
                fontSize: 14
              }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero:false,
                    callback: function(label, index, labels) {
                       return `$ ${label.toFixed(2)}`;
                     }
                },
                scaleLabel: {
                labelString: 'Amount',
                display: true,
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

    return (
      <section id='item-page'> 
      <div className='itemPage-container' >
      <p>This section contains detailed information about single item. Here you can add your transactions. Selecting 'Show/Hide details' will reveal table with all the transactions, where you can edit and delete each transaction. </p>
      <p>Hovering over each data point on the chart will show the details of that transaction</p>
        <h1>{singleItemObj[0] ? singleItemObj[0].description: ''}</h1> 
        <p>Total amount: <strong>{numeral(total/100).format('$ 0,0.00')}</strong> </p>
        <p>Most expensive: {numeral(max.amount/100).format('$ 0,0.00')} on {moment(max.createdAt).format('MMMM Do, YYYY')} at {max.place}</p>
        <p>Least expensive: {numeral(min.amount/100).format('$ 0,0.00')} on {moment(min.createdAt).format('MMMM Do, YYYY')} at {min.place}</p>

        <Link className='btn add-trns' to={`/api/create/${dataId}`}>+ add additional transaction</Link><br/><br/>

      { chartData.length > 0 && <Line data={lineData} options={lineOptions} 
                                      width={550} height={250} />}

        <button className='btn show-hide' onClick={this.toggleHidden.bind(this)}>Show all transactions</button>
        { !this.state.isHidden && 
          <table className='table'>
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Place</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {row}             
              </tbody>
              </table>               
        }
      </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({ 
  items: state.items.data,
  userId: state.auth.currentUser.id
   });
const mapDispatchToProps = (dispatch) => ({
  fetchData: (userId) => dispatch(fetchData(userId)),
  removeTransaction: (dataId, itemId) => dispatch(removeTransaction(dataId, itemId))
  });
export default RequiresLogin()(connect(mapStateToProps, mapDispatchToProps)(ItemPage));
