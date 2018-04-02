import React from 'react';
import {connect} from 'react-redux';
import {addItem} from '../../actions/items';
import NewItemForm from '../NewItemForm/NewItemForm';
import RequiresLogin from '../Auth/RequiresLogin';

export class AddItem extends React.Component {
  onSubmit = (item) => {
    let itemId = this.props.match.params.id;
//    console.log(name, item);
    this.props.addItem(itemId, item);
//    console.log(item);
    this.props.history.goBack();
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
    addItem: (itemId, item) => dispatch(addItem(itemId, item))
  });
export default RequiresLogin()(connect(undefined, mapDispatchToProps)(AddItem));