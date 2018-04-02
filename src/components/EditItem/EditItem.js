import React from 'react';
import {connect} from 'react-redux';
import {editItem} from '../../actions/items';
import NewItemForm from '../NewItemForm/NewItemForm';
import RequiresLogin from '../Auth/RequiresLogin';

export class EditItem extends React.Component {

  onSubmit = (updates) => {
    const itemId = this.props.match.params.itemId;
    const id = this.props.match.params.id;
// console.log('Item =>', this.item);
    this.props.editItem(itemId, id, updates);
    console.log(updates);
    this.props.history.goBack();
  };

  render() {
    const item = this.props.parentItem[0].history.filter(el => el.id === this.props.match.params.id)[0];
    return (
  <div>
    <h1>Edit Item</h1>
    <NewItemForm onSubmit={this.onSubmit} item={item} />
  </div>
    );
  }
}
const mapStateToProps = (state, props) => {
  return {
    parentItem: state.items.filter(item => item.id === props.match.params.itemId)
  }
};
const mapDispatchToProps = (dispatch) => ({
    editItem: (itemId, id, updates) => dispatch(editItem(itemId, id, updates))
  });
export default RequiresLogin()(connect(mapStateToProps, mapDispatchToProps)(EditItem));