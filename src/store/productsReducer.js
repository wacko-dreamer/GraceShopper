import axios from 'axios'

// initial state
const initialState = [

]

//constants
const GOT_PRODUCTS = 'GOT_PRODUCTS'


//action creators
export const gotProducts = (products) => ({
    type: GOT_PRODUCTS,
    products
})

//thunks
// 1. fetch products (with categories)
// 2. add a product
// 3. delete a product
// 4. edit a product

export const fetchProducts = () => {
    return (dispatch) => {
        axios.get('/api/products')
        .then(res => {
            dispatch(gotProducts(res.data))
        })
        .catch(ex => console.log(ex))
    }
}

export const addProduct = product => {
    return (dispatch) => {
        axios.post('/api/products', product)
        .then(() => {
            dispatch(fetchProducts())
        })
        .catch(ex => console.log(ex))
    }
}

export const deleteProduct = productId  => {
    return (dispatch) => {
        axios.delete('/api/products', productId)
        .then(() => {
            dispatch(fetchProducts())
        })
        .catch(ex => console.log(ex))
    }
}

export const editProduct = (productId, updatedData)  => {
    return (dispatch) => {
        axios.put(`/api/products/${productId}`, updatedData)
        .then(() => {
            dispatch(fetchProducts())
        })
        .catch(ex => console.log(ex))
    }
}

// reducer
const productReducer = (state = initialState, action) => {
    switch(action.type){
        case GOT_PRODUCTS:
            return products
        default:
            return state
    }
}



export default productReducer

