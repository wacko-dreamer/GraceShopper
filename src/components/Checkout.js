import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchOrders, updateOrder } from '../store/ordersReducer';
import { findOrder } from '../util';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import { create } from 'domain';


class Checkout extends Component {
    constructor() {
        super();
    }
    render() {
        const { createdOrder, updateOrder, isGuest, history } = this.props;
        return(
            <Fragment>
                <div>
                    <h3>Checkout</h3>
                    <span>Wacko Dreamer</span>
                </div>
                <br />
            {
                createdOrder.id ? (
                    <ListGroup>
                        <Fragment>ORDER ID: {createdOrder.id}</Fragment><br/>
                        <Fragment>Shipping Address: {createdOrder.shippingAddress}</Fragment><br/>
                    {   
                        createdOrder.lineItems.map(lineItem => (
                            <ListGroupItem key={lineItem.id}>
                                <Fragment>ProductId: {lineItem.productId} Quantity: {lineItem.quantity} Price: ${lineItem.price}</Fragment>
                            </ListGroupItem>
                        ))
                    }
                        <Fragment>Total: ${createdOrder.total}</Fragment><br/>
                    </ListGroup>
                ): null
            }
                <Button onClick={ () => updateOrder(createdOrder, 'COMPLETED', isGuest, history) } >Confirm Order</Button>
            </Fragment>
        )
    }
}

const mapStateToProps = ({ auth, orders }, { history }) => {
    let createdOrder = findOrder(auth, orders, 'CREATED');
    let isGuest = true; 
    if(auth.id) isGuest = false;
    return { createdOrder, isGuest, history };
}

const mapDispatchToProps = ({ fetchOrders, updateOrder });


export default connect(mapStateToProps, mapDispatchToProps)(Checkout);