import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProduct } from '../store/productsReducer';
import { fetchCategories } from '../store/categoriesReducer';

class AddProduct extends Component {
  constructor() {
    super()
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
  }

  handleChange(evt) {
    console.log('target_name:', [ evt.target.name ]);
    console.log('target_value', evt.target.value);

    this.setState({
      [ evt.target.name ] : [ evt.target.name ] == 'categories' ? [...evt.target.selectedOptions].map(option => option.value) : evt.target.value
    })
    console.log('state:', this.state)
  }

  handleSubmit(evt) {
    evt.preventDefault();
    console.log('submitstate: ', this.state);
    const { name, description, price, quantity, imageUrl, categories } = this.state;
    const product = { name, description, price, quantity : quantity * 1, imageUrl };
    const prodCats = categories.reduce((memo, cat) => {
      const obj = { name : cat };
      memo.push(obj);
      return memo;
    }, [])
    console.log('categories', prodCats)
    this.props.addProduct(product, prodCats)
    this.props.history.push('/')
  }

  render () {
    const { name, description, price, quantity, imageUrl } = this.state;
    const {handleChange, handleSubmit} = this;
    const { categories } = this.props;
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
          <h4>Product Category</h4>
          <div>
            <label>Select from existing categories:
              <select name='categories' multiple={true} value={this.state.categories} onChange={handleChange}>
                <option value={''}>None</option>
                {
                  categories.map(category => <option key={category.id}>{category.name}</option>)
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
const mapStateToProps = state => {
  return {
    categories : state.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addProduct : (product, categories) => dispatch(addProduct(product, categories))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct)
