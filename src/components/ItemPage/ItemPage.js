import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {removeTransaction, fetchData} from '../../actions/items';
import {setLimitAmount, removeLimitAmount,
        updateLimitAmount, fetchFeaturesData} from '../../actions/filters';
import {Line} from 'react-chartjs-2';
import colors from '../colors';
import moment from 'moment';
import numeral from 'numeral';
import RequiresLogin from '../Auth/RequiresLogin';
import lineOptions from './chartData';
import './ItemPage.css';

export class ItemPage extends React.Component {
  constructor () {
    super()
    this.state = {
      isHidden: true,
      selected: false,
      amount: '',
      limit: '',
      dataCategory: '',
      limitId: '',
      error: ''
    }
  }
  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  changeLimit(dataCategory, limitId, limit) {
console.log('data from changeLimit == data >', dataCategory);
console.log('data from changeLimit == limitId >', limitId);
console.log('data from changeLimit == limit >', limit);
  this.setState(() => ({
    selected: true,
    dataCategory,
    limitId,
    limit
    }));
  }

  onAmountChange = (e) => {
    const amount = e.target.value;
    if(!amount || amount.match(/^\d{1,10}(\.\d{0,2})?$/)) {
    this.setState(() => ({amount}));
    }
  };

  onSubmit(e) {
    e.preventDefault();
    if(!this.state.amount) {
      this.setState(() => ({error: 'Please provide amount'}));
    } 
    if(this.state.limit && this.state.amount !== this.state.limit) {
console.log('data from submit == data >', this.state.dataCategory);
console.log('data from submit == limitId >', this.state.limitId);
console.log('data from submit == limit >', this.state.amount);
      this.props.updateLimitAmount({
        limitId: this.state.limitId, 
        limit: this.state.amount
        });
    }
    if(this.state.limitId === '') {
      this.props.setLimitAmount({
        limit: this.state.amount,
        dataCategory: this.state.dataCategory});
    }
    this.setState(() => ({
      error:'',
      selected: false,
      dataCategory: '',
      limit: '',
      limitId: '',
      amount: ''
      }));
  };

  componentDidMount() {
    this.props.fetchData(this.props.userId); 
    this.props.fetchFeaturesData();
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
  let description = singleItemObj[0] ? singleItemObj[0].description: '';
  let limitObj = this.props.limitData.filter(el => el.dataCategory === description);
  let limit = limitObj[0] ? limitObj[0].limit : '';
  let limitId = limitObj[0] ? limitObj[0]._id : '';
  let diff = Math.abs((total/100) - limit);
    return (
      <section id='item-page'> 
      <div className='itemPage-container' >
      <p>This section contains detailed information about single item. Here you can add your transactions. Selecting 'Show/Hide details' will reveal table with all the transactions, where you can edit and delete each transaction. </p>
      <p>Hovering over each data point on the chart will show the details of that transaction</p>
        <h1>{description}</h1> 
        <p>Total amount: <strong>{numeral(total/100).format('$ 0,0.00')}</strong> </p>
        
        {limit && <p>{numeral(diff).format('$ 0,0.00')} untill your reach your limit of {numeral(limit).format('$ 0,0.00')}</p>}
         
        {total === limit && 
            <p className='limit'>You have reached your limit!</p>           
          }
        <p>Most expensive transaction: {numeral(max.amount/100).format('$ 0,0.00')} on {moment(max.createdAt).format('MMMM Do, YYYY')} at {max.place}</p>
        <p>Least expensive transaction: {numeral(min.amount/100).format('$ 0,0.00')} on {moment(min.createdAt).format('MMMM Do, YYYY')} at {min.place}</p>

        <Link className='btn add-trns' to={`/api/create/${dataId}`}>+ add additional transaction</Link>
        <button className='btn btn-limit' onClick={() => this.changeLimit(description, limitId, limit)}>Add/Edit limit amount</button>
        {this.state.selected  && 
            <div className='addLimit-form'>
              <form onSubmit={(e) => this.onSubmit(e)} >
                <input type="text" placeholder="Amount" value={this.state.amount} 
                 onChange={this.onAmountChange} required />
                <button className='btn' type="submit">Add/Edit</button>
                </form> 
                <button className='btn btn-remove-limit' onClick={() => this.props.removeLimitAmount(this.state.limitId)}>Remove limit amount</button>
              </div>               
        }
        
      <br/><br/><br/>
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
  userId: state.auth.currentUser.id,
  limitData: state.filters.data
   });
const mapDispatchToProps = (dispatch) => ({
  fetchData: (userId) => dispatch(fetchData(userId)),
  fetchFeaturesData: () => dispatch(fetchFeaturesData()),
  removeTransaction: (dataId, itemId) => dispatch(removeTransaction(dataId, itemId)),
  setLimitAmount: (data) => dispatch(setLimitAmount(data)),
  updateLimitAmount: (toUpdate) => dispatch(updateLimitAmount(toUpdate)),
  removeLimitAmount: (limitId) => dispatch(removeLimitAmount(limitId))
  });
export default RequiresLogin()(connect(mapStateToProps, mapDispatchToProps)(ItemPage));
