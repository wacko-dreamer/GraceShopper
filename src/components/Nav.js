
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { Badge } from 'reactstrap';
import { findOrder, findOrders, findLiQuantityByCartOrder } from '../util';


const Nav = ({ liQuantity, completedOrders }) => {
    return (
        <Fragment>
            <nav className="navbar navbar-dark bg-dark">
                <div>
                    <div>
                        <Link className="navbar-brand" to="/">Wacko Dreamer</Link>
                        {/* <form className="form-inline">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form> */}
                    </div>
                    <div style={{display:'flex', justifyContent: 'space-between'}}>
                        <Link to="/user/:id/cart" style={{color:'white'}}>Cart <Badge>{ liQuantity }</Badge></Link>
                        <Link to="/user/:id/orders" style={{color:'white'}}>Orders <Badge>{ completedOrders.length }</Badge></Link>
                    </div>
                </div>
            </nav>
        </Fragment>
    )
}

const mapStateToProps = ({ auth, orders }) => {
    const cartOrder = findOrder(auth, orders, 'CART');
    const liQuantity = findLiQuantityByCartOrder(cartOrder);
    const completedOrders = findOrders(auth, orders, 'COMPLETED');
    return ({ liQuantity, orders, completedOrders });
}

export default connect(mapStateToProps)(Nav);