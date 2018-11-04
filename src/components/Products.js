import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {findLineItemById} from '../util.js'
import { createLineItem } from '../store/ordersReducer';
import { findOrder, filterProductsByCategory } from '../util';
import EditCategory from './EditCategory';


const cardStyle = {
    border: '1px solid grey',
    height: '500px',
    width: '18rem',
    margin: '10px'
}

const divStyle = {
    margin: '10px',
    padding: '10px',
    display: 'flex',
    position: 'absolute',
    left: '200px'
}


class Products extends Component {
    constructor(props){
        super(props)
        this.state = {
            searchText: this.props.history ? this.props.history.location.search.slice(1) : ''
        }
    }
    render() {
        const {order, createLineItem, auth, categoryId, history} = this.props
        let {products} = this.props
        // products = products.filter(product => {
        //         if (product.name.includes(this.state.searchText)){
        //             console.log(product.name)
        //         }
        // })
        return (
            <Fragment>
                <br />
                <div style={divStyle}>
                    {products.map(product => (
                            <div className="card" style={cardStyle} key={product.id}>
                                <Link to={`/products/${product.id}`}><img className="card-img-top" src={product.imageUrl} alt="Card image cap"/></Link>
                                <div className="card-body">
                                    <Link to={`/products/${product.id}`}><h5 className="card-title">{product.name}</h5></Link>
                                    <p className="card-text">{product.description}</p>
                                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <p className="card-text"><strong>${product.price}</strong></p>
                                    <p style = {{color: 'orange'}} className="card-text"><strong>{product.quantity ? null : 'Temporarily out of stock' }</strong></p>
                                    </div>
                                    {/* If user is admin then render below */}
                                    {auth.isAdmin ? <Link to={`/products/${product.id}`}><button className="btn btn-primary" style={{margin: '10px'}}>Edit</button></Link> : null }
                                </div>
                            </div>
                        )
                    )}
                    <div>
                        { auth.isAdmin && categoryId ? <EditCategory categoryId={categoryId} /> : null }
                    </div>
                </div>
            </Fragment>
        )
    }
}


const mapStateToProps = ({ products, orders, auth }, { categoryId }) => {
    products = filterProductsByCategory(categoryId, products); 
    const order = findOrder(auth, orders, 'CART');
    return { products, order, auth }
}

const mapDispatchToProps = ({ createLineItem });

export default connect(mapStateToProps, mapDispatchToProps)(Products)
