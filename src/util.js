export const findFinishedOrders = orders => (
    orders.filter(order => order.status === 'ORDER')
)
