const conn = require('./conn');
const { Product, LineItem, Order, User, Category } = require('./models.js');


const syncAndSeed = () => {
  //product variables
  let plant, seed, soil, bottle
  //order variables
  let cart, guestOrder, authOrder;
  //category variables
  let gardening, grocery;
  //line item variables
  let plantLI, seedLI, soilLI, bottleLI, guestPlantLI, guestSeedLI;
  //user variables
  let authUser, adminUser;
  //review variables
  let seedReview, bottleReview;

  return conn.sync({ force : true })
    .then(() => Promise.all([
      //create products
      Product.create({ name : 'Bonsai Tree', description : 'Bonsai is popularized by Japanese people as an art of growing ornamental, dwarf trees. Bonsai Plants is assumed to have the same life cycle of the normal size trees. Growing and taking care of Bonsai’s is one way to relieve stress and will develop as a good hobby. Can be a décor to your home or office. In feng shui, bonsai trees is believe to bring a good luck.', price : 12.69, quantity : 10 }),
      Product.create({ name : 'Heirloom Tomato Seeds', description : '8 individual packets, with each packet having a minimum of 30 seeds', price : 9.97, quantity : 10 }),
      Product.create({ name : 'Fresh Indoor Soil Mix', description : 'Blended for a wide variety of plants. Feeds up to 6 months.', price : 25.99, quantity : 10 }),
      Product.create({ name : 'Spray Bottle', description : 'Great for plants, cats, and everything in between.', price : 2.99, quantity : 10 })
    ]))
    .then((products) => {
      [ plant, seed, soil, bottle ] = products;
      //create categories
      return Promise.all([
        Category.create({ name : 'Gardening' }),
        Category.create({ name : 'Grocery Items'})
      ]);
    })
    .then((categories) => {
      [ gardening, grocery ] = categories;
      //create order
      return Promise.all([
        Order.create({ status : 'CART' }),
        Order.create({ status : 'ORDER', shippingAddress : '5 Hanover Sq, New York, NY 10004', total : 47.85 }),
        Order.create({ status : 'ORDER', shippingAddress : '123 abc ave, def, GH 56789', total : 30.00 })
      ]);
    })
    .then((orders) => {
      [ cart, AuthOrder, guestOrder ] = orders;
      //create line items
      return Promise.all([
        LineItem.create({ quantity : 2, price : 12.69 }),
        LineItem.create({ quantity : 3, price : 9.97 }),
        LineItem.create({ quantity : 5, price : 25.99 }),
        LineItem.create({ quantity : 6, price : 2.99 }),
        LineItem.create({ quantity : 1, price : 12.69 }),
        LineItem.create({ quantity : 1, price : 9.97 })
      ]);
    })
    .then((lineItems) => {
      [ plantLI, seedLI, soilLI, bottleLI, guestPlantLI, guestSeedLI ] = lineItems;

      //create users
      return Promise.all([
        User.create({ name : 'Sample AuthUser', username : 'sampleAuthUser@gmail.com', password : 'abc123', isAdmin : false, address: ['5 Hanover Sq, New York, NY 10004', 'abc 123st, You, ME 01234'] }),
        User.create({ name : 'Sample Admin', username : 'sampleAdmin@gmail.com', password : 'abc123', isAdmin : true })
      ]);
    })
    .then((users) => {
      [ authUser, adminUser ] = users;
      //connect line items to an order
      //connect line items to a product
      return Promise.all([
        plantLI.setOrder(cart),
        plantLI.setProduct(plant),
        seedLI.setOrder(order),
        seedLI.setProduct(seed),
        soilLI.setOrder(cart),
        soilLI.setProduct(soil),
        bottleLI.setOrder(order),
        bottleLI.setProduct(bottle)
      ]);
    })
};

module.exports = { syncAndSeed };
