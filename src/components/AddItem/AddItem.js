import React from 'react';
import {connect} from 'react-redux';
import { setTransaction } from '../../actions/items';
import NewItemForm from '../NewItemForm/NewItemForm';
import RequiresLogin from '../Auth/RequiresLogin';

export class AddItem extends React.Component {
  onSubmit = (transaction) => {
    let dataId = this.props.match.params.dataId;
    this.props.setTransaction(dataId, transaction);
    this.props.history.push(`/api/${dataId}`);
  };

  render() {
    return (
            <div>
              <h1>Add new transaction</h1>
              <NewItemForm onSubmit={this.onSubmit} />
            </div>
              );
  }
}

const mapDispatchToProps = (dispatch) => ({
    setTransaction: (dataId, transaction) => dispatch(setTransaction(dataId, transaction))
  });
export default RequiresLogin()(connect(undefined, mapDispatchToProps)(AddItem));