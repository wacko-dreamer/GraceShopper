//component needs to get broken out
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
      imageUrl : '',
      categories : []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }
  handleSubmit(evt) {
    evt.preventDefault()
    const { name, description, price, quantity, imageUrl, categories } = this.state;
    const prodCats = categories.reduce((memo, cat) => {
      const catId = cat.split(' ');
      memo.push(catId[0])
      return memo
    }, []);
    const product = { name, description, price, quantity : quantity * 1, imageUrl, categories : prodCats };
    console.log('submittedProd:', product);
    this.props.editProduct(this.props.productId, product)
  }

  handleChange(evt) {
    this.setState({
        [ evt.target.name ] : [ evt.target.name ] == 'categories' ? [...evt.target.selectedOptions].map(option => option.value) : evt.target.value
      })
  }

  handleDelete(evt) {
    evt.preventDefault()
    this.props.deleteProduct(this.props.productId)
    this.props.history.push('/')
  }

  render () {

    const { products, productId, auth, categories } = this.props;
    const { name, description, price, quantity, imageUrl } = this.state;
    const { handleChange, handleSubmit, handleDelete } = this;
    const findProduct = products => {
      let arr = products.filter(_product => _product.id == productId);
      return arr[0];
    };
    const product = findProduct(products) || {};
    const productCats = product.categories || [];
    const productReviews = product.reviews || [];
    console.log('product:', product);
    return(
        <div>
            {/* Product detail section */}
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
            <div>
                {/* Category section */}
                <p style={{fontWeight : 'bold'}}>{product.name} Categories</p>
                <ul>
                    {
                        productCats.map(category => <li key={category.id}>{category.name}</li>)
                    }
                </ul>
            </div>
            {/* Review section - breaking out into component later*/}
            <div>
                <p style={{fontWeight : 'bold'}}>Reviews for {product.name}</p>
                <ul>
                    {
                        productReviews.map(review => {
                            return (
                                <li key={review.id} style={{ borderStyle : 'dotted solid' }}>
                                    <div className="card" >
                                    <div className="card-body">
                                        <h5 className="card-title">Title: {review.title}</h5>
                                        <p className="card-text"><strong>Rating: {review.rating}</strong></p>
                                        <p className="card-text">Description: {review.description}</p>
                                    </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>

        {
            /*Update Product - breaking out into component later */
            auth.isAdmin === false || auth.isAdmin === undefined ? <div></div> :
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
                <div>
              <label>
                <p>Categories:</p>
                <select name='categories' multiple={true} value={this.state.categories} onChange={handleChange}>
                  <option value={''}>None</option>
                  {
                    categories.map(category => <option key={category.id}>{category.id} - {category.name}</option>)
                  }
                </select>
              </label>
            </div>
                <button type='submit'>Submit</button>
                <div>
                <h5>Delete Product</h5>
                <button type='button' onClick={handleDelete}>Click here</button>
                </div>
            </form>
            </div>
        }
        </div>
        </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth : state.auth,
    products : state.products,
    categories : state.categories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editProduct : (productId, product) => dispatch(editProduct(productId, product)),
    deleteProduct : (product) => dispatch(deleteProduct(product))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product)
