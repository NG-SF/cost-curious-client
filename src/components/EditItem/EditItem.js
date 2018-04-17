import React from 'react';
import {connect} from 'react-redux';
import {updateTransaction} from '../../actions/items';
import NewItemForm from '../NewItemForm/NewItemForm';
import RequiresLogin from '../Auth/RequiresLogin';

export class EditItem extends React.Component {

  onSubmit = (updates) => {
    const dataId = this.props.match.params.dataId;
    const itemId = this.props.match.params.itemId;
    this.props.updateTransaction(dataId, itemId, updates);
    this.props.history.push(`/api/${dataId}`);
  };

  render() {
    // find single transaction that needs to be updated 
    // pass it to the form
    const item = this.props.parentItem[0] ? this.props.parentItem[0].history.filter(el => el._id === this.props.match.params.itemId)[0] : [];

    return (
            <div>
              <h1>Edit transaction</h1>
              <NewItemForm onSubmit={this.onSubmit} item={item} />
            </div>
              );
  }
}

const mapStateToProps = (state, props) => {
  return {
    parentItem: state.items.data.filter(item => item._id === props.match.params.dataId)
  }
};
const mapDispatchToProps = (dispatch) => ({
    updateTransaction: (dataId, itemId, updates) => dispatch(updateTransaction(dataId, itemId, updates))
  });
export default RequiresLogin()(connect(mapStateToProps, mapDispatchToProps)(EditItem));