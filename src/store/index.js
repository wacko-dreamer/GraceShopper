import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from 'redux-logger'
import products from './productsReducer'
import orders from './ordersReducer'
import categories from './categoriesReducer'
import auth from './authReducer'

const reducer = combineReducers({
    products,
    orders,
    categories,
    auth
})

const store = createStore(
    reducer,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
)

export default store