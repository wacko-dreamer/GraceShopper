
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
                    <div style={{display:'flex', justifyContent: 'space-between'}}>
                        <Link to="/user/:id/cart" style={{color:'white'}}>Cart 2</Link>
                        <Link to="/user/:id/order" style={{color:'white'}}>Order 3</Link>
                    </div>
                </div>
            </nav>
        </Fragment>
    )
}

export default Nav