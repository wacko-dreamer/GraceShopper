import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { findOrder } from '../util';
import { ListGroup, ListGroupItem } from 'reactstrap';


const OrderDetail = ({ completedOrder }) => {
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
                        completedOrder.lineItems.map(lineItem => (
                            <ListGroupItem key={lineItem.id}>
                                <Fragment>ProductId: {lineItem.productId} Quantity: {lineItem.quantity} Price: ${lineItem.price}</Fragment>
                            </ListGroupItem>
                        ))
                    }
                        <Fragment>Total: ${completedOrder.total}</Fragment><br/>
                    </ListGroup>
                ): null
            }
        </Fragment>
    )
}

const mapStateToProps = ({ auth, orders }) => {
    const completedOrder = findOrder(auth, orders, 'COMPLETED');
    console.log(completedOrder)
    return { completedOrder };
}

export default connect(mapStateToProps)(OrderDetail);