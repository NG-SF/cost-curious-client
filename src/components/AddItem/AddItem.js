import React from 'react';
import {connect} from 'react-redux';
import {addItem} from '../../actions/items';
import NewItemForm from '../NewItemForm/NewItemForm';

export class AddItem extends React.Component {
  onSubmit = (item) => {
    this.props.addItem(item);
    console.log(item);
    this.props.history.push('/api/dashboard')
  };

  render() {
    return (
  <div>
    <h1>Add Item</h1>
    <NewItemForm onSubmit={this.onSubmit} />
  </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
    addItem: (item) => dispatch(addItem(item))
  });
export default connect(undefined, mapDispatchToProps)(AddItem);