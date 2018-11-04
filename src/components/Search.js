import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'


class Search extends Component {
    constructor(){
        super()
        this.state = {
            searchText: '',
            items: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(ev){
        this.setState({ [ev.target.name]: ev.target.value });
    }

    handleSubmit(ev){
        ev.preventDefault()
    }

    render(){
        const { handleSubmit, handleChange } = this
        const {searchText} = this.state
        return (
            <form style={{display: 'flex'}} onSubmit={handleSubmit}>
                <input className="form-control" name="searchText" type="text" placeholder="Search..." value={searchText} onChange={handleChange}/>
                <Link to={`/?search=${this.state.searchText}`}><button className='btn btn-success' style={{marginLeft: '10px'}}>Search</button></Link>
            </form>
        )
    }
}


export default Search