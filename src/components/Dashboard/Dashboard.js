import React from 'react';
import './Dashboard.css';
import {reduxForm, Field} from 'redux-form';
import Input from '../Input/Input';

export class Dashboard extends React.Component {

onSubmit(values) {
  console.log(values);
}
  render() {
    return (
      <div>
        <h3>Items</h3>
        <div>Input to filter items by keywords</div>

      <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}> 
            <Field name='searchText' type='text' component={Input}  />
            <button type="submit">Filter items</button>
      </form>

      <div>Totals for filtered/all items</div>
      <div>List of items</div>
      </div>
    );
  }
}

export default reduxForm({form: 'filteredItems'})(Dashboard);
