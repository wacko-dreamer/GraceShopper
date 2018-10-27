import axios from 'axios'
import { puts } from 'util';

// initial state
 const initialState = [

 ]

//constants
const GOT_ORDERS = 'GOT ORDERS'

//action creators

export const gotOrders = (orders) => ({
    type: GOT_ORDERS,
    orders
})

//thunks
// 1. fetch orders
// 2. create order
// 3. create line item
// 4. update line item
// 5. delete line item
// 6. create order

export const fetchOrders = () => {
    return (dispatch) => {
        axios.get('api/orders')
        .then(res => {
            dispatch(gotOrders(res.data))
        })
        .catch(ex => console.log(ex))
    }
}

export const createOrder = (orderId, status) => {
    return (dispatch) => {
        axios.put(`api/oders/${orderId}`, {status: status})
        .then(() => dispatch(fetchOrders()))
        .catch(ex => console.log(ex))
    }
}

export const createLineItem = (orderId, lineItem) => {
    return (dispatch) => {
        axios.post(`/api/orders/${orderId}/lineItems`, lineItem)
        .then(() => dispatch(fetchOrders()))
    }
}

export const updateLineItem = (orderId, lineItemId, quantity) => {
    return (dispatch) =>{
        axios.put(`api/orders/${orderId}/lineItems/${lineItemId}`, quantity)
        .then(() => dispatch(fetchOrders()))
        .catch(ex => console.log(ex))
    }
}



// reducer


const orderReducer = (state = initialState, action) => {
    switch(action.type){
        case GOT_ORDERS:
             return orders
        default:
            return state
    }
}



export default orderReducer

