import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { updateOrder } from '../store/ordersReducer';


const Cart = ({ auth, order, updateOrder }) => {
    console.log(auth, order)
    return (
        <Fragment>
            <h3>Shopping Cart</h3>
            <h4>Your Shopping Cart is Empty!</h4>
            <span>Here you will find all the things that you have added to your cart</span>
            <table className="table">
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Tomato</td>
                        <td>Tomatoes are meh</td>
                        <td>$1.99</td>
                        <td>2</td>
                        <td><button className="btn btn-primary">+</button></td> 
                        <td><button className="btn btn-primary">-</button></td> 
                    </tr>
                </tbody>
            </table>
            <button onClick={() => console.log('ORDERED')} className="btn btn-success my-2 my-sm-0">Checkout</button>
        </Fragment>
    )
}

const mapStateToProps = ({ auth, orders }) => {
    const order = orders.find(order => order.customerId === auth.id);
    return { auth, order };
}

const mapDispatchToProps = ({ updateOrder });

export default connect(mapStateToProps, mapDispatchToProps)(Cart)