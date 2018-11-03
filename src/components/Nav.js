
import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Nav extends Component {
    render() {
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
                            <Link to="/user/:id/cart" style={{color:'white'}}> Cart 2 </Link>
                            <Link to="/user/:id/orders" style={{color:'white'}}> Orders 3 </Link>
                            {
                                this.props.auth.isAdmin ? <Link to='/admin/homepage' style={{ color : 'white' }}> Admin </Link> : <span></span>
                            }
                        </div>
                    </div>
                </nav>
            </Fragment>
        )
    }

}

const mapStateToProps = ({ auth }) => {
    return { auth }
}

export default connect(mapStateToProps)(Nav);
