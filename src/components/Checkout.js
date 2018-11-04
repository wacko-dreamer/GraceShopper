import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchOrders, updateOrder } from '../store/ordersReducer';
import { findOrder, findOrderTotal, mapListItems } from '../util';
import { ListGroup, ListGroupItem, Button, Form, FormGroup, Label, Input } from 'reactstrap';
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
                { createdOrder.id ? mapListItems(createdOrder) : null }
            
            <Form>
                <FormGroup>
                    <div>Shipping Information</div><br /><br />
                    <Label>Shipping Address: </Label>
                    <Input type = 'text' name = 'address' value = {address} onChange = {handleChange}/>
                    <br />


                    <Label>Address 2:</Label>
                    <Input type = 'text' name = 'address2' value = {address2} onChange = {handleChange}/>
                    <br />

                    <Label>City/Zip Code:</Label>
                    <Input type = 'text' name = 'zip' value = {zip} onChange = {handleChange}/>
                    <br />

                    <Label>State:</Label>
                    <Input type = 'text' name = 'stateAddress' value = {stateAddress} onChange = {handleChange}/>
                    <br />

                    <Label>Email Address:</Label>
                    <Input type = 'text' name = 'email' value = {email} onChange = {handleChange}/>
                    <br />
                </FormGroup>
            </Form>
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