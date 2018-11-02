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
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const { name, description, price, quantity, imageUrl, categories } = this.state;
    const prodCats = categories.reduce((memo, cat) => {
      const catId = cat.split(' ');
      memo.push(catId[0])
      return memo
    }, []);
    const product = { name, description, price, quantity : quantity * 1, imageUrl, categories : prodCats };
    this.props.addProduct(product);
    this.props.history.push('/');
  }

  render () {
    const { name, description, price, quantity, imageUrl } = this.state;
    const {handleChange, handleSubmit} = this;
    const { categories, auth } = this.props;
    if (auth.isAdmin === false || auth.isAdmin === undefined) {
      return <h1>You are not authorized to view this page. Womp Womp =(</h1>
    } else {
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
                    categories.map(category => <option key={category.id}>{category.id} - {category.name}</option>)
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
    categories : state.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addProduct : (product) => dispatch(addProduct(product))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct)
