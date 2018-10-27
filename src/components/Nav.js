import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { login, logout } from '../store/authReducer'


class Nav extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            error: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidUpdate(prevProps) {
        const { auth } = this.props;
        if(prevProps !== this.props) {
            if(auth.id) this.setState({ username: '', password: '', error: '' });
        }
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        const { handleChange } = this;
        const { username, password, error } = this.state;
        const { auth, login, logout, history } = this.props;
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
                            {/* <form className="form-inline">
                                <input className="form-control mr-sm-2" type="username" placeholder="Username" aria-label="Username" />
                                <input className="form-control mr-sm-2" type="password" placeholder="Password" aria-label="Password" />
                                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Login</button>
                            </form> */}
                        {
                            !auth.id ? (
                                <Fragment>
                                    <br/>
                                    <form className='form-inline' style={{ float: 'right' }} >
                                        <input onChange={ handleChange } value={ username } name='username' className="form-control mr-sm-2" type="username" placeholder="Username" aria-label="Username" autoFocus />
                                        <input onChange={ handleChange } value={ password } name='password' className="form-control mr-sm-2" type="password" placeholder="Password" aria-label="Password" />
                                        <button onClick={ () => login(this.state, history)
                                            .catch(() => this.setState({ error: 'Incorrect Username and/or Password. Please try again.' })) } 
                                            color='primary' className="btn btn-outline-success my-2 my-sm-0" type="submit" >Login</button>
                                    </form>
                                    <br/>
                                {
                                    error ? (
                                        <Fragment>
                                            <br/>
                                            <div className='error-message' >{ error }</div> 
                                        </Fragment>
                                    ) : null
                                }
                                </Fragment>
                            ) : (<Fragment>
                                    <br/>
                                    <button onClick={ () => logout(history) } color='danger' style={{ float: 'right' }} className="btn btn-outline-success my-2 my-sm-0" type="submit" >Logout</button>
                                    <h3 style={{ display: 'inline-block', float: 'right' }} >Welcome { auth.username }!&emsp;</h3>
                                    <br/>
                                </Fragment>
                            )
                        }
                        </div>
                    </div>
                </nav>
            </Fragment>
        )
    }
}

const mapStateToProps = ({ auth }, { history }) => ({ auth, history });

const mapDispatchToProps = ({ login, logout })


export default connect(mapStateToProps, mapDispatchToProps)(Nav);