export const findLineItemById = (cart, product) => (
    cart.lineItems.find(lineItem => lineItem.productId === product.id)
)

export const findFinishedOrders = (auth, orders) => (
    orders.filter(order => {
        if(auth.id) return order.status === 'COMPLETED' && order.customerId === auth.id;
        else return order.status === 'COMPLETED' && order.customer.isGuest === true;
    })
)

export const findOrder = (auth, orders, status) => (
    orders.find(order => {
        if(auth.id) return order.status === status && order.customerId === auth.id;
        else return order.status === status && order.customer.isGuest === true;
    })
)

export const findOrders = (auth, orders, status) => (
    orders.map(order => {
        if(auth.id) return order.status === status && order.customerId === auth.id;
        else return order.status === status && order.customer.isGuest === true;
    })
)