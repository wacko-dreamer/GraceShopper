import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { updateOrder } from '../store/ordersReducer';

class AdminOrderInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dropDownOpen : false,
      status : ''
    }
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [ evt.target.name ] : evt.target.value
    })
  }

  handleSubmit(evt, newStatus, order) {
    evt.preventDefault();
    console.log('order: ', order);
    console.log('newStatus:'. newStatus);
    const newOrder = {...order, status : newStatus};
    this.props.updateOrder(newOrder);
  }

  toggle() {
    this.setState({
      dropDownOpen: !this.state.dropDownOpen
    });
  }

  render () {
    const { dropDownOpen, status } = this.state;
    const { orderId, orders } = this.props;
    const { handleChange, toggle, handleSubmit } = this;
    const orderArray = orders.filter(order => order.id === orderId);
    const order = orderArray[0] || { customer : '', lineItems : [], product : {} };


    return (
      <div>
        <h4>Order information for {order.id}</h4>
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
        <ButtonDropdown isOpen={dropDownOpen} toggle={toggle}>
        Order status:
        <DropdownToggle caret>
          { status ? status : order.status }
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={ (e) => handleChange(e) } name="status" value={order.status} >{order.status}</DropdownItem>
          {
            ['CREATED', 'PROCESSING', 'COMPLETED', 'CANCELLED'].filter(status => status !== order.status).map((statusUpdate, idx) => {
              return (
                <DropdownItem key={idx} onClick={ (e, statusUpdate, order) => handleSubmit(e, statusUpdate, order) } name="status" value={statusUpdate} >{statusUpdate}</DropdownItem>
              )
            })
          }
        </DropdownMenu>
      </ButtonDropdown>
        <p>Order total: {order.total}</p>
      </div>
    )
  }
}

const mapStateToProps = ({ orders }) => {
  return { orders }
};

const mapDispatchToProps = dispatch => {
  return {
    updateOrder : (order) => dispatch(updateOrder(order))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminOrderInfo);
