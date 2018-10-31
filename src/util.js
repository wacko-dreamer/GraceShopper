export const findLineItemById = (cart, product) => (
    cart.lineItems.find(lineItem => lineItem.productId === product.id)
)