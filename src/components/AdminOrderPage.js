import React, { Component } from 'react'
import { connect } from 'react-redux'
import AdminOrderView from './AdminOrderView'


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
    const { orders } = this.props;
    const { updateOrderView } = this;
    const { status } = this.state;
    return (
      <div>
        <ul>
          <li style={{fontWeight : 'bold'}}>Order Status</li>
          <li onClick={() => updateOrderView('CREATED')}>Created</li>
          <li onClick={() => updateOrderView('PROCESSING')}>Processing</li>
          <li onClick={() => updateOrderView('CANCELLED')}>Cancelled</li>
          <li onClick={() => updateOrderView('COMPLETED')}>Completed</li>
        </ul>
        <AdminOrderView orders={orders} status={status}/>
      </div>
    )
  }
}

const mapStateToProps = ({ orders }) => {
  return { orders }
}

export default connect(mapStateToProps)(AdminOrderPage)
