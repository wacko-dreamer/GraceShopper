import React, {Fragment, Component} from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Nav from './Nav'
import Auth from './Auth.js'
import Shop from './Shop.js'
import Cart from './Cart.js'
import OrderDetail from './OrderDetail';
import Orders from './Orders.js'
import Checkout from './Checkout'
import AddProduct from './AddProduct'
import AddCategory from './AddCategory'
import ProductDetail from './ProductDetail'
import AdminPage from './AdminPage'
import Products from './Products'
import Categories from './Categories'
import Search from './Search'
import AdminOrderPage from './AdminOrderPage'
import SignUp from './SignUp'
import AdminOrderInfo from './AdminOrderInfo'
import { connect } from 'react-redux'
import { fetchProducts } from '../store/productsReducer.js'
import { fetchCategories } from '../store/categoriesReducer.js'
import { fetchOrders } from '../store/ordersReducer.js'
import { findOrder } from '../util';



class App extends Component {

    constructor(){
        super()
    }

    componentDidMount(){
        this.props.fetchOrders()
        this.props.fetchProducts()
        this.props.fetchCategories()
    }

    render(){
        return(
            <Router>
                <Fragment>
                    <Nav/>
                    <Route render={ ({ history }) => <Auth history={ history }/>}/>
                    <Route exact path = '/' render = {() => <Shop/>}/>
                    <Route exact path = '/user/login' render ={ ({ history }) => <Auth history={ history }/>}/>
                    {/* <Route exact path = '/' render ={ ({ history }) => <Search history={ history }/> }/> */}
                    {/* <Route exact path = '/' render = {() => <Shop/>}/> */}
                    <Route path = '/user/:userId/cart' render = {({ history, match }) => <Cart history={ history } userId={ match.params.userId }/>}/>
                    <Route path = '/user/:userId/checkout' render = { ({ history }) => <Checkout history={ history }/> } />
                    <Route path = '/user/:userId/orders/:orderId' render = { ({ match }) => <OrderDetail orderId={ match.params.orderId }/> } />
                    <Route exact path = '/user/:userId/orders' render = {() => <Orders />} />
                    <Route path='/categories/:categoryId' render={({ match }) => <Shop categoryId={match.params.categoryId} />} />
                    <Route path='/products/:productId' render={({ match, history }) => <ProductDetail productId={match.params.productId} history={history} />} />
                    <Route path='/admin/homepage' component={AdminPage} />
                    <Route path='/admin/products' component={Products} />
                    <Route path='/admin/categories' component={Categories} />
                    <Route path='/admin/categories/create' render={({ history }) => <AddCategory history={history}/>}  />
                    <Route path='/admin/products/create' render={({ history }) => <AddProduct history={history}/>} />
                    <Route path = '/signup' render = {() => <SignUp/>}/>
                    <Switch>
                        <Route path='/admin/orders/:orderId' render={({ match, history }) => <AdminOrderInfo history={history} orderId={match.params.orderId}/>} />
                        <Route path='/admin/orders' component={AdminOrderPage} />
                    </Switch>
                </Fragment>
            </Router>
        )
    }
}

const mapDispatchToProps = ({ fetchProducts, fetchCategories, fetchOrders });
/* (dispatch) => {
    return {
        fetchProducts: () => dispatch(fetchProducts()),
        fetchCategories: () => dispatch(fetchCategories()),
        fetchOrders: () => dispatch(fetchOrders())
    }
} */

export default connect(null, mapDispatchToProps)(App)
