import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { fetchOrders, updateLineItem, deleteLineItem, updateOrder } from '../store/ordersReducer';
import { findOrder, findOrders } from '../util';


class Cart extends Component {
    componentDidMount() {
        const { cartOrder, isGuest, fetchOrders } = this.props;
        fetchOrders(cartOrder, isGuest);
    }
    render() {
    const { auth, lineItems, cartOrder, isGuest, updateLineItem, deleteLineItem, updateOrder, history } = this.props;
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
                                        <td><button onClick={ () => updateLineItem(cartOrder, lineItem, 'increment') } className="btn btn-primary">+</button></td> 
                                        <td><button onClick={ () => updateLineItem(cartOrder, lineItem, 'decrement' ) } disabled={ lineItem.quantity === 1 } className="btn btn-primary">-</button></td>
                                        <td><button onClick={ () => deleteLineItem(cartOrder, lineItem) } className="btn btn-danger">Delete</button></td> 
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                        <button onClick={() => updateOrder(cartOrder, 'CREATED', isGuest, history) } className="btn btn-success my-2 my-sm-0">Checkout</button>
                    </Fragment>
                )
            }
            </Fragment>
        )
    }
}

const mapStateToProps = ({ auth, orders }, { history }) => {

    //lineItem logic
    let cartOrder = {};
    cartOrder = findOrder(auth, orders, 'CART')
    let lineItems = [];
    if(cartOrder.id) lineItems = cartOrder.lineItems.sort((a, b) => a.id - b.id);

    //creating order logic
    let isGuest = true; 
    if(auth.id) isGuest = false;
    return { auth, lineItems, cartOrder, isGuest, history };
}

const mapDispatchToProps = ({ fetchOrders, updateLineItem, deleteLineItem, updateOrder });

export default connect(mapStateToProps, mapDispatchToProps)(Cart)