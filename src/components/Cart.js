import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { fetchOrders, updateLineItem, deleteLineItem, updateOrder } from '../store/ordersReducer';
import { findOrders } from '../util';


const Cart = ({ auth, lineItems, order, cart, isGuest, fetchOrders, updateLineItem, deleteLineItem, updateOrder }) => {
    /* const createOrder = (order, cart, isGuest) => {
        console.log(updateOrder)
        if(updateOrder) {
            updateOrder(order, 'CREATED')
            fetchOrders(cart, isGuest)      //.then doesn't work...
        }
    } */
    return (
        <Fragment>
            <h3>Shopping Cart</h3>
            <br/>
        {
            !lineItems.length ? <h4>Your Shopping Cart is Empty!</h4> : (
                <Fragment>
                    <span>Here you will find all the things that you have added to your cart</span>
                    <table className="table">
                        <tbody>
                        {
                            lineItems.map((lineItem, idx) => (
                                <tr key={ lineItem.id }>
                                    <th scope="row">{ idx + 1 }</th>
                                    <td>{ lineItem.product.name }</td>
                                    <td>{ lineItem.product.description }</td>
                                    <td>${ lineItem.product.price }</td>
                                    <td>Quantity: { lineItem.quantity }</td>
                                    <td><button onClick={ () => updateLineItem(order, lineItem, lineItem.quantity, 1) } className="btn btn-primary">+</button></td> 
                                    <td><button onClick={ () => updateLineItem(order, lineItem, lineItem.quantity, -1 ) } disabled={ lineItem.quantity === 1 } className="btn btn-primary">-</button></td>
                                    <td><button onClick={ () => deleteLineItem(order, lineItem) } className="btn btn-danger">Delete</button></td> 
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                    <button onClick={() => updateOrder(order, 'CREATED') } className="btn btn-success my-2 my-sm-0">Checkout</button>
                </Fragment>
            )
        }
        </Fragment>
    )
}

const mapStateToProps = ({ auth, orders }) => {

    //lineItem logic
    let order = {};
    if(auth.id) order = orders.find(order => order.customerId === auth.id && order.status === 'CART');
    if(!auth.id) order = orders.find(order => {
        if(order.customer) return order.customer.isGuest === true && order.status === 'CART';
    })
    let lineItems = [];
    if(order) lineItems = order.line_items.sort((a, b) => a.id - b.id);

    //creating order logic
    const cart = findOrders(auth, orders, 'CART');
    let isGuest;
    if(cart) {
        if(cart.customer) isGuest = cart.customer.isGuest;
    }

    return { auth, lineItems, order, cart, isGuest };
}

const mapDispatchToProps = ({ fetchOrders, updateLineItem, deleteLineItem, updateOrder });

export default connect(mapStateToProps, mapDispatchToProps)(Cart)