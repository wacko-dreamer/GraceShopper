import React, { Component, Fragment } from 'react'

const cardStyle = {
    border: '1px solid grey',
    height: '320px',
    width: '18rem'
}

const divStyle = {
    display: 'flex',
    justifyContent: 'evenly-spaced'
}

class Products extends Component {
    render() {
        return (
            <Fragment>
                <div style={divStyle}>
                    <div className="card" style={cardStyle}>
                        <img class="card-img-top" src="https://images-na.ssl-images-amazon.com/images/I/41U8g8Ggf4L._AC_US200_.jpg" alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title">Coat 1</h5>
                            <p className="card-text">Coat 1 bio</p>
                            <a href="#" className="btn btn-primary">Add To Cart</a>
                        </div>
                    </div>
                    <div className="card" style={cardStyle}> 
                        <img class="card-img-top" src="https://images-na.ssl-images-amazon.com/images/I/516eEKsbFiL._AC_US200_.jpg" alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title">Coat 1</h5>
                            <p className="card-text">Coat 1 bio</p>
                            <a href="#" className="btn btn-primary">Add To Cart</a>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Products