import React, {Component} from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'
import Nav from './Nav'
import Auth from './Auth.js'
import Shop from './Shop.js'
import Cart from './Cart.js'
import Order from './Order.js'
import { connect } from 'react-redux'
import { fetchProducts } from '../store/productsReducer.js'
import { fetchCategories } from '../store/categoriesReducer.js'
import { fetchOrders } from '../store/orderReducer.js'


class App extends Component {

    constructor(){
        super()
    }

    componentDidMount(){
        this.props.fetchProducts()
        this.props.fetchCategories()
        this.props.fetchOrders()
    }

    render(){
        return(
            <Router>
                <div>
                <Nav/>
                <Route render={ ({ history }) => <Auth history={ history }/>}/>
                <Route exact path = '/' render = {() => <Shop/>}/>
                <Route path = '/user/:id/cart' render = {() => <Cart/>}/>
                <Route path = '/user/:id/order' render = {() => <Order/>}/>
                </div>
            </Router>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProducts: () => dispatch(fetchProducts()),
        fetchCategories: () => dispatch(fetchCategories()),
        fetchOrders: () => dispatch(fetchOrders())
    }
}

export default connect(null,mapDispatchToProps)(App)