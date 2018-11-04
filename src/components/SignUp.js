import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { createUser } from '../store/usersReducer'


class SignUp extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            username: '',
            password: '',
            address: '',
            address2: '',
            zip: 0,
            stateAddress: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault()
        const { createUser } = this.props
        const { name, username, password, address, address2, zip, stateAddress} = this.state
        const addressArray = [address + address2 + stateAddress + zip]

        createUser({
            name: name,
            username: username,
            password: password,
            address: addressArray,
        })
    }


    render () {
        const { handleChange, handleSubmit } = this
        const { name, username, password, address, address2, zip, stateAddress} = this.state
        

        return(
            <Fragment>
                <form onChange = {handleChange} onSubmit = {handleSubmit}>
                <div>My Information</div><br />

                <label>Name:</label>
                <input type = 'text' name = 'name' value = {name}/>
                <br />
                
                <label>Email Address:</label>
                <input type = 'text' name = 'username' value = {username}/>
                <br />

                <label>Password:</label>
                <input type = 'password' name = 'password' value = {password}/>
                <br />
                <br />
                <hr />


                <div>Shipping Information</div><br />
                <label>Shipping Address: </label>
                <input type = 'text' name = 'address' value = {address}/>
                <br />


                <label>Address 2 </label>
                <input type = 'text' name = 'address2' value = {address2}/>
                <br />

                <label>City/Zip Code</label>
                <input type = 'number' name = 'zip' value = {zip}/>
                <br />

                <label>State</label>
                <input type = 'text' name = 'stateAddress' value = {stateAddress}/>
                <br />

                <button type = 'submit'>Create</button>

            </form>
            <hr />
            </Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    createUser: (user) => dispatch(createUser(user))
})

export default connect(null, mapDispatchToProps)(SignUp)