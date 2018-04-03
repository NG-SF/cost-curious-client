import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {removeItem} from '../../actions/items';
import Chart from '../Chart/Chart';
import moment from 'moment';
import numeral from 'numeral';
import RequiresLogin from '../Auth/RequiresLogin';
import './ItemPage.css';

export class ItemPage extends React.Component {
  constructor () {
    super()
    this.state = {
      isHidden: true
    }
  }
  toggleHidden () {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  render() {
    const dataId = this.props.match.params.dataId;
    const singleItemObj = this.props.items.filter(item => item._id === dataId);
    let total = 0;
    let chartData = [];
console.log('singleItemObj=====', singleItemObj);  
    // let max = singleItem[0].history.sort((a,b) => {
    //  return a.amount - b.amount;
    // });
    
    // let data = singleItem[0].history;

// console.log('Max=====', max);
// console.log('Data=====', data);

    const row = singleItemObj[0].history.sort((a,b) => {
     return a.createdAt < b.createdAt ? 1 : -1;
    }).map((item, i) => {
      const amount = numeral((item.amount)/100).format('$0,0.00');
      const date = moment(item.createdAt).format('MMMM Do, YYYY');
      const lineDate = moment(item.createdAt).format('D-MMM-YY');
      const lineAmount = (item.amount/100).toFixed(2);
      const id = item.id;
      total += item.amount;
      chartData.push({x: lineDate, y: lineAmount});
 //  console.log(item.id);      
      return (
            <tr key={i}>
              <td>{amount}</td>
              <td>{date}</td>
              <td>{item.place}</td>
              <td><Link to={`/api/edit/${dataId}/${item.id}`}>Edit</Link></td>
              <td><button className='btn' onClick={() => this.props.removeItem(dataId, id)}>Remove</button></td>
            </tr>);               
    });

    return (
      <section id='item-page'> 
      <div className='itemPage-container' >
      <p>This section contains detailed information about single item. Here you can add your transactions. Selecting 'Show/Hide details' will reveal table with all the transactions, where you can edit and delete each transaction. </p>
      <p>Hovering over each data point on the chart will show the details of that transaction</p>
        <h3>{singleItemObj[0].description}</h3> 
        <p>Total amount: <strong>{numeral(total/100).format('$0,0.00')}</strong> </p>

        <Link to={`/api/${dataId}`}>+ add additional item</Link>
        <br/> <br/> <br/>

        <Chart data={chartData} />

        <button className='btn show-hide' onClick={this.toggleHidden.bind(this)}>Show / Hide details</button>
        { !this.state.isHidden && 
          <table className='table'>
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Place</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {row}             
              </tbody>
              </table>               
        }
      </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({items: state.items.data});
const mapDispatchToProps = (dispatch) => ({
    removeItem: (itemId, id) => dispatch(removeItem(itemId, id))
  });
export default RequiresLogin()(connect(mapStateToProps, mapDispatchToProps)(ItemPage));
