import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProduct } from '../store/productsReducer';

class AddProduct extends Component {
  constructor() {
    super()
    this.state = {
      name : '',
      description : '',
      price : '',
      quantity : '',
      imageUrl : ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [ evt.target.name ] : evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const product = {...this.state, price : this.state.price * 1, quantity : this.state.quantity *1};
    this.props.addProduct(product)
    this.props.history.push('/')
  }

  render () {
    const { name, description, price, quantity, imageUrl } = this.state
    const {handleChange, handleSubmit} = this
    return (
      <div>
        <h3>Add A New Product</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Name: <input name='name' type='text' value={name} onChange={handleChange}/>
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
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addProduct : (product) => dispatch(addProduct(product))
  }
};

export default connect(null, mapDispatchToProps)(AddProduct)
