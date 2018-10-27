import axios from 'axios'

//initial State
const initialState = [

]


//constants
const GOT_CATEGORIES = 'GOT CATEGORIES'


//action creators
export const gotCategories = (categories) => ({
    type: GOT_CATEGORIES,
    categories
})

//thunks
// 1. get categories
// 2. create category
// 3. update category
// 4. delete category

export const fetchCategories = () => {
    return (dispatch) => {
        axios.get(`/api/categories`)
        .then (res => dispatch(gotCategories(res.data)))
        .catch(ex => console.log(ex))
    }
}

export const createCategory = categoryName => {
    return (dispatch) => {
        axios.post('/api/categories', categoryName)
        .then(() => dispatch(fetchCategories()))
        .catch(ex => console.log(ex))
    }
}

export const updateCategory = (categoryId, updatedCategory) => {
    return (dispatch) => {
        axios.put(`/api/categories/${categoryId}`, updatedCategory)
        .then(() => dispatch(fetchCategories()))
        .catch(ex => console.log(ex))
    }
}

export const deleteCategory = categoryId => {
    return(dispatch) => {
        axios.delete(`api/categories/${categoryId}`)
        .then(() => dispatch(fetchCategories()))
        .catch(ex => console.log(ex))
    }
}

//reducer
const categoriesReducer = (state = initialState, action) => {
    switch(action.type){
        case GOT_CATEGORIES:
            return categories
        default:
            return state
    }
}


export default categoriesReducer