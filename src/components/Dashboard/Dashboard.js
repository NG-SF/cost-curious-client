import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchData, removeItemData, setItemData,
        updateItemData} from '../../actions/items';
import requiresLogin from '../Auth/RequiresLogin';
import pieChartData, {pieOptions} from './pieData';
import numeral from 'numeral';
import {Pie} from 'react-chartjs-2';
import colors from '../colors';
import './Dashboard.css';

export class Dashboard extends React.Component {
  constructor () {
    super()
    this.state = {
      selected: false,
      itemId: '',
      description: ''
    }
  }

onSubmit(e) {
  e.preventDefault();
  const name = this.textInput.value.trim();
  this.props.setItemData(this.props.userId, name);
  this.textInput.value = '';
  }

onClick(itemId, description) {
  this.setState(() => ({
    itemId, 
    description,
    selected: true}));
  }

onChangeName(e) {
  e.preventDefault();
  const name = this.textInput.value.trim();
  this.props.updateItemData(this.props.userId, this.state.itemId, name)
  this.textInput.value = '';
  this.setState(() => ({selected: false}));
  }

onNameCancel() {
  this.setState(() => ({
    selected: false,
    itemId: '', 
    description: '',
    }));
}

componentDidMount() {
    this.props.fetchData(this.props.userId);
  }

  render() {
    const list = this.props.items ? this.props.items.sort().map(item => {    
      return (<div key={item._id} className='category'>
                <div className='category-name-box'>
                  <h2 className='category-name' title='go to summary page'><Link to={`/api/${item._id}`}>{item.description}</Link></h2>
                </div>
                <div className='btn-group'>
                  <button className='btn btn-category btn-edit' onClick={() => this.onClick(item._id, item.description)}>Edit</button>  
                  <button className='btn btn-category test-remove-btn' onClick={() => this.props.removeItemData(this.props.userId, item._id)} >Remove</button>
                </div>
              </div>);
      }) : []; 
  let chartData = this.props.items ? this.props.items : [];
  let total = pieChartData(chartData)[2];
  let pieData = {
        datasets: [{
        data: pieChartData(chartData)[0],
        backgroundColor: colors,
        hoverBackgroundColor: 'snow',
        hoverBorderColor: '#71BA88'
        }],
        labels: pieChartData(chartData)[1]
      };

    return (
      <div className='add-container dashbrd'>
      <div className='intro'>
        {this.props.error && <h2 className='dataError'>{this.props.error.message}</h2>}
        <h1>{`${this.props.username}'s data:`}</h1>
        <p>1. Start by creating a category that will hold all the information/transactions about that item. For example, since we talked a lot about coffee, you can create category named "Coffee".</p>
        <p>2. In the created box click on the name of category you just created and you will be redirected to that individual item section, where you can start gathering your data.</p> 
        <p>3. Clicking on Remove button will <strong>delete</strong> that category with <strong>all the data</strong>. <em>This action cannot be undone</em>.</p>
      </div>
      {/* show total and pie chart only when there is data */}
      {total > 0 && this.props.items.length > 0 && 
      <div>
        <p className='total'>Total: <strong>{numeral((total)).format('$ 0,0')}</strong></p>
        <Pie data={pieData} options={pieOptions} />
      </div>
      }
       <div id='addCategory-box'>
        <div className='addCategory-form'>
        <form className='test-AddCategory' onSubmit={(e) => this.onSubmit(e)}>
          <label className='add-category-label' htmlFor='newItem'>Add new category:</label>
          <input className='add-category-input' type='text' name='newItem' id='newItem' ref={input => this.textInput = input} required />
          <button type="submit" className='btn btn-add-category'>+ Add</button>
        </form>
        </div> 
       </div>
       <div>
         {/* show when edit bnt is clicked */}
          {this.state.selected && this.state.itemId && 
          <div id='editCategory-box'>
            <div className='editCategory-form'>
              <form className='test-EditCategory' onSubmit={(e) => this.onChangeName(e)}>
                <label className='edit-category-label' htmlFor='editItem'>Edit <strong>{this.state.description}</strong> category (update or change name):</label>
                <input className='edit-category-input' type='text' name='editItem' id='editItem' 
                 ref={input => this.textInput = input} />
                 <div className='btn-group-edit-category'>
                  <button className='btn btn-edit-category btn-edit-update' type="submit">Update</button>
                  <button className='btn btn-edit-category test-cancel' onClick={() => this.onNameCancel()} >Cancel</button>
                 </div>
              </form>
            </div>
          </div>
            }
       </div>
       <div className='category-box'>
          {list}  
       </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  items: state.items.data,
  error: state.items.error,
  userId: state.auth.currentUser.id,
  username: state.auth.currentUser.username
  });
const mapDispatchToProps = (dispatch) => ({
    fetchData: (userId) => dispatch(fetchData(userId)),
    setItemData: (userId, name) => dispatch(setItemData(userId, name)),
    updateItemData: (userId, itemId, name) => dispatch(updateItemData(userId, itemId, name)),
    removeItemData: (userId, itemId) => dispatch(removeItemData(userId, itemId))
  });
export default requiresLogin()(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
