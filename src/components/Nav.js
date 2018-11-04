
import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Search from './Search'

class Nav extends Component {
    render() {
        return (
            <Fragment>
                <nav className="navbar navbar-dark bg-dark">
                        <div>
                            <Link className="navbar-brand" to="/">Wacko Dreamer</Link>
                        </div>
                        <div>
                            <Link to="/user/:id/cart" style={{color:'white'}}> Cart </Link>
                            <Link to="/user/:id/orders" style={{color:'white'}}> Orders </Link>
                            <Link to="/user/login" style={{color:'white'}}>Login</Link>
                            {
                                this.props.auth.isAdmin ? <Link to='/admin/homepage' style={{ color : 'white' }}> Admin </Link> : <span></span>
                            }
                        </div>
                </nav>
            </Fragment>
        )
    }

}

const mapStateToProps = ({ auth, orders }) => {
    return { auth, orders }
}

export default connect(mapStateToProps)(Nav);
