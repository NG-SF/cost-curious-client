import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './Dashboard.css';

export class Dashboard extends React.Component {

onSubmit(values) {
  console.log(values);
}
  render() {
    const list = this.props.items.map((item) => {
      return (<p key={item.id}>
              <Link to={`/api/{item.id}`}> {item.description} </Link>
              </p>);
    });
    return (
      <div>
        <h3>Items</h3>        
          {list}       
      </div>
    );
  }
}

const mapStateToProps = state => ({items: state.items});
export default connect(mapStateToProps)(Dashboard);
