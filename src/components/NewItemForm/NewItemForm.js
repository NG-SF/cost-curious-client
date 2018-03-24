import React from 'react';
import {reduxForm, Field} from 'redux-form';
import Input from '../Input/Input';


export class NewItemForm extends React.Component {

onSubmit(values) {
  console.log(values);
}
  render() {
    return (
      <div>
        <h3>Add new item</h3>

      <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}> 
            <Field name='description' type='text' component={Input}  />
            <Field name='amount' type='text' component={Input}  />
            <button type="submit">+ Add item</button>
      </form>

      </div>
    );
  }
}

export default reduxForm({form: 'newItem'})(NewItemForm);
