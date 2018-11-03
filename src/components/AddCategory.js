import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createCategory } from '../store/categoriesReducer.js'

class AddCategory extends Component {
  constructor () {
    super()
    this.state = {
      name : '',
      products : []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    console.log('target_name:', [ evt.target.name ]);
    console.log('target_value', evt.target.value);

    this.setState({
      [ evt.target.name ] : [ evt.target.name ] == 'products' ? [...evt.target.selectedOptions].map(option => option.value) : evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const { name, products } = this.state
    const catProds = products.reduce((memo, prod) => {
      const productId = prod.split(' ');
      memo.push(productId[0]);
      return memo;
    }, []);
    const category = { name, products : catProds };
    this.props.createCategory(category);
    this.props.history.push('/');
  }

  render () {
    const { name } = this.state;
    const { products, auth } = this.props;
    const { handleChange, handleSubmit } = this;
    if(auth.isAdmin === false || auth.isAdmin === undefined) {
      return <h1>You are not authorized to view this page.</h1>
    } else {
      return (
        <div>
          <h3>Create a new Product Category</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                Name: <input name='name' type='text' value={name} onChange={handleChange} />
              </label>
            </div>
            <div>
              <label>Select products that belong in this category
                <select name='products' multiple={true} value={this.state.products} onChange={handleChange}>
                  {
                    products.map(product => <option key={product.id}>{product.id} - {product.name}</option>)
                  }
                </select>
              </label>
            </div>
            <div>
              <button type='submit'>Submit</button>
            </div>
          </form>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    auth : state.auth,
    products : state.products
  }
};

const mapDispatchToProps = dispatch => {
  return {
    createCategory : (category) => dispatch(createCategory(category))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCategory);
