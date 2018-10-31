import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchOrders } from '../store/ordersReducer';
import { findOrder } from '../util';


class Checkout extends Component {
    constructor() {
        super();
    }
    componentDidMount() {
        fetchOrders()       //create new cart here
    }
    render() {
        return(
            <Fragment>

            </Fragment>
        )
    }
}

const mapStateToProps = ({ orders }) => {
    findOrder()
}

const mapDispatchToProps = ({ fetchOrders });


connect(mapStateToProps, mapDispatchToProps)(Checkout);