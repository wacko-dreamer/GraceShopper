import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchOrders, updateOrder } from '../store/ordersReducer';
import { findOrder } from '../util';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import { create } from 'domain';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm'


class Checkout extends Component {
    constructor() {
        super();
        this.state = {
            address: '',
            address2: '',
            zip: null,
            _state: '',
        }
    }
    render() {
        const { createdOrder, updateOrder, isGuest, history, amount } = this.props;
        //if we want to add additional shipping addresses...
        const { address, address2, zip, _state } = this

        console.log("AMOUNT", amount)

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
                        createdOrder.lineItems.map(lineItem => (
                            <ListGroupItem key={lineItem.id}>
                                <Fragment>ProductId: {lineItem.productId} Quantity: {lineItem.quantity} Price: ${lineItem.price}</Fragment>
                            </ListGroupItem>
                        ))
                    }
                        <Fragment>Total: ${amount}</Fragment><br/>
                    </ListGroup>
                ): null
            }
            
            <div>Payment Information</div>
            <br />
            <br />
            
            {/* <Button onClick={ () => updateOrder(createdOrder, 'COMPLETED', isGuest, history) } >Confirm Order</Button>
             */}

            <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
                <div>
                    <Elements>
                        <CheckoutForm amount = {amount} createdOrder = {createdOrder} isGuest = {isGuest} history = {history} />
                    </Elements>
                </div>
            </StripeProvider>

            </Fragment>
        )
    }
}

const mapStateToProps = ({ auth, orders }, { history }) => {
    let createdOrder = findOrder(auth, orders, 'CREATED');
    if(createdOrder === undefined) createdOrder = null;
    let isGuest = true; 
    if(auth.id) isGuest = false;
    let amount = 0
    if (createdOrder) {
        amount = createdOrder.line_items.reduce((accum, lineItem) => {
            return accum + lineItem.quantity * lineItem.price
        },0)
    }
    amount = Math.round(amount*100)/100
    return { createdOrder, isGuest, history, amount };
}

const mapDispatchToProps = ({ fetchOrders, updateOrder });


export default connect(mapStateToProps, mapDispatchToProps)(Checkout);