//component needs to get broken out
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { editProduct, deleteProduct } from '../store/productsReducer';
import orderReducer, { createLineItem, updateLineItem } from '../store/ordersReducer';
import { findOrder, findProduct, findLineItemByProductId } from '../util';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';

const cardStyle = {
  border: '1px solid grey',
  height: '500px',
  width: '40rem',
  margin: '10px'
}

const imgStyle = {
    width: '500px'
}


class ProductDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name : '',
      description : '',
      price : '',
      quantity : '',
      imageUrl : '',
      categories : [],
      liQuantity: 0,
      dropdownOpen: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.toggle = this.toggle.bind(this);
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

  handleAddToCart(evt) {
    const { product, createLineItem, updateLineItem, order, lineItem } = this.props;
    const { liQuantity } = this.state;
    //evt.preventDefault();
    if(!lineItem.id) createLineItem(order, lineItem, product, liQuantity * 1);
    else updateLineItem(order, lineItem, 'increment', liQuantity * 1);
  }
  toggle() {
      this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }
  render () {
    const { product, auth, categories, order, lineItem, history } = this.props;
    const { name, description, price, quantity, imageUrl, dropdownOpen, liQuantity } = this.state;
    const { handleChange, handleSubmit, handleDelete, handleAddToCart, toggle } = this;
    return(
    <Fragment>
    {
        product.id ? (
                <div className="container" style={{marginTop: '40px'}}>
                    <Button color='info' onClick={ () => history.goBack() }>Back</Button>
                {/* Product detail section */}
                    <div style={{display: 'flex'}}>
                        <div>
                          <img style = {imgStyle} className="card-img-top" src={product.imageUrl} alt="Card image cap" />
                        </div>
                        <div style={{marginLeft: '20px'}}>
                            <h3 className="card-title">{product.name}</h3>
                            <p className="card-text">{product.description}</p>
                            <p className="card-text"><strong>${product.price}</strong></p>
                            <ButtonDropdown isOpen={ dropdownOpen } toggle={ toggle }>
                                <DropdownToggle color="dark" caret>{ liQuantity ? liQuantity : "Quantity" }</DropdownToggle>
                                <DropdownMenu>
                                {
                                    [1, 2, 3, 4, 5].map(_liQuantity => (
                                        <DropdownItem key={ _liQuantity } onClick={ (e) => handleChange(e) } name="liQuantity" value={ _liQuantity }>
                                            { _liQuantity }
                                        </DropdownItem>
                                    ))
                                }
                                </DropdownMenu>
                            </ButtonDropdown>
                            <a onClick={ () => handleAddToCart() } href="#" className="btn btn-success">Add To Cart</a>
                        </div>
                    </div>
                    <div>
                <div>
                    {/* Category section */}
                        {
                            product.categories.map(category => <h2 className="badge badge-warning" key={category.id}>{category.name}</h2>)
                        }
                </div>
                    </div>
                </div>
            <div>
                {/* Review section - breaking out into component later*/}
                <div>
                    <br/>
                    <h5 style={{fontWeight : 'bold'}}>Reviews for {product.name}</h5>
                    <hr/>
                        {
                            product.reviews.map(review => {
                                return (
                                    <div key={review.id}>
                                        <div className="card" >
                                            <div className="card-body" style={{backgroundColor: '#F2F2F2'}}>
                                                <h5 className="card-title">{review.title}</h5>
                                                <p className="card-text" style={{color: 'orange'}}><strong>{"★".repeat(review.rating)} </strong></p>
                                                <p className="card-text">{review.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
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
        ) : null
    }
    </Fragment>
    )
  }
}

const mapStateToProps = ({ auth, products, categories, orders }, { productId }) => {
    const order = findOrder(auth, orders, 'CART');
    const product = findProduct(products, productId);
    const lineItem = findLineItemByProductId(order, product);
    return { auth, product, categories, order, lineItem };
};

const mapDispatchToProps = ({ editProduct, deleteProduct, createLineItem, updateLineItem });

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
