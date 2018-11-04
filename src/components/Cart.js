import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { fetchOrders, updateLineItem, deleteLineItem, updateOrder } from '../store/ordersReducer';
import { findOrder, findOrders, findLineItems, findOrderTotal, floatRight } from '../util';
import { Jumbotron } from 'reactstrap';
import { Link } from 'react-router-dom';


class Cart extends Component {
    componentDidMount() {
        const { cartOrder, isGuest, fetchOrders } = this.props;
        fetchOrders(cartOrder, isGuest);
    }
    render() {
    const { auth, lineItems, cartOrder, isGuest, updateLineItem, deleteLineItem, updateOrder, history, total } = this.props;
        return (
            <Fragment>
                <h3>Shopping Cart</h3>
                <br/>
            {
                !lineItems.length ? (
                <Fragment>
                    <h4>Your Shopping Cart is Empty!</h4> 
                    <Link to='/'>
                        <Jumbotron>
                            <h1>Back to Products!</h1>
                        </Jumbotron>
                    </Link>
                </Fragment>
                ) : (
                    <Fragment>
                        <span>Here you will find all the things that you have added to your cart:</span>
                        <table className="table">
                            <br/>
                            <tbody>
                            {
                                lineItems.map(lineItem => (
                                    <tr key={ lineItem.id }>
                                        <td><strong>{ lineItem.product.name }</strong></td>
                                        <td><img src={ lineItem.product.imageUrl }/></td>
                                        <td>{ lineItem.product.description }</td>
                                        <td><strong>${ lineItem.product.price }</strong></td>
                                        <td><strong>Quantity: </strong>{ lineItem.quantity }</td>
                                        <td><button onClick={ () => updateLineItem(cartOrder, lineItem, 'increment') } className="btn btn-primary">+</button></td> 
                                        <td><button onClick={ () => updateLineItem(cartOrder, lineItem, 'decrement' ) } disabled={ lineItem.quantity === 1 } className="btn btn-primary">-</button></td>
                                        <td><button onClick={ () => deleteLineItem(cartOrder, lineItem) } className="btn btn-danger">Delete</button></td> 
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                        <strong><hr/></strong>
                        <h4 style={ floatRight }>Total: ${ total }</h4>
                        <br/><br/>
                        <button onClick={() => updateOrder(cartOrder, 'CREATED', isGuest, history) } 
                            style={ floatRight } className="btn btn-success my-2 my-sm-0">Checkout</button>
                        <br/><br/><br/>
                    </Fragment>
                )
            }
            </Fragment>
        )
    }
}

const mapStateToProps = ({ auth, orders }, { history }) => {

    //lineItem logic
    const cartOrder = findOrder(auth, orders, 'CART')
    const lineItems = findLineItems(cartOrder);
    const total = findOrderTotal(cartOrder);
    //creating order logic
    let isGuest = true; 
    if(auth.id) isGuest = false;
    return { auth, lineItems, cartOrder, isGuest, history, total };
}

const mapDispatchToProps = ({ fetchOrders, updateLineItem, deleteLineItem, updateOrder });

export default connect(mapStateToProps, mapDispatchToProps)(Cart)