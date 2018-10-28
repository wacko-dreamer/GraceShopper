import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'


const cardStyle = {
    border: '1px solid grey',
    height: '500px',
    width: '18rem',
    margin: '10px'
}

const divStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '10px',
    padding: '10px'
}

class Products extends Component {
    render() {
        const {products} = this.props
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
                                    <p className="card-text"><strong>${product.price}</strong></p>
                                    <a href="#" className="btn btn-success">Add To Cart</a>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = ({ products , pathname }) => {
    console.log(pathname)
    // check this here!
    // if (pathname) {
    //   products = products.filter(product => product.categories.map(cat => cat.id !== id ))  
    // }
    return {
        products
    }
}

export default connect(mapStateToProps)(Products)