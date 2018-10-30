import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editProduct, deleteProduct } from '../store/productsReducer';

const cardStyle = {
  border: '1px solid grey',
  height: '500px',
  width: '40rem',
  margin: '10px'
}

class Product extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name : '',
      description : '',
      price : '',
      quantity : '',
      imageUrl : ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }
  handleSubmit(evt) {
    evt.preventDefault()
    const newProduct = {...this.state, quantity : this.state.quantity * 1}
    console.log('newProduct:', newProduct)
    this.props.editProduct(this.props.productId, newProduct)
  }

  handleChange(evt) {
    this.setState({
      [ evt.target.name ] : evt.target.value
    })
  }

  handleDelete(evt) {
    evt.preventDefault()
    this.props.deleteProduct(this.props.productId)
    this.props.history.push('/')
  }

  render () {

    const { products, productId } = this.props;
    const { name, description, price, quantity, imageUrl } = this.state;
    const { handleChange, handleSubmit, handleDelete } = this;
    const findProduct = products => {
      let arr = products.filter(_product => _product.id == productId);
      return arr[0];
    };
    const product = findProduct(products) || {};
    console.log('product:', product);
    return(
      <div>
        <div className="card" style={cardStyle}>
          <img className="card-img-top" src={product.imageUrl} alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">{product.description}</p>
            <p className="card-text"><strong>${product.price}</strong></p>
            <a href="#" className="btn btn-success">Add To Cart</a>
        </div>
        </div>
        <div>
          <h5 className='card-title'>Update Product</h5>
          <form onSubmit={(product) => handleSubmit(product)}>
            <div>
              <label>
                Name: <input name='name' type='text' value={name} onChange={(product) => handleChange(product)} />
              </label>
            </div>
            <div>
              <label>
                Description: <input name='description' type='text' value={description} onChange={handleChange}/>
              </label>
            </div>
            <div>
              <label>
                Price: <input name='price' type='text' value={price} onChange={handleChange}/>
              </label>
            </div>
            <div>
              <label>
                Quantity: <input name='quantity' type='text' value={quantity} onChange={handleChange}/>
              </label>
            </div>
            <div>
              <label>
                Image: <input name='imageUrl' type='text' value={imageUrl} onChange={handleChange}/>
              </label>
            </div>
            <button type='submit'>Submit</button>
            <div>
              <h5>Delete Product</h5>
              <button type='button' onClick={handleDelete}>Click here</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products : state.products
  }
};

const mapDispatchToProps = dispatch => {
  return {
    editProduct : (productId, product) => dispatch(editProduct(productId, product)),
    deleteProduct : (product) => dispatch(deleteProduct(product))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Product)
