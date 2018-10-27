import { combineReducers, createStore, applyMiddleware } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from 'redux-logger'
import products from './productsReducer'
import order from './orderReducer'

const reducer = combineReducers({
    products,
    order
})

const store = createStore(
    reducer,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
)

export default store