import React from 'react';
import {connect} from 'react-redux';
import {editItem} from '../../actions/items';
import NewItemForm from '../NewItemForm/NewItemForm';

export class EditItem extends React.Component {
constructor(props) {
  super(props);
}

  onSubmit = (item) => {
    const itemId = this.props.match.params.itemId;

console.log('Item =>', this.item);
    this.props.editItem(itemId, item);
    console.log(item);
    this.props.history.goBack();
  };

  render() {
    const item = this.props.item[0].history.filter(el => el.id === this.props.match.params.id)[0];
    return (
  <div>
    <h1>Item</h1>
    <NewItemForm onSubmit={this.onSubmit} item={item} />
  </div>
    );
  }
}
const mapStateToProps = (state, props) => {
  return {
    item: state.items.filter(item => item.id === props.match.params.itemId)
  }
};
const mapDispatchToProps = (dispatch) => ({
    editItem: (itemId, item) => dispatch(editItem(itemId, item))
  });
export default connect(mapStateToProps, mapDispatchToProps)(EditItem);