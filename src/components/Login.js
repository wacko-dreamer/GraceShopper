import React, { Component, Fragment } from 'react'

class Login extends Component {
    render() {
        return (
            <form className="form-inline" style={{float: 'right'}}>
                <input className="form-control mr-sm-2" type="username" placeholder="Username" aria-label="Username" />
                <input className="form-control mr-sm-2" type="password" placeholder="Password" aria-label="Password" />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Login</button>
            </form>
        )
    }
}

export default Login