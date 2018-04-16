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
import LimitContent from './LimitContent';
import {DateRangePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import dateRange from './dateRange';
import Footer from '../Footer/Footer';
import './ItemPage.css';

export class ItemPage extends React.Component {
  constructor () {
    super()
    this.state = {
      isHidden: true,
      showFilter: false,
      selected: false,
      amount: '',
      limit: '',
      dataCategory: '',
      limitId: '',
      error: '',
      calendarFocused: null,
      startDate: moment().startOf('month'),
      endDate: moment().endOf('month')
    }
  }
  onDatesChange = ({startDate, endDate}) => {
    this.setState(() => ({
      startDate,
      endDate 
      }));
  };
  onFocusChange = (calendarFocused) => {
    this.setState(() => ({calendarFocused}));
  };
  toggleHidden() {
    this.setState(() => ({isHidden: !this.state.isHidden}));
  }
  showFilter() {
    this.setState(() => ({showFilter: true}));
  }

   hideFilter() {
     this.setState(() => ({showFilter: false}));
    // this.setState(() => ({showFilter: !this.state.showFilter}));
  }

  changeLimit(dataCategory, limitId, limit) {
  this.setState(() => ({
    selected: true,
    dataCategory,
    limitId,
    limit
    }));
  };
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
      this.props.updateLimitAmount({
        limitId: this.state.limitId, 
        limit: this.state.amount
        }, this.props.match.params.dataId);
    }
    if(this.state.limitId === '') {
      this.props.setLimitAmount({
        limit: this.state.amount,
        dataCategory: this.state.dataCategory},
        this.props.match.params.dataId);
    }
    this.resetState();
  };
  resetState() {
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
    this.props.fetchFeaturesData(this.props.match.params.dataId);
  }
  render() {
    const dataId = this.props.match.params.dataId;
    //find obj that holds transactions to display
    const singleItemObj = this.props.items ? this.props.items.filter(item => item._id === dataId) : [];
    let total = 0;
    let chartData = [];

    let max = singleItemObj[0] ? singleItemObj[0].history.sort((a,b) => {
        return a.amount < b.amount ? 1 : -1;
        }).filter((item, i)=> i === 0)[0] : 0;
    let min = singleItemObj[0] ? singleItemObj[0].history.sort((a,b) => {
        return a.amount > b.amount ? 1 : -1;
        }).filter((item, i)=> i === 0)[0] : 0;  

    const rowData = (data) => {
      return data.sort((a,b) => {
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
              <td><button className='btn-remove-transaction' onClick={() => this.props.removeTransaction(dataId, itemId)}>Remove</button></td>
            </tr>);               
        }); 
    };
        
  let filteredData = singleItemObj[0] ? dateRange(singleItemObj[0].history, this.state.startDate, this.state.endDate) : [];
  const row = singleItemObj[0] ? rowData(singleItemObj[0].history) : [];
  let filteredRow;
  if(this.state.showFilter) {
    chartData = [];
    total = 0;
   filteredRow = filteredData ? rowData(filteredData) : [];
  }

  let lineData = {
        datasets: [{
          data: chartData,
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderColor: 'purple',
          pointBackgroundColor: colors
        }]
      };

  let description = singleItemObj[0] ? singleItemObj[0].description: '';
  let limitObj = this.props.limitData.filter(el => el.dataId === dataId);
  let limit = limitObj[0] ? limitObj[0].limit : '';
  let limitId = limitObj[0] ? limitObj[0]._id : '';
  let diff = Math.abs((total/100) - limit);

  return (
  <div>
  <section id='item-page'> 
    <div className='itemPage-container' >
    <div className='item-intro'>
      <p>This section contains summary information about a single category item.</p>
      <p>Selecting Show/Hide transactions button under the chart will reveal table with all the transactions, where you can edit and delete each transaction. </p>
      <p>Hovering over each data point on the chart will show the details of that transaction</p>
    </div>
    {this.props.error && <h2 className='dataError'>{this.props.error.message}</h2>}
    <h1 className='item-title'>Category: <strong>{description}</strong></h1> 
    
    <LimitContent total={total} limit={limit} diff={diff} max={max} min={min} />
    
    <div className='add-edit-group'>
    <div className='btn btn-add-trns'>
      <Link to={`/api/create/${dataId}`}>Add new transaction</Link>
    </div>

      <button className='btn btn-limit' onClick={() => this.changeLimit(description, limitId, limit)}>Add/Edit limit amount</button>
    </div>
    
    {this.state.selected  && <div className='add-limit-box'>
      <form onSubmit={(e) => this.onSubmit(e)} >
        <label className='add-limit-label' htmlFor='limit'>Add/Edit limit amount:</label>
        <input className='add-limit-input' type='text' placeholder='Enter limit amount'            id='limit' name='limit' value={this.state.amount} 
               onChange={this.onAmountChange} required />
        <button className='btn btn-add-limit' type="submit">Add/Edit limit</button>
      </form> 
      <div className='btn-group-limit'>
        <button className='btn btn-remove-limit' 
                onClick={() => { 
                  this.props.removeLimitAmount(this.state.limitId, dataId);
                  this.resetState()}}>Remove limit</button>
        <button className='btn btn-cancel-limit' 
                onClick={() => {this.resetState()}}>Cancel</button>
      </div>
      </div>
      } 
      
      <div className='dateRange'>
      <p>To see transactions for specific dates in the chart: select date range and click "Filter by date" button. This will change the chart and the table of transactions to reflect the data for the selected date range.</p>
      <p>To remove filters and view full data press "Reset" button.</p>
        <DateRangePicker 
                startDate={this.state.startDate} 
                startDateId={"start"}
                endDate={this.state.endDate}
                endDateId={"end"}
                onDatesChange={this.onDatesChange}
                focusedInput={this.state.calendarFocused}
                onFocusChange={this.onFocusChange}
                numberOfMonths={1}
                showClearDates={true}
                isOutsideRange={() => false} />  
        
          <button className='btn btn-dateRange' onClick={this.showFilter.bind(this)}>Filter by date</button>  
          <button className='btn btn-dateRange' onClick={this.hideFilter.bind(this)}>Reset</button> 
 
      </div> 
      <div className='chart-box'>
        {chartData.length > 0 && <Line data={lineData} options={lineOptions} />}
      </div>

      <button className='btn btn-show-hide' onClick={this.toggleHidden.bind(this)}>Show/Hide all transactions</button>
      <div className='table-box'>
      { !this.state.isHidden && <table className='table'>
        <thead>
          <tr>
            <th>Amount</th><th>Date</th><th>Place</th><th>Edit</th><th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {this.state.showFilter ? filteredRow : row}           
        </tbody>
        <tfoot>
          <tr>
            <td><strong>{numeral((total)/100).format('$0,0.00')}</strong></td><td>  <strong>Total</strong></td><td></td><td></td><td></td>
          </tr> 
        </tfoot>
        </table> 
        }
        </div>
  </div>
</section>
<Footer />
</div>
    );
  }
}
const mapStateToProps = state => ({ 
  items: state.items.data,
  error: state.items.error,
  userId: state.auth.currentUser.id,
  limitData: state.filters.data
   });
const mapDispatchToProps = (dispatch) => ({
  fetchData: (userId) => dispatch(fetchData(userId)),
  fetchFeaturesData: (dataId) => dispatch(fetchFeaturesData(dataId)),
  removeTransaction: (dataId, itemId) => dispatch(removeTransaction(dataId, itemId)),
  setLimitAmount: (data, dataId) => dispatch(setLimitAmount(data, dataId)),
  updateLimitAmount: (toUpdate, dataId) => dispatch(updateLimitAmount(toUpdate, dataId)),
  removeLimitAmount: (limitId, dataId) => dispatch(removeLimitAmount(limitId, dataId))
  });
export default RequiresLogin()(connect(mapStateToProps, mapDispatchToProps)(ItemPage));
