import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {findLineItemById} from '../util.js'
import { createLineItem } from '../store/ordersReducer';
import { findOrder } from '../util';


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
    render() {
        const {order, products, createLineItem} = this.props
        let quantity = 0
        return (
            <Fragment>
                <br />
                <div style={divStyle}>
                    {products.map(product => {
                        return (
                            <div className="card" style={cardStyle} key={product.id}>
                                <img className="card-img-top" src={product.imageUrl} alt="Card image cap" />
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">{product.description}</p>
                                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <p className="card-text"><strong>${product.price}</strong></p>
                                    <p className="card-text"><strong>{quantity}</strong></p>
                                    </div>
                                    <button className="btn btn-info" style={{margin: '5px'}}>+</button>
                                    <button className="btn btn-info" style={{margin: '5px'}}>-</button>
                                    {/* If user is admin then render below */}
                                    <Link to={`/products/${product.id}`}><button className="btn btn-primary" style={{margin: '10px'}}>Edit</button></Link>
                                    <button onClick={ () => createLineItem(order, product) } className="btn btn-success">Add To Cart</button>
                                </div>
                            </div>
                        )
                    })}
                <Link to={`/products/create`}><button className="btn btn-outline-secondary" style={{margin: '10px',padding: '10px'}}>+ Add New Products</button></Link>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = ({ products, orders, auth }, { categoryId }) => {
    if (categoryId){
       products = products.filter( product => {
           if (product.categories.find(category => category.id === categoryId*1)){
               return true
           }
       })
    }
    //lineItem logic
    let order = findOrder(auth, orders, 'CART');
    return { products, order }
}

const mapDispatchToProps = ({ createLineItem });

export default connect(mapStateToProps, mapDispatchToProps)(Products)