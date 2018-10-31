import React, {Fragment, Component} from 'react'
import { connect } from 'react-redux'
import { fetchOrders } from '../store/ordersReducer.js'
import { findFinishedOrders } from '../util';

class Order extends Component {

    constructor() {
        super()
    }

    componentDidMount(){
        this.props.fetchOrders()
        console.log(this.props.order)
    }

    render() {
        return (
            <Fragment>
                <div>
                    <h3>Your Orders</h3>
                    <span>Here you will find all the things that you have orderd from Wacko Dreamer</span>
                </div>
                <br />
                <table className="table">
                    <tbody>
                        <tr>
                            {this.props.order.map(ord => {
                                return (
                                    <div>
                                        <h4>ORDER ID: {ord.id}</h4>
                                        <th scope="row">1</th>
                                        <td>{ord.total}</td>
                                        <td>{ord.shippingAddress}</td>
                                        <ul>
                                            {ord.lineItems.map(lineItem => {
                                                return (
                                                    <div>
                                                        <li>{lineItem.product.id}</li>
                                                        <li>{lineItem.quantity}</li>
                                                        <li>{lineItem.price}</li>
                                                    </div>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                )
                            })}
                        </tr>
                    </tbody>
                </table>
            </Fragment>
        )
    }
}

const mapStateToProps = ({ order }) => {
    order = findFinishedOrders(order)
    return {
        order
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        fetchOrders: () => dispatch(fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)