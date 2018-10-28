
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

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
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/user/:id/cart">Cart 2</Link>
                            </li>
                            <li className="nav-item active">
                                <Link className="nav-link" to="/user/:id/order">Order 3</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </Fragment>
    )
}

export default Nav