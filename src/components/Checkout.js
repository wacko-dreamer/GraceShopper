import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchOrders, updateOrder } from '../store/ordersReducer';
import { findOrder } from '../util';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';


class Checkout extends Component {
    constructor() {
        super();
    }
    componentDidMount() {
        fetchOrders()       //create new cart here
    }
    render() {
        const { createdOrder, updateOrder, history } = this.props;
        return(
            <Fragment>
                <div>
                    <h3>Checkout</h3>
                    <span>Wacko Dreamer</span>
                </div>
                <br />
            {
                createdOrder ? (
                    <ListGroup>
                        <Fragment>ORDER ID: {createdOrder.id}</Fragment><br/>
                        <Fragment>Shipping Address: {createdOrder.shippingAddress}</Fragment><br/>
                    {   
                        createdOrder.line_items.map(lineItem => (
                            <ListGroupItem key={lineItem.id}>
                                <Fragment>ProductId: {lineItem.productId} Quantity: {lineItem.quantity} Price: ${lineItem.price}</Fragment>
                            </ListGroupItem>
                        ))
                    }
                        <Fragment>Total: ${createdOrder.total}</Fragment><br/>
                    </ListGroup>
                ): null
            }
                <Button onClick={ () => updateOrder(createdOrder, 'COMPLETED', history) } >Confirm Order</Button>
            </Fragment>
        )
    }
}

const mapStateToProps = ({ auth, orders }, { history }) => {
    const createdOrder = findOrder(auth, orders, 'CREATED');
    return { createdOrder, history };
}

const mapDispatchToProps = ({ fetchOrders, updateOrder });


export default connect(mapStateToProps, mapDispatchToProps)(Checkout);