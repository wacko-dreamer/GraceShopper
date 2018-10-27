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
// 1. fetch products (with categories & reviews)
// 2. add a product
// 3. delete a product
// 4. edit a product
// 5. create a review
// 6. delete a review
// 7. update a review

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
        axios.delete(`/api/products/${productId}`)
        .then(() => {
            dispatch(fetchProducts())
        })
        .catch(ex => console.log(ex))
    }
}

export const editProduct = (productId, updatedData)  => {
    return (dispatch) => {
        axios.put(`/api/products/${productId}`, updatedData)
        .then(() => dispatch(fetchProducts()))
        .catch(ex => console.log(ex))
    }
}

export const createReview = (productId, review) => {
    return (dispatch) => {
        axios.post(`/api/products/${productId}/reviews`, review)
        .then(() => dispatch(fetchProducts()))
        .catch(ex => console.log(ex))
    }
}

export const updateReview = (productId, reviewId, updatedReview) => {
    return (dispatch) => {
        axios.put(`api/products/${productId}/reviews/${reviewId}`, updatedReview)
        .then(() => dispatch(fetchProducts()))
        .catch(ex => console.log(ex))
    }
}

export const deleteReview = (productId, reviewId) => {
    return (dispatch) => {
        axios.delete(`api/products/${productId}/reviews/${reviewId}`)
        .then(() => dispatch(fetchProducts()))
        .catch(ex => console.log(ex))
    }
}

// reducer
const productReducer = (state = initialState, action) => {
    switch(action.type){
        case GOT_PRODUCTS:
            return action.products
        default:
            return state
    }
}



export default productReducer

