export const findLineItemById = (cart, product) => (
    cart.lineItems.find(lineItem => lineItem.productId === product.id)
)

export const findFinishedOrders = (auth, orders) => (
    orders.filter(order => {
        if(auth.id) return order.status === 'COMPLETED' && order.customerId === auth.id;
        //else return order.status === 'COMPLETED' && or                need to merge with cart so I can get "isGuest" property
    })
)