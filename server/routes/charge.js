const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");
const router = require('express').Router();

router.post("/", async (req, res) => {
  console.log(req.body)

    try {
      let {status} = await stripe.charges.create({
        amount: req.body.amount,
        currency: "usd",
        description: "An example charge",
        source: req.body.token
      });
      console.log(status)
      res.send(status);
    } catch (err) {
      res.status(500).end();
    }
  });
  
module.exports = router;