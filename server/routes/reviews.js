const router = require('express').Router();
const { Review } = require('../db/models');


router.get('/', (req, res, next) => {
    Review.findAll()
        .then(reviews => res.send(reviews))
        .catch(next)
})

router.get('/:id', (req, res, next) => {
    Review.findById(req.params.id)
        .then(review => res.send(review))
        .catch(next)
})

router.post('/', (req, res, next) => {
    Review.create(req.body)
        .then(review => res.send(review))
        .catch(next)
})

router.put('/:id', (req, res, next) => {
    Review.findById(req.params.id)
        .then(review => review.update(req.body))
        .then(review => res.send(review))
        .catch(next)
})

router.delete('/:id', (req, res, next) => {
    Review.destroy({ where: { id: req.params.id }})
        .then(() => res.sendStatus(204))
        .catch(next)
})


module.exports = router;