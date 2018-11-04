import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchOrders, updateOrder } from '../store/ordersReducer';
import { updateUser } from '../store/usersReducer';
import { findOrder } from '../util';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
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
            email: '',
            name: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e){
        const { address, address2, zip, stateAddress, email } = this.state
        const addressStr = address + address2 + zip + sateAddress + email
        
    }

    render() {
        const { createdOrder, isGuest, history, total } = this.props;
        const { address, address2, zip, stateAddress, email } = this.state
        const { handleChange, handleSubmit } = this

        console.log("AMOUNT", total)

        return(
            <Fragment>
                <div>
                    <h3>Checkout</h3>
                    <span>Wacko Dreamer</span>
                </div>
                <br />
                { createdOrder.id ? mapListItems(createdOrder) : null }
            

            {isGuest ?
                <Fragment>
                <form onChange = {handleChange} onSubmit = {handleSubmit}>
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
                    
                    <label>Name:</label>
                    <input type = 'text' name = 'name' value = {name}/>
                    <br />

                    <label>Email Address:</label>
                    <input type = 'text' name = 'email' value = {email}/>
                    <br />
                </form>
                <hr />
                </Fragment>
                :
                null
            }

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

const mapDispatchToProps = ({ fetchOrders, updateOrder, updateUser });


export default connect(mapStateToProps, mapDispatchToProps)(Checkout);