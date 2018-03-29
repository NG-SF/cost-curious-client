import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {addDashboardItem, removeDashboardItem, editDashboardItem} from '../../actions/items';
import './Dashboard.css';

export class Dashboard extends React.Component {
  state = {
    clicked: false,
    itemId: ''
  };

onSubmit(e) {
  e.preventDefault();
  const name = this.textInput.value.trim();
  console.log(name);
  this.props.addDashboardItem(name);
  this.textInput.value = '';
//console.log('state', this.props.items);
}

onClick(itemId) {
  this.setState(() => ({clicked: true, itemId}));
}

onChangeName(e) {
  e.preventDefault();
  const name = this.textInput.value.trim();
//console.log('name=========', name);
  this.props.editDashboardItem(this.state.itemId, name)
  this.textInput.value = '';
  this.setState(() => ({clicked: false}));
}

  render() {
    
    const list = this.props.items.map((item, i) => {
     
      return (<div key={i}>

              {this.state.clicked && this.state.itemId === item.id && 
              <form onSubmit={(e) => this.onChangeName(e)}>
                <label htmlFor='editItem'>Edit {item.description}</label>
                <input type='text' name='editItem' id='editItem' 
                 ref={input => this.textInput = input} />
                <button type="submit">Update</button>
                </form>}

                <Link to={`/api/${item.id}`}> <h2 className='item-descr'>{item.description}</h2> </Link>

                <button className='btn' onClick={() => this.props.removeDashboardItem({id: item.id})} >Remove</button>
                <button className='btn' onClick={() => this.onClick(item.id)}>Edit</button>   
              </div>);
    });
    return (
      <div className='add-container'>
        <div className='add-form'>
        <h3>My items</h3>  

        <form onSubmit={(e) => this.onSubmit(e)}>
          <label htmlFor='newItem'>Add new item</label>
          <input type='text' name='newItem' id='newItem' ref={input => this.textInput = input} />
          <button type="submit" className='btn plus' >+</button>
        </form>
        </div>

          {list}  
      </div>
    );
  }
}

const mapStateToProps = state => ({items: state.items});
const mapDispatchToProps = (dispatch) => ({
    addDashboardItem: (name) => dispatch(addDashboardItem(name)),
    editDashboardItem: (itemId, name) => dispatch(editDashboardItem(itemId, name)),
    removeDashboardItem: (id) => dispatch(removeDashboardItem(id))
  });
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
