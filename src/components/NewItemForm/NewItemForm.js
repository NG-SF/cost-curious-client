import React from 'react';
import 'react-dates/initialize';
import {SingleDatePicker} from 'react-dates';
import moment from 'moment';
import {timeConverter} from '../ItemPage/dateRange';
import './NewItemForm.css';
import 'react-dates/lib/css/_datepicker.css';
import './react_dates_overrides.css';

export default class NewItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    amount: props.item ? (props.item.amount/100).toString() : '',
    createdAt: props.item ? moment(timeConverter(props.item.createdAt), 'YYYY MM DD') : moment(),
    place: props.item ? props.item.place : '',
    calendarFocused: false,
    error: ''
  };
  }

  onAmountChange = (e) => {
    const amount = e.target.value;
    if(!amount || amount.match(/^\d{1,10}(\.\d{0,2})?$/)) {
    this.setState(() => ({amount}));
    }
  };

  onDateChange = (createdAt) => {
    if(createdAt) {
      this.setState(() => ({createdAt}));
    }
  };

   onPlaceChange = (e) => {
    const place = e.target.value ? e.target.value : '';
    this.setState(() => ({place}));
  };

  onFocusChange = ({focused}) => {
    this.setState(() => ({calendarFocused: focused}));
  };

  onSubmit = (e) => {
    e.preventDefault();
    if(!this.state.amount) {
      this.setState(() => ({error: 'Please provide amount'}));
    } else {
      this.setState(() => ({error:''}));
      this.props.onSubmit( {
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf(),
        place: this.state.place
      });
    }
  };

  render() {
    return (
      <div className='addItem-box'>
      <h1>Add / Edit transaction</h1>
        {this.state.error && <h3 className='form-error'>{this.state.error}</h3>}
        <form className='addItem-form' onSubmit={this.onSubmit}>
          <div>
            <label className='add-amount-label' htmlFor='amount'>Amount:</label>
            <input className='amount-input' type="text" id='amount'
                 value= {this.state.amount} name='amount' 
                 onChange={this.onAmountChange} required />
          </div>
          <div>
            <label className='add-place-label' htmlFor='place'>Place:</label>
            <input className='place-input' type="text" value={this.state.place} 
                  onChange={this.onPlaceChange} name='place' id='place' placeholder='optional' />
          </div>
          <div className='singleDatePicker'>
          <label htmlFor="date" className='date'>Date:</label>
            <SingleDatePicker date={this.state.createdAt} required
                              onDateChange={this.onDateChange}      
                              focused={this.state.calendarFocused} 
                              onFocusChange={this.onFocusChange} 
                              numberOfMonths={1} isOutsideRange={() => false} />
          </div>
          <button className='btn btn-addItem' type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
