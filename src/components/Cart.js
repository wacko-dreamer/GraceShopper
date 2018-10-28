import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { updateLineItem, deleteLineItem, updateOrder } from '../store/ordersReducer';


const Cart = ({ auth, lineItems, updateLineItem, deleteLineItem, updateOrder }) => {
    console.log(auth, lineItems)
    return (
        <Fragment>
            <h3>Shopping Cart</h3>
            <br/>
        {
            !lineItems ? <h4>Your Shopping Cart is Empty!</h4> : (
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
                                    <td><button onClick={ () => updateLineItem(lineItem, lineItem.quantity, 1) } className="btn btn-primary">+</button></td> 
                                    <td><button onClick={ () => updateLineItem(lineItem, lineItem.quantity, -1 ) } disabled={ lineItem.quantity === 1 } className="btn btn-primary">-</button></td>
                                    <td><button onClick={ () => deleteLineItem(lineItem) } className="btn btn-danger">Delete</button></td> 
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                    <button onClick={() => console.log('ORDERED')} className="btn btn-success my-2 my-sm-0">Checkout</button>
                </Fragment>
            )
        }
        </Fragment>
    )
}

const mapStateToProps = ({ auth, orders }) => {
    const order = orders.find(order => order.customerId === auth.id && order.status === 'CART');
    let lineItems;
    if(order) lineItems = order.line_items.sort((a, b) => a.id - b.id);
    return { auth, lineItems };
}

const mapDispatchToProps = ({ updateLineItem, deleteLineItem, updateOrder });

export default connect(mapStateToProps, mapDispatchToProps)(Cart)