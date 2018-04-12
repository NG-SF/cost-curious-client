import React from 'react';
import moment from 'moment';
import numeral from 'numeral';

const LimitContent = (props) => {
  const total = numeral(props.total/100).format('$ 0,0.00');
  const difference = numeral(props.diff).format('$ 0,0.00');
  const limit = numeral(props.limit).format('$ 0,0.00');
  const maxPlace = props.max.place ? `at ${props.max.place}` : '';
  const maxAmount = numeral(props.max.amount/100).format('$ 0,0.00');
  const maxCreatedAt = moment(props.max.createdAt).format('MMMM Do, YYYY');
  const minPlace = props.min.place ? `at ${props.min.place}` : '';
  const minAmount = numeral(props.min.amount/100).format('$ 0,0.00');
  const minCreatedAt = moment(props.min.createdAt).format('MMMM Do, YYYY');
  
  return (
    <div className='limit-box'>
      <p>Total amount: <strong>{total}</strong></p>      
      {props.limit && 
        <p><strong>{difference}</strong> untill your reach your limit of <strong>{limit}</strong></p>} 

      {props.total === props.limit && 
        <h2 className='limit-alarm'>You have reached your limit!</h2>}

      {props.max && props.min && 
        <div>
          <p>Most expensive transaction: <strong>{maxAmount}</strong> on {maxCreatedAt} {maxPlace}</p>
          <p>Least expensive transaction: <strong>{minAmount}</strong> on {minCreatedAt} {minPlace}</p>
        </div>}
    </div>
  );
};

export default LimitContent;