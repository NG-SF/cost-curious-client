import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import {timeConverter} from './dateRange';

const LimitContent = (props) => {
  const total = numeral(props.total/100).format('$ 0,0.00');
  const difference = numeral(props.diff).format('$ 0,0.00');
  const limit = numeral(props.limit).format('$ 0,0.00');
  const maxAmount = props.max ? numeral(props.max.amount/100).format('$ 0,0.00') : '';
  const maxCreatedAt = props.max ? moment(timeConverter(props.max.createdAt), 'YYYY MM DD').format('MMMM Do, YYYY') : '';
  const minAmount = props.max ? numeral(props.min.amount/100).format('$ 0,0.00') : '';
  const minCreatedAt = props.max ? moment(timeConverter(props.min.createdAt), 'YYYY MM DD').format('MMMM Do, YYYY') : '';

  return (
    <div className='limit-box'>
      {props.total > 0 && <p>Total amount: <strong>{total}</strong></p>}
         
      {parseFloat(props.limit, 10) > props.total/100 &&
        <p><strong>{difference}</strong> untill your reach your limit of <strong>{limit}</strong></p>} 

      {parseFloat(props.limit, 10) <= props.total/100 && 
        <h2 className='limit-alarm'>You have reached your limit!</h2>}

      {props.max && props.min && 
        <div>
          <p>Most expensive transaction: <strong>{maxAmount}</strong> on {maxCreatedAt}</p>
          <p>Least expensive transaction: <strong>{minAmount}</strong> on {minCreatedAt}</p>
        </div>}
    </div>
  );
};

export default LimitContent;