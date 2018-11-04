const router = require('express').Router();
const { Order, LineItem, Product, User } = require('../db/models');
const conn = require('../db/conn');


//get all orders
router.get('/users/:userId/:isGuest', async (req, res, next) => {
    let cart;
    try {
        let orders;
        if(req.params.isGuest === 'true' && req.params.userId !== 'null') {
            orders = await Order.findAll({ include: [ { model: User, as: 'customer', where: { isGuest: true } } ] });
            cart = orders.find(order => order.dataValues.status === 'CART');
            if(!cart) {
                let guest = await User.create({ name: 'guest', isGuest: true });
                cart = await Order.create({ status: 'CART' });
                cart.setCustomer(guest);
            }
        }
        else if(req.params.isGuest === 'false' && req.params.userId !== 'null') {
            orders = await Order.findAll({ where: { customerId: req.params.userId } });
            cart = orders.find(order => order.dataValues.status === 'CART');
            if(!cart) {
                cart = await Order.create({ status: 'CART' });
                user = await User.findById(req.params.userId);
                cart.setCustomer(user);
            }
        }
        orders = await Order.findAll({
            include: [ { model: LineItem, include: [
                { model: Product }
            ]}, { model: User, as: 'customer' } ],
            order: [['createdAt', 'DESC']]
        })
        res.send(orders);
    }
    catch(ex) {
        next(ex)
    }
})

//reset orders
router.put('/orders/:id', (req, res, next) => {
 Order.findById(req.params.id)
 .then(order => order.update(req.body))
 .then(order => res.send(order))
 .catch(next)
});


module.exports = router;
