import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { findOrder, findOrderTotal, mapListItems } from '../util';
import { ListGroup, ListGroupItem } from 'reactstrap';


const OrderDetail = ({ completedOrder, total }) => {
    return(
        <Fragment>
            <div>
                <h3>Completed Order</h3>
                <span>Wacko Dreamer</span>
            </div>
            <br />
        {
            completedOrder ? mapListItems(completedOrder) : null
        }
        </Fragment>
    )
}

const mapStateToProps = ({ auth, orders }, { orderId }) => {
    const completedOrder = findOrder(auth, orders, 'COMPLETED', null, orderId);
    const total = findOrderTotal(completedOrder);
    return { completedOrder, total };
}

export default connect(mapStateToProps)(OrderDetail);