import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Login from './Login.js'

const Nav = () => {
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
                    <div>
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/cart">Cart 2</Link>
                            </li>
                            <li className="nav-item active">
                                <Link className="nav-link" to="/orders">Order 3</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <Login/>
                    </div>
                </div>
            </nav>
        </Fragment>
    )
}

const mapStateToProps = () => {
    return
}
export default connect(mapStateToProps)(Nav)