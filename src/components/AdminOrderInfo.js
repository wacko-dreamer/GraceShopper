import React, { Component } from 'react'
import { connect } from 'react-redux'

class AdminOrderInfo extends Component {
  render () {
    const { orderId, orders } = this.props;
    const orderArray = orders.filter(order => order.id === orderId);
    const order = orderArray[0] || { customer : '', lineItems : [], product : {} };


    return (
      <div>
        <h4>Order information for - {order.id}</h4>
        <p>Created: {order.createdAt}</p>
        <p>Customer: {order.customer.name}</p>
        <p>Shipping Address: {order.shippingAddress}</p>
        <p>Line Items:</p>
        {
          order.lineItems.map((lineItem, idx) => {
            return (
              <div key={lineItem.id}>
                <p >{idx + 1} - {lineItem.product.name}</p>
                <p>Product quantity: {lineItem.quantity}</p>
                <p>Product price: {lineItem.price}</p>
                <br />
              </div>
            )
          })
        }
        <p>Order status: {order.status}</p>
        <p>Order total: {order.total}</p>
      </div>
    )
  }
}

const mapStateToProps = ({ orders }) => {
  return { orders }
};

export default connect(mapStateToProps)(AdminOrderInfo);
