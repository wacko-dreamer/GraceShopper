import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from 'redux-logger'
import products from './productsReducer'
import order from './orderReducer'
import categories from './categoriesReducer'

const reducer = combineReducers({
    products,
    order,
    categories
})

const store = createStore(
    reducer,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
)

export default store

