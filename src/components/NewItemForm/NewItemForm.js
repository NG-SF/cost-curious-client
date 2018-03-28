import React from 'react';
import 'react-dates/initialize';
import {SingleDatePicker} from 'react-dates';
import moment from 'moment';
import './NewItemForm.css';


export default class NewItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    amount: props.item ? (props.item.amount/100).toString() : '',
    createdAt: props.item ? moment(props.item.createdAt) : moment(),
    calendarFocused: false,
    error: ''
  };
  }
  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({description}));
  };

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

  onFocusChange = ({focused}) => {
    this.setState(() => ({calendarFocused: focused}));
  };

  onSubmit = (e) => {
    e.preventDefault();
    if(!this.state.amount) {
      const error = 'Please provide amount';
      this.setState(() => ({error}));
    } else {
      this.setState(() => ({error:''}));
      this.props.onSubmit( {
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf()
      });
    }
  };

  render() {
    return (
      <div className='form-newItem'>
        {this.state.error && <h3>{this.state.error}</h3>}
        <form onSubmit={this.onSubmit}>

          <input type="text" placeholder="Amount" value={this.state.amount} 
                 onChange={this.onAmountChange} required />

          <SingleDatePicker date={this.state.createdAt} onDateChange={this.onDateChange}                    focused={this.state.calendarFocused} required
                            onFocusChange={this.onFocusChange}
                            numberOfMonths={1} isOutsideRange={() => false} />

          <button className='button' type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
