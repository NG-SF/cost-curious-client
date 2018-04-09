import React from 'react';
import moment from 'moment';
import numeral from 'numeral';

const LimitContent = (props) => {
  return (
    <div>
      <p>Total amount: <strong>{numeral(props.total/100).format('$ 0,0.00')}</strong> </p>      
      {props.limit && <p>{numeral(props.diff).format('$ 0,0.00')} untill your reach your limit of {numeral(props.limit).format('$ 0,0.00')}</p>}         
      {props.total === props.limit && <p className='limit'>You have reached your limit!</p>}
      {props.max && props.min && <div>
        <p>Most expensive transaction: {numeral(props.max.amount/100).format('$ 0,0.00')} on {moment(props.max.createdAt).format('MMMM Do, YYYY')} at { props.max.place}</p>
        <p>Least expensive transaction: {numeral(props.min.amount/100).format('$ 0,0.00')} on {moment(props.min.createdAt).format('MMMM Do, YYYY')} at {props.min.place}</p>
      </div>}
    </div>
  );
};

export default LimitContent;