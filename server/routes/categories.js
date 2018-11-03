const router = require('express').Router();
const { Category, Product } = require('../db/models');


router.get('/', (req, res, next) => {
    Category.findAll({ include : [ Product ] })
        .then(categories => res.send(categories))
        .catch(next)
})

router.get('/:id', (req, res, next) => {
    Category.findById(req.params.id)
        .then(category => res.send(category))
        .catch(next)
})

router.post('/', (req, res, next) => {
    Category.create(req.body)
        .then(category => category.addProducts(req.body.products))
        .then(category => res.send(category))
        .catch(next)
})

router.put('/:id', (req, res, next) => {
    Category.findById(req.params.id)
        .then(category => category.update(req.body))
        .then(category => category.setProducts(req.body.products))
        .then(category => res.send(category))
        .catch(next)
})

router.delete('/:id', (req, res, next) => {
    Category.destroy({ where: { id: req.params.id }})
        .then(() => res.sendStatus(204))
        .catch(next)
})


module.exports = router;
