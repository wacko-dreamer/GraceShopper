export const findLineItemByProductId = (order, product) => {
    let lineItem = {};
    if(order) lineItem = order.lineItems.find(lineItem => lineItem.productId === product.id);
    if(lineItem) return lineItem;
    else return {};
}

export const findFinishedOrders = (auth, orders) => (
    orders.filter(order => {
        if(auth.id) return order.status === 'COMPLETED' && order.customerId === auth.id;
        else return order.status === 'COMPLETED' && order.customer.isGuest === true;
    })
)

export const findOrder = (auth, orders, status) => (
    orders.find(order => {
        if(auth.id) return order.status === status && order.customerId === auth.id;
        else if(!order.customer) return true;
        else {
            if(order.status === status && order.customer) {
                return order.customer.isGuest;
            }
        }
    })
)

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