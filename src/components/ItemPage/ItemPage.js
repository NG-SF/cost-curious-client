import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {removeItem} from '../../actions/items';
import Chart from '../Chart/Chart';
import moment from 'moment';
import numeral from 'numeral';
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
    const itemId = this.props.match.params.id;
    const singleItem = this.props.items.filter(item => item.id === itemId);
 //console.log(itemId, singleItem);
    let total = 0;
    let chartData = [];

    const row = singleItem[0].history.sort((a,b) => {
     return a.createdAt > b.createdAt;
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
              <td><Link to={`/api/edit/${itemId}/${item.id}`}>Go</Link></td>
              <td><button className='btn' onClick={() => this.props.removeItem(itemId, id)}>Remove</button></td>
            </tr>);               
    });

    return (
      <div className='itemPage-container' >
        <h3>{singleItem[0].description}</h3> 
        <p>Total amount: <strong>{numeral(total/100).format('$0,0.00')}</strong> </p>

        <Link to={`/api/create/${itemId}`}>+ add additional expense</Link>
        <br/> <br/> <br/>

        <Chart data={chartData} />

        <button className='btn show-hide' onClick={this.toggleHidden.bind(this)}>Show / Hide details</button>
        { !this.state.isHidden && 
          <table className='table'>
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Date</th>
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
    );
  }
}

const mapStateToProps = state => ({items: state.items});
const mapDispatchToProps = (dispatch) => ({
    removeItem: (itemId, id) => dispatch(removeItem(itemId, id))
  });
export default connect(mapStateToProps, mapDispatchToProps)(ItemPage);
