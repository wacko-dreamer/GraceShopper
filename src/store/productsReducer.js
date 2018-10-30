import axios from 'axios'

// initial state
const initialState = [

]

//constants
const GOT_PRODUCTS = 'GOT_PRODUCTS'
const CREATED_PRODUCT = 'CREATED_PRODUCT'
const UPDATED_PRODUCT = 'UPDATED_PRODUCT'
const DELETED_PRODUCT = 'DELETED_PRODUCT'
const CREATED_REVIEW = 'CREATED_REVIEW'
const UPDATED_REVIEW = 'UPDATED_REVIEW'
const DELETED_REVIEW = 'DELETED_REVIEW'

//action creators
const gotProducts = (products) => ({
    type: GOT_PRODUCTS,
    products
})

const createdProduct = (product) => ({
    type: CREATED_PRODUCT,
    product
})

export const updatedProduct = (product) => ({
    type: UPDATED_PRODUCT,
    product
})

const deletedProduct = (productId) => ({
    type: DELETED_PRODUCT,
    productId
})

const createdReview = (productId, review) => ({
    type: CREATED_REVIEW,
    productId,
    review
})

const updatedReview = (productId, review) => ({
    type: UPDATED_REVIEW,
    productId,
    review
})

const deletedReview = (productId, reviewId) => ({
    type: DELETED_REVIEW,
    productId,
    reviewId
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
        .then(res => dispatch(gotProducts(res.data)))
        .catch(ex => console.log(ex))
    }
}

export const addProduct = (product, categories) => {
    return (dispatch) => {
        axios.post('/api/products', product)
        .then(() => dispatch(fetchProducts()))
        // .then(res => dispatch(createdProduct(res.data)))
        .catch(ex => console.log(ex))
    }
}

export const deleteProduct = productId  => {
    return (dispatch) => {
        axios.delete(`/api/products/${productId}`)
        .then(() => dispatch(fetchProducts()))
        // .then(() => dispatch(deletedProduct(productId)))
        .catch(ex => console.log(ex))
    }
}

export const editProduct = (productId, updatedData)  => {
    return (dispatch) => {
        axios.put(`/api/products/${productId}`, updatedData)
        .then(() => dispatch(fetchProducts()))
        // .then(res => dispatch(updatedProduct(res.data)))
        .catch(ex => console.log(ex))
    }
}

export const createReview = (productId, review) => {
    return (dispatch) => {
        axios.post(`/api/products/${productId}/reviews`, review)
        .then(() => dispatch(fetchProducts()))
        // .then(res => dispatch(createdReview(productId, res.data))
        .catch(ex => console.log(ex))
    }
}

export const updateReview = (productId, reviewId, updatedReview) => {
    return (dispatch) => {
        axios.put(`api/products/${productId}/reviews/${reviewId}`, updatedReview)
        .then(() => dispatch(fetchProducts()))
        // .then(res => dispatch(updatedReview(productId, res.data)))
        .catch(ex => console.log(ex))
    }
}

export const deleteReview = (productId, reviewId) => {
    return (dispatch) => {
        axios.delete(`api/products/${productId}/reviews/${reviewId}`)
        .then(() => dispatch(fetchProducts()))
        // .then(() => dispatch(deletedReview(productId, reviewId)))
        .catch(ex => console.log(ex))
    }
}

// reducer
const productReducer = (state = initialState, action) => {
    switch(action.type){
        case GOT_PRODUCTS:
            return action.products

        case UPDATED_PRODUCT:
            const filteredState = state.filter(product => product.id !== action.product.id)
            return [...filteredState, action.product]

        case DELETED_PRODUCT:
            let newState = state.filter(product => product.id !== action.productId)
            return newState

        case CREATED_PRODUCT:
            return [...state, action.product]

        case CREATED_REVIEW:
            newState = state.map(product => {
                if (product.id === action.productId){
                    product.review.push(action.review)
                }
                return product
            })
            return newState
        case UPDATED_REVIEW:
            newState = state.map(product => {
                if (product.id === action.productId){
                    product.review.map(review => {
                        if (review.id === action.review.id){
                            review = action.review
                        }
                        return review
                    })
                }
                return product
            })
            return newState

        case DELETED_REVIEW:
            newState = state.map(product => {
                if (product.id === action.productId){
                    product.review.filter(review => review.id !== action.reviewId)
                }
                return product
            })
            return newState

        default:
            return state
    }
}



export default productReducer

