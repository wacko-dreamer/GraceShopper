const conn = require('./conn.js');

const Product = conn.define('product', {
  name: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: conn.Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: conn.Sequelize.DECIMAL(10,2),
    allowNull: false
  },
  quantity: {
    type: conn.Sequelize.INTEGER,
    allowNull: false
  },
  imageUrl: {
    type: conn.Sequelize.STRING,
    defaultValue: "https://www.theshelbygroup.com/wp-content/uploads/2018/03/280x240-placeholder.png"
  }
});

const Category = conn.define('category', {
  name: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate : {
      notEmpty: true
    }
  }
})

const Order = conn.define('order', {
  id: {
    type: conn.Sequelize.UUID,
    defaultValue: conn.Sequelize.UUIDV4,
    primaryKey: true
  },
  status: {
    type: conn.Sequelize.ENUM('CART', 'CREATED', 'PROCESSING', 'CANCELLED', 'COMPLETED'),
    allowNull: false,
    defaultValue: 'CART'
  },
  shippingAddress: {
    type: conn.Sequelize.TEXT,
    validate: {
      notEmpty: true
    }
  },
  total: {
    type: conn.Sequelize.DECIMAL(10,2),
    validate: {
      isDecimal: true
    }
  }
});

const LineItem = conn.define('line_item', {
  quantity: {
    type: conn.Sequelize.INTEGER,
    defaultValue : 1
  },
  price: {
    type: conn.Sequelize.DECIMAL(10,2),
    allowNull: false,
    validate: {
      isDecimal: true
    }
  }
});

const User = conn.define('user', {
  id: {
    type: conn.Sequelize.UUID,
    defaultValue: conn.Sequelize.UUIDV4,
    primaryKey: true
  },
  name: {
    type: conn.Sequelize.STRING,
    allowNull: false
  },
  username: {
    type: conn.Sequelize.STRING(80),
    /* allowNull: false,            // guest does not need username to add to cart
    unique: true,
    validate: {
      isEmail: true
    } */
  },
  password: {
    type: conn.Sequelize.STRING,
    /* allowNull: false,            // guest does not need password to add to cart
    validate: {
      notEmpty: true
    } */
  },
  isAdmin: {
    type: conn.Sequelize.BOOLEAN,
    defaultValue: false
  },
  isGuest: {
    type: conn.Sequelize.BOOLEAN,
    defaultValue: false
  },
  address: {
    type: conn.Sequelize.ARRAY(conn.Sequelize.TEXT),
    validate: {
      notEmpty: true
    }
  }
});

const Review = conn.define('review', {
  title: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  rating: {
    type: conn.Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  },
  description: {
    type: conn.Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

//associations
LineItem.belongsTo(Order);
Order.hasMany(LineItem);

LineItem.belongsTo(Product);
Product.hasMany(LineItem); //in case someone wants to do a quick search to calculate the quantity of orders
Order.belongsTo(User, { as: 'customer' });
User.hasMany(Order);

Review.belongsTo(Product);
Product.hasMany(Review);

Review.belongsTo(User);
User.hasMany(Review);

Category.belongsToMany(Product, { through : 'ProductCategories' });
Product.belongsToMany(Category, { through : 'ProductCategories' });

module.exports = {
  conn,
  Product,
  LineItem,
  Order,
  User,
  Category,
  Review
}

