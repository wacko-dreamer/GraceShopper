import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'
import { fetchOrders } from '../store/ordersReducer.js'
import { findOrders, findOrderTotal, mapOrders } from '../util';


class Orders extends Component {
    render() {
        const { orders } = this.props;
        return (
            <Fragment>
                <div>
                    <h3>Your Orders</h3>
                    <span>Here you will find all the things that you have ordered from Wacko Dreamer</span>
                </div>
                <br />
            {
                mapOrders(orders)
            }
            </Fragment>
        )
    }
}

const mapStateToProps = ({ auth, orders }) => {
    orders = findOrders(auth, orders, 'COMPLETED');
    return { orders };
}

export default connect(mapStateToProps)(Orders)