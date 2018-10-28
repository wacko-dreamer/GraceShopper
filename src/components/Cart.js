import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { updateOrder } from '../store/orderReducer';

const Cart = ({updateOrder}) => {
    return (
        <Fragment>
            <div style = {{margin: '20px'}}>
            <h3>Shopping Cart</h3>
            <h4>Your Shopping Cart is Empty!</h4>
            <span>Here you will find all the things that you have added to your cart</span>
            <div>
            <table className="table" >
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
            </div>
            <button onClick={() => updateOrder(cart)} className="btn btn-success my-2 my-sm-0">Checkout</button>
            </div>
        </Fragment>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateOrder: () => dispatch(updateOrder())
    }
}

export default connect(null, mapDispatchToProps)(Cart)