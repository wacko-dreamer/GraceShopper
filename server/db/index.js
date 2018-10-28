const conn = require('./conn');
const { Product, LineItem, Order, User, Category, Review } = require('./models.js');

const syncAndSeed = () => {
  //product variables
  let plant, seed, soil, bottle
  //order variables
  let cart, testCart, guestOrder, authOrder;
  //category variables
  let gardening, household;
  //line item variables
  let plantLI, seedLI, soilLI, bottleLI, guestPlantLI, guestSeedLI, adminTestLI, adminTestLI2;
  //user variables
  let authUser, adminUser, guestUser;
  //review variables
  let seedReview, bottleReview;

  return conn.sync({ force : true })
    .then(() => Promise.all([
      //create products
      Product.create({ name : 'Bonsai Tree', description : 'Bonsai is popularized by Japanese people as an art of growing ornamental, dwarf trees.', price : 12.69, quantity : 10, imageUrl: 'https://bit.ly/2qggU12' }),
      Product.create({ name : 'Heirloom Tomato Seeds', description : '8 individual packets, with each packet having a minimum of 30 seeds', price : 9.97, quantity : 10, imageUrl: 'https://bit.ly/2PsIfet' }),
      Product.create({ name : 'Fresh Indoor Soil Mix', description : 'Blended for a wide variety of plants. Feeds up to 6 months.', price : 25.99, quantity : 10, imageUrl: 'https://bit.ly/2D6Lqmh' }),
      Product.create({ name : 'Spray Bottle', description : 'Great for plants, cats, and everything in between.', price : 2.99, quantity : 10, imageUrl: 'https://bit.ly/2qhlFHn' })
    ]))
    .then((products) => {
      [ plant, seed, soil, bottle ] = products;
      //create categories
      return Promise.all([
        Category.create({ name : 'Gardening' }),
        Category.create({ name : 'Household Items'})
      ]);
    })
    .then((categories) => {
      [ gardening, household ] = categories;
      //create order
      return Promise.all([
        Order.create({ status : 'CART' }),
        Order.create({ status : 'CART' }),
        Order.create({ status : 'COMPLETED', shippingAddress : '5 Hanover Sq, New York, NY 10004', total : 47.85 }),
        Order.create({ status : 'PROCESSING', shippingAddress : '123 abc ave, def, GH 56789', total : 30.00 })
      ]);
    })
    .then((orders) => {
      [ cart, testCart, authOrder, guestOrder ] = orders;
      //create line items
      return Promise.all([
        LineItem.create({ quantity : 2, price : 12.69 }),
        LineItem.create({ quantity : 3, price : 9.97 }),
        LineItem.create({ quantity : 5, price : 25.99 }),
        LineItem.create({ quantity : 6, price : 2.99 }),
        LineItem.create({ quantity : 1, price : 12.69 }),
        LineItem.create({ quantity : 1, price : 9.97 }),
        LineItem.create({ quantity : 1, price : 10.68 }),
        LineItem.create({ quantity : 2, price : 4.56 })
      ]);
    })
    .then((lineItems) => {
      [ plantLI, seedLI, soilLI, bottleLI, guestPlantLI, guestSeedLI, adminTestLI, adminTestLI2 ] = lineItems;

      //create users
      return Promise.all([
        User.create({ name : 'Sample AuthUser', username : 'sampleAuthUser@gmail.com', password : 'a', isAdmin : false, address: ['5 Hanover Sq, New York, NY 10004', 'abc 123st, You, ME 01234'] }),
        User.create({ name : 'Sample Admin', username : 'sampleAdmin@gmail.com', password : 'abc123', isAdmin : true }),
        User.create({ name : 'Sample Guest', username : 'sampleGuest@email.com', password : 'na', isAdmin : false })
      ]);
    })
    .then((users) => {
      [ authUser, adminUser, guestUser ] = users;
      //create reviews
      return Promise.all([
        Review.create({ title : 'Best seeds ever!', rating : 5, description : 'With these seeds I was able to grow the most freshest tomatos of all time. 10/10' }),
        Review.create({ title : 'Great multi-purpose spray bottle', rating : 5, description : 'This spray bottle is so versatile. I water my plants all the time with it and when my cat gets annoying, I give him a small spritz!' })
      ]);
    })
    .then((reviews) => {
      [ seedReview, bottleReview ] = reviews;
      return Promise.all([
        //connect line items to an order
        //connect line items to a product
        plantLI.setOrder(cart),
        plantLI.setProduct(plant),
        seedLI.setOrder(authOrder),
        seedLI.setProduct(seed),
        soilLI.setOrder(cart),
        soilLI.setProduct(soil),
        bottleLI.setOrder(authOrder),
        bottleLI.setProduct(bottle),
        guestPlantLI.setOrder(guestOrder),
        guestPlantLI.setProduct(plant),
        guestSeedLI.setOrder(guestOrder),
        guestSeedLI.setProduct(seed),
        adminTestLI.setOrder(testCart),
        adminTestLI.setProduct(plant),
        adminTestLI2.setOrder(testCart),
        adminTestLI2.setProduct(seed)
      ]);
    })
    .then(() => {
      return Promise.all([
        //connect orders to users
        authOrder.setCustomer(authUser),
        testCart.setCustomer(authUser),
        guestOrder.setCustomer(guestUser),
        //connect reviews to products
        //connect reviews to users
        seed.setReviews(seedReview),
        seedReview.setUser(authUser),
        bottle.setReviews(bottleReview),
        bottleReview.setUser(authUser),
        //connect product to categories
        plant.addCategory(gardening),
        seed.addCategory(gardening),
        soil.addCategory(gardening),
        bottle.addCategory(household)
      ]);
    })
};

module.exports = { syncAndSeed };
