import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'
import { fetchOrders } from '../store/ordersReducer.js'
import { findOrders, findOrderTotal, mapOrders } from '../util';
import { Link } from 'react-router-dom';
import { Jumbotron } from 'reactstrap';


class Orders extends Component {
    render() {
        const { completedOrders } = this.props;
        return (
            <div className="container" style={{marginTop: '30px'}}>
                {
                    !completedOrders[0] ? (
                        <Fragment>
                            <div>
                                <h3>No Orders!</h3>
                                <Link to='/'>
                                    <Jumbotron>
                                        <h1>Back to Products!</h1>
                                    </Jumbotron>
                                </Link>
                            </div>
                        </Fragment>
                    ) : (
                    <Fragment>
                        <div>
                            <h3>Your Orders</h3>
                            <span>Here you will find all the things that you have ordered from Wacko Dreamer:</span>
                        </div>
                        <br />
                        { mapOrders(completedOrders) }
                    </Fragment>
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = ({ auth, orders }) => {
    const completedOrders = findOrders(auth, orders, 'COMPLETED');
    return { completedOrders };
}

export default connect(mapStateToProps)(Orders)