import axios from 'axios'


//constants
const GOT_CATEGORIES = 'GOT CATEGORIES'
const CREATED_CATEGORY = 'CREATED_CATEGORY'
const UPDATED_CATEGORY = 'UPDATED_CATEGORY'
const DELETED_CATEGORY = 'DELETED_CATEGORY'


//action creators
const gotCategories = (categories) => ({
    type: GOT_CATEGORIES,
    categories
})

const createdCategory = (category) => ({
    type: CREATED_CATEGORY,
    category
})

const updatedCategory = (category) => ({
    type: UPDATED_CATEGORY,
    category
})

const deletedCategory = (categoryId) => ({
    type: DELETED_CATEGORY,
    categoryId
})

//thunks
// 1. get categories
// 2. create category
// 3. update category
// 4. delete category

export const fetchCategories = () => {
    return (dispatch) => (
        axios.get(`/api/categories`)
        .then (res => dispatch(gotCategories(res.data)))
        .catch(ex => console.log(ex))
    )
}

export const createCategory = categoryName => {
    return (dispatch) => (
        axios.post('/api/categories', categoryName)
            .then(() => dispatch(fetchCategories()))
            // .then(res => dispatch(createdCategory(res.data)))
            .catch(ex => console.log(ex))
    )
}

export const updateCategory = (categoryId, updatedCategory) => {
    return (dispatch) => (
        axios.put(`/api/categories/${categoryId}`, updatedCategory)
            .then(() => dispatch(fetchCategories()))
            // .then(res => dispatch(updatedCategory(res.data)))
            .catch(ex => console.log(ex))
    )
}

export const deleteCategory = categoryId => {
    return(dispatch) => (
        axios.delete(`api/categories/${categoryId}`)
            .then(() => dispatch(fetchCategories()))
            // .then(() => dispatch(deletedCategory(categoryId)))
            .catch(ex => console.log(ex))
    )
}

//reducer
const categoriesReducer = (state = [], action) => {
    switch(action.type){
        case GOT_CATEGORIES:
            return action.categories

        case UPDATED_CATEGORY:
            let newState = state.filter(category => category.id !== action.category.id)
            return [...newState, action.category] 

        case CREATED_CATEGORY:
            return [...state, action.category]

        case DELETED_CATEGORY:
            newState = state.filter(category => category.id !== action.categoryId)
            return newState
            
        default:
            return state
    }
}


export default categoriesReducer