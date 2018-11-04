import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { findOrder, findOrderTotal } from '../util';
import { ListGroup, ListGroupItem } from 'reactstrap';


const OrderDetail = ({ completedOrder, total }) => {
    return(
        <Fragment>
            <div>
                <h3>Completed Order</h3>
                <span>Wacko Dreamer</span>
            </div>
            <br />
        {
            completedOrder ? (
                <ListGroup>
                    <Fragment>ORDER ID: {completedOrder.id}</Fragment><br/>
                    <Fragment>Shipping Address: {completedOrder.shippingAddress}</Fragment><br/>
                {   
                    completedOrder.lineItems.map((lineItem, idx) => (
                        <ListGroupItem key={lineItem.id}>
                            <Fragment><strong>{ idx + 1 }</strong> Quantity: {lineItem.quantity} Price: ${lineItem.price}</Fragment>
                        </ListGroupItem>
                    ))
                }
                    <Fragment>Total: ${total}</Fragment><br/>
                </ListGroup>
            ): null
        }
        </Fragment>
    )
}

const mapStateToProps = ({ auth, orders }, { orderId }) => {
    const completedOrder = findOrder(auth, orders, 'COMPLETED', null, orderId);
    const total = findOrderTotal(completedOrder);
    return { completedOrder, total };
}

export default connect(mapStateToProps)(OrderDetail);