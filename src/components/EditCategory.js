import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateCategory, deleteCategory } from '../store/categoriesReducer'

class EditCategory extends Component {
  constructor () {
    super()
    this.state = {
      name : '',
      products : []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
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
    const categoryId = this.props.categoryId
    this.props.updateCategory(categoryId, category);
  }

  handleDelete(evt) {
    evt.preventDefault()
    this.props.deleteCategory(this.props.categoryId)
  }

  render() {
    const { handleChange, handleSubmit, handleDelete } = this;
    const { name } = this.state;
    const { products } = this.props;
    return (
      <div>
        <h3>Edit Category</h3>
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
          <div>
              <h5>Delete Category</h5>
              <button type='button' onClick={handleDelete}>Click here</button>
          </div>
        </form>
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
    updateCategory : (categoryId, category) => dispatch(updateCategory(categoryId, category)),
    deleteCategory: (categoryId) => dispatch(deleteCategory(categoryId))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCategory);
