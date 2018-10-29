import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { updateLineItem, deleteLineItem, updateOrder } from '../store/ordersReducer';


const Cart = ({ auth, lineItems, order, updateLineItem, deleteLineItem, updateOrder }) => {
    console.log(auth, lineItems, order)
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
                    <button onClick={() => updateOrder(order, 'CREATED')} className="btn btn-success my-2 my-sm-0">Checkout</button>
                </Fragment>
            )
        }
        </Fragment>
    )
}

const mapStateToProps = ({ auth, orders }) => {
    let order = {};
    if(auth.id) order = orders.find(order => order.customerId === auth.id && order.status === 'CART');
    if(!auth.id) order = orders.find(order => !order.customerId && order.status === 'CART');
    let lineItems = [];
    if(order) lineItems = order.line_items.sort((a, b) => a.id - b.id);
    return { auth, lineItems, order };
}

const mapDispatchToProps = ({ updateLineItem, deleteLineItem, updateOrder });

export default connect(mapStateToProps, mapDispatchToProps)(Cart)