import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchData, removeItemData, setItemData,
        updateItemData } from '../../actions/items';
import requiresLogin from '../Auth/RequiresLogin';
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
//console.log('state', this.props.items);
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
    
    const list = this.props.items.map((item, i) => {
     
      return (<div key={i}>

              {this.state.selected && this.state.itemId === item._id && 
              <div className='editName-form'>
              <form onSubmit={(e) => this.onChangeName(e)}>
                <label htmlFor='editItem'>Edit {item.description}</label>
                <input type='text' name='editItem' id='editItem' 
                 ref={input => this.textInput = input} />
                <button type="submit">Update</button>
                </form></div>}

                <Link to={`/api/${item._id}`}> <h2 className='item-descr'>{item.description}</h2> </Link>

                <button className='btn' onClick={() => this.props.removeItemData(this.props.userId, item._id)} >Remove</button>
                <button className='btn' onClick={() => this.onClick(item._id)}>Edit</button>  
              </div>);
    });
    return (
      <div className='add-container'>
        <p>This section contains the list of item categories that you want to start collecting information about. Selecting each item will bring you to that individual item section.</p>
        <h3>My items</h3>  

        <div className='add-form'>
        <form onSubmit={(e) => this.onSubmit(e)}>
          <label htmlFor='newItem'>Add new category</label>
          <input type='text' name='newItem' id='newItem' ref={input => this.textInput = input} />
          <button type="submit" className='btn plus' >+</button>
        </form>
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
