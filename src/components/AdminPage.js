import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'


class AdminPage extends Component {
  render () {
    if(this.props.auth.isAdmin) {
      return (
        <div>
          <div>
            <h3>Products</h3>
            <Link to={'/admin/products/create'}><button className='btn btn-outline-secondary' style={{margin: '10px',padding: '10px'}}>+ Add New Products</button></Link>
            <Link to={'/admin/products'}><button className='btn btn-outline-secondary' style={{margin: '10px',padding: '10px'}}>Manage Current Products</button></Link>
          </div>
          <div>
            <h3>Categories</h3>
            <Link to={'/admin/categories/create'}><button className='btn btn-outline-secondary' style={{margin: '10px',padding: '10px'}}>+ Add New Categories</button></Link>
            <Link to={'/admin/categories'}><button className='btn btn-outline-secondary' style={{margin: '10px',padding: '10px'}}>Manage Current Categories</button></Link>
          </div>
          <div>
            <h3>Orders</h3>
            <Link to={'/admin/orders'}><button className='btn btn-outline-secondary' style={{margin: '10px',padding: '10px'}}>Manage Orders</button></Link>
          </div>
          <div>
            <h3>Users</h3>
          </div>
        </div>
      )
    }  else {
      return <h2>You are not authorized to view this page</h2>
    }
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth }
};

export default connect(mapStateToProps)(AdminPage);
