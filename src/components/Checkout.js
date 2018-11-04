import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchOrders, updateOrder } from '../store/ordersReducer';
import { findOrder, findOrderTotal } from '../util';
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
            zip: 0,
            stateAddress: '',
            email: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }


    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e){
        const { address, address2, zip, stateAddress, email } = this.state
        const addressStr = address + address2 + zip + sateAddress + email
        
    }

    render() {
        const { createdOrder, isGuest, history, total } = this.props;
        const { address, address2, zip, stateAddress, email } = this.state
        const { handleChange } = this

        console.log("AMOUNT", total)

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
                        createdOrder.lineItems.map((lineItem, idx) => (
                            <ListGroupItem key={lineItem.id}>
                                <Fragment><strong>{ idx + 1 }</strong> Quantity: {lineItem.quantity} Price: ${lineItem.price}</Fragment>
                            </ListGroupItem>
                        ))
                    }
                        <Fragment>Total: ${total}</Fragment><br/>
                    </ListGroup>
                ): null
            }
            
            <form onChange = {handleChange}>
                <div>Shipping Information</div><br /><br />
                <label>Shipping Address: </label>
                <input type = 'text' name = 'address' value = {address}/>
                <br />


                <label>Address 2 </label>
                <input type = 'text' name = 'address2' value = {address2}/>
                <br />

                <label>City/Zip Code</label>
                <input type = 'text' name = 'zip' value = {zip}/>
                <br />

                <label>State</label>
                <input type = 'text' name = 'stateAddress' value = {stateAddress}/>
                <br />

                <label>Email Address:</label>
                <input type = 'text' name = 'email' value = {email}/>
                <br />
            </form>
            < hr/>
            
            <div>Payment Information</div><br /><br/>

            <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
                <div>
                    <Elements>
                        <CheckoutForm amount = {total} createdOrder = {createdOrder} isGuest = {isGuest} history = {history} />
                    </Elements>
                </div>
            </StripeProvider>

            </Fragment>
        )
    }
}

const mapStateToProps = ({ auth, orders }, { history, userId }) => {
    let createdOrder = findOrder(auth, orders, 'CREATED', userId);
    let isGuest = true; 
    if(auth.id) isGuest = false;
    const total = findOrderTotal(createdOrder)
    return { createdOrder, isGuest, history, total };
}

const mapDispatchToProps = ({ fetchOrders, updateOrder });


export default connect(mapStateToProps, mapDispatchToProps)(Checkout);