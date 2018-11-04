import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Badge, Jumbotron } from 'reactstrap';
import { findOrder, findOrders, findLiQuantityByCartOrder, findUserId } from '../util';
import { connect } from 'react-redux';


const Nav = ({ liQuantity, completedOrders, userId, auth }) => {
    return (
        <Fragment>
            <nav className="navbar navbar-dark bg-dark">
                <div>
                    <div>
                        <Link className="navbar-brand" to="/">
                            <h1>Wacko Dreamer</h1>
                        </Link>
                        {/* <form className="form-inline">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form> */}
                    </div>
                    <div style={{display:'flex', justifyContent: 'space-between'}}>
                        <Link to={ `/user/${userId}/cart` } style={ { color:'white' } }>
                            Cart <Badge color='success'>{ liQuantity }</Badge>
                        </Link>
                        <Link to={ `/user/${userId}/orders` } style={ { color:'white' } }>
                            Orders <Badge color='success'>{ completedOrders.length }</Badge>
                        </Link>
                        <Link to = "/signup" style={ { color:'white' } }>
                            Sign Up
                        </Link>
                        <Link to="/user/login" style={{color:'white'}}>Login</Link>
                        {
                            auth.isAdmin ? <Link to='/admin/homepage' style={{ color : 'white' }}> Admin </Link> : <span></span>
                        }
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
    const userId = findUserId(auth, cartOrder)
    return ({ liQuantity, orders, completedOrders, userId, auth });
}

export default connect(mapStateToProps)(Nav);