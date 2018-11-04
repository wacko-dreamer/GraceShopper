import React, { Fragment } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

export const findLineItemByProductId = (order, product) => {
    let lineItem = {};
    if(order.lineItem) lineItem = order.lineItems.find(lineItem => lineItem.productId === product.id);
    if(lineItem) return lineItem;
    else return {};
}

export const findFinishedOrders = (auth, orders) => (
    orders.filter(order => {
        if(auth.id) return order.status === 'COMPLETED' && order.customerId === auth.id;
        else return order.status === 'COMPLETED' && order.customer.isGuest === true;
    })
)

export const findOrder = (auth, orders, status, userId, orderId) => {
    const order = orders.find(order => {
        if(order.id === orderId) return true; 
        else if(auth.id) return order.status === status && order.customerId === auth.id;
        else if(order.status === status && order.customerId === userId ) return true;
        else {
            if(order.status === status && order.customer) {
                return order.customer.isGuest;
            }
        }
    })
    if(order) return order;
    else return {};
}

export const findOrders = (auth, orders, status) => (
    orders.filter(order => {
        if(auth.id) return order.status === status && order.customerId === auth.id;
        else {
            if(order.status === status && order.customer) {
                return order.customer.isGuest;
            }
        }
    })
)

export const findProduct = (products, productId) => {
    const product = products.find(_product => _product.id == productId);
    if(product) return product;
    else return {};
}

export const findLiQuantityByCartOrder = (cartOrder) => {
    let liQuantity = 0;
    if(cartOrder) {
        const lineItems = cartOrder.lineItems;
        if(lineItems) liQuantity = lineItems.reduce((acc, curVal) => acc + curVal.quantity, 0);
    }
    return liQuantity;
}

export const findUserId = (auth, cartOrder) => {
    if(auth.id) return auth.id;
    else if(cartOrder.id) return cartOrder.customerId; 
}

export const findOrderTotal = order => {
    let total = 0
    if (order.lineItems) {
        total = order.lineItems.reduce((accum, lineItem) => accum + lineItem.quantity * lineItem.price, 0);
    }
    total = Math.round(total * 100) / 100
    return total;
}

export const mapOrders = orders => orders.map(order => mapListItems(order));

export const mapListItems = order => {
    const total = findOrderTotal(order);
        return(
            <ListGroup key={ order.id }>
                <Fragment><strong>ORDER ID:</strong> { order.id }</Fragment><br/>
                <Fragment><strong>Ordered on:</strong> 
                    { order.updatedAt.slice(0, 10) }  <strong>at</strong>  { order.updatedAt.slice(11, 16) }
                </Fragment><br/>
                <Fragment><strong>Shipping Address:</strong> { order.shippingAddress }</Fragment><br/>
            {   
                order.lineItems.map((lineItem, idx) => (
                    <ListGroupItem key={ lineItem.id }>
                        <div>
                            <strong>{ idx + 1 }</strong>
                            <br/>
                            { lineItem.product.name } 
                            <br/>
                            <strong>Quantity: </strong> 
                            { lineItem.quantity }
                            <br/>
                            <strong>Description: </strong>
                            { lineItem.product.description }
                            <div style={{ float: 'right' }}>
                                <strong>Price: </strong> 
                                ${ lineItem.price }
                            </div>
                            <img src={ lineItem.product.imageUrl } style={{ float: 'right' }}/>
                        </div>
                    </ListGroupItem>
                ))
            }
                <Fragment><strong>Total: ${total}</strong></Fragment>
                <br/><br/>
            </ListGroup>
    )
}

export const findLineItems = order => {
    let lineItems = [];
    if(order.id) lineItems = order.lineItems.sort((a, b) => a.id - b.id);
    return lineItems;
}

export const filterProductsByCategory = (categoryId, products) => {
    if (categoryId){
        return products.filter( product => {
            if (product.categories.find(category => category.id === categoryId*1)){
                return true
            }
        }).sort((a, b) => a.id - b.id)
    }
    else return products;
}