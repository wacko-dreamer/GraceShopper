import axios from 'axios'

// initial state
 const initialState = [

 ]

//constants
const GOT_ORDERS = 'GOT ORDERS'
const UPDATED_ORDER = 'UPDATED_ORDER'
const CREATED_LINEITEM = 'CREATED_LINEITEM'
const UPDATED_LINEITEM = 'UPDATED_LINEITEM'
const DELETED_LINEITEM = 'DELETED_LINEITEM'

//action creators

const gotOrders = (orders) => ({
    type: GOT_ORDERS,
    orders
})

const updatedOrder = (order) => ({
    type: UPDATED_ORDER,
    order
})

const createdLineItem = (orderId, lineItem) => ({
    type: CREATED_LINEITEM,
    orderId,
    lineItem
})

const updatedLineItem = (orderId, lineItem) => ({
    type: UPDATED_LINEITEM,
    orderId,
    lineItem
})

const deletedLineItem  = (orderId, lineItem) => ({
    type: DELETED__LINEITEM,
    orderId,
    lineItem
}) 

//thunks
// 1. fetch orders
// 2. update order
// 3. create line item
// 4. update line item
// 5. delete line item


export const fetchOrders = (cart, isGuest) => {
    let userId = null;
    if(cart) userId = cart.customerId;
    if(!isGuest) isGuest = null;
    console.log(userId, cart)
    return (dispatch) => {
        axios.get(`api/orders/users/${userId}/${isGuest}`)
        .then(res => {
            dispatch(gotOrders(res.data))
        })
        .catch(ex => console.log(ex))
    }
}

export const updateOrder = (order, status, history) => {
    let userId;
    order = { ...order, status };
    return (dispatch) => {
        axios.put(`api/users/${userId}/orders/${order.id}`, order)
            .then(() => {
                if(status === 'CREATED') history.push('/user/:userId/checkout');
                if(status === 'COMPLETED') history.push('/user/:userId/orders/:orderId');
            })
            .then(() => dispatch(fetchOrders()))
            // .then(res => dispatch(updatedOrder(res.data)))
            .catch(ex => console.log(ex))
    }
}

export const createLineItem = (order, product) => {
    let userId = null;
    return (dispatch) => {
        axios.post(`/api/users/${userId}/orders/${order.id}/lineItems`, product)
        .then(() => dispatch(fetchOrders()))
        // .then(res => dispatch(createdLineItem(orderId,res.data)))
        .catch(ex => console.log(ex))
    }
}

export const updateLineItem = (order, lineItem, _quantity, change) => {
    let userId;
    lineItem = { ...lineItem, quantity: _quantity + change };
    return (dispatch) =>{
        axios.put(`api/users/${userId}/orders/${order.id}/lineItems/${lineItem.id}`, lineItem)
        .then(() => dispatch(fetchOrders()))
        // .then(res => dispatch(updatedLineItem(orderId,res.data)))
        .catch(ex => console.log(ex))
    }
}

export const deleteLineItem = (order, lineItem) => {
    let userId;
    return (dispatch) => {
        axios.delete(`api/users/${userId}/orders/${order.id}/lineItems/${lineItem.id}`)
        .then(() => dispatch(fetchOrders()))
        //.then(() => dispatch(fetchOrders()))
        // .then(() => dispatch(deletedLineItem(orderId,lineItemId)))
        .catch(ex => console.log(ex))
    }
}


// reducer


const orderReducer = (state = initialState, action) => {
    switch(action.type){
        case GOT_ORDERS:
             return action.orders

        case UPDATED_ORDER:
            const filteredState = state.filter(order => order.id !== action.order.id)
            return [...filteredState, action.order]

        case CREATED_LINEITEM:
            let newState = state.map(order => {
                if(order.id == action.orderId){
                    order.lineItem.push(action.lineItem)
                }
                return order
            })
            return newState

        case UPDATED_LINEITEM:
            newState = state.map(order => {
                if(order.id == action.orderId){
                    order.lineItem.map(lineItem => {
                        if(lineItem.id === action.lineItem.id){
                            lineItem = action.lineItem
                        }
                        return lineItem
                    })
                }
                return order
            })
            return newState

        case DELETED_LINEITEM:
            newState = state.map(order => {
                if(order.id == action.orderId){
                    order.lineItem.filter(lineItem => lineItem.id !== action.lineItemId)
                }
                return order
            })
            return newState

        default:
            return state
    }
}



export default orderReducer

