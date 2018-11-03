import React, { Component } from 'react'
import { connect } from 'react-redux'
import AdminOrdersView from './AdminOrdersView'


class AdminOrderPage extends Component {
  constructor () {
    super()
    this.state = {
      status : ''
    }
    this.updateOrderView = this.updateOrderView.bind(this)
  }

  updateOrderView(newStatus) {
    this.setState({ status : newStatus })
  }

  render () {
    const { orders, auth } = this.props;
    const { updateOrderView } = this;
    const { status } = this.state;
    console.log(orders)
    if(auth.isAdmin) {
      return (
        <div>
          <ul>
            <li style={{fontWeight : 'bold'}}>Order Status</li>
            <li onClick={() => updateOrderView('CREATED')}>Created</li>
            <li onClick={() => updateOrderView('PROCESSING')}>Processing</li>
            <li onClick={() => updateOrderView('CANCELLED')}>Cancelled</li>
            <li onClick={() => updateOrderView('COMPLETED')}>Completed</li>
          </ul>
          <AdminOrdersView orders={orders} status={status}/>
        </div>
      )
    } else {
      return <h3>You are not authoritized to  view this page</h3>
    }

  }
}

const mapStateToProps = ({ orders, auth }) => {
  return { orders, auth }
}

export default connect(mapStateToProps)(AdminOrderPage)
