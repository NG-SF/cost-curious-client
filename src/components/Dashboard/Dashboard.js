import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchData, removeItemData, setItemData,
        updateItemData } from '../../actions/items';
import requiresLogin from '../Auth/RequiresLogin';
import pieChartData, {pieOptions} from './pieData';
import {Pie} from 'react-chartjs-2';
import colors from '../colors';
import './Dashboard.css';

export class Dashboard extends React.Component {
  constructor () {
    super()
    this.state = {
      selected: false,
      itemId: ''
    }
  }

onSubmit(e) {
  e.preventDefault();
  const name = this.textInput.value.trim();
  this.props.setItemData(this.props.userId, name);
  this.textInput.value = '';
  }

onClick(itemId) {
  this.setState(() => ({itemId, selected: true}));
  }

onChangeName(e) {
  e.preventDefault();
  const name = this.textInput.value.trim();
  this.props.updateItemData(this.props.userId, this.state.itemId, name)
  this.textInput.value = '';
  this.setState(() => ({selected: false}));
  }

componentDidMount() {
    this.props.fetchData(this.props.userId);
  }

  render() {
    const list = this.props.items.map(item => {    
      return (<div key={item._id} className='category'>
              {this.state.selected && this.state.itemId === item._id && 
              <div className='editName-form'>
              <form onSubmit={(e) => this.onChangeName(e)}>
                <label htmlFor='editItem'>Edit {item.description}</label>
                <input type='text' name='editItem' id='editItem' 
                 ref={input => this.textInput = input} />
                <button className='btn' type="submit">Update</button>
                </form></div>}

                <Link to={`/api/${item._id}`}> <h2 className='category-name'>{item.description}</h2></Link>
                <div className='btn-group'>
                  <button className='btn' onClick={() => this.props.removeItemData(this.props.userId, item._id)} >Remove</button>
                  <button className='btn' onClick={() => this.onClick(item._id)}>Edit</button>  
                </div>
              </div>);
      }); 
  let pieData = {
        datasets: [{
        data: pieChartData(this.props.items)[0],
        backgroundColor: colors,
        hoverBackgroundColor: 'Lavender',
        hoverBorderColor: 'ForestGreen'
        }],
        labels: pieChartData(this.props.items)[1]
      };
  
    return (
      <div className='add-container dashbrd'>
       <Pie data={pieData} options={pieOptions} />
       <div className='dashbrd-p'>
          <p>Add items that you want to start collecting information about.</p> 
          <p>Selecting each item will redirect you to that individual item section.</p> 
        <div className='addCategory-form'>
        <form onSubmit={(e) => this.onSubmit(e)}>
          <label className='add-category-label' htmlFor='newItem'>Add new category:</label>
          <input className='add-category' type='text' name='newItem' id='newItem' ref={input => this.textInput = input} required />
          <button type="submit" className='btn-add-category' >Submit</button>
        </form>
        </div> 
       </div>
          {list}  
      </div>
    );
  }
}

const mapStateToProps = state => ({
  items: state.items.data,
  userId: state.auth.currentUser.id
  });
const mapDispatchToProps = (dispatch) => ({
    fetchData: (userId) => dispatch(fetchData(userId)),
    setItemData: (userId, name) => dispatch(setItemData(userId, name)),
    updateItemData: (userId, itemId, name) => dispatch(updateItemData(userId, itemId, name)),
    removeItemData: (userId, itemId) => dispatch(removeItemData(userId, itemId))
  });
export default requiresLogin()(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
