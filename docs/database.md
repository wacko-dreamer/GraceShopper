Database folders: All database files can be found under /server/db.
conn.js - Initializes Sequelize and defines a new Sequelize model
models.js - Defines the models we are using for this project, along with their associations
index.js - Defines the syncAndSeed function. The syncAndSeed function is called in the /server/index.js file.

-- I personally like to have my models and associations in one file, but let me know if you want me to break it out.

Models:
Product - Where each item for sale is stored. Has columns for name, description, price, quantity, and imageUrl

Category - Each product will be assigned to a category(s), so I created a separate model for them and created a belongToMany association. The category table itself only has a name field.

Order - Where each order is tracked. Has columns for id, status, shippingAddress, and total.
- I included shippingAddress since the user may use a different address than the one in their account. - There should probably be some logic that adds a new address to a user's account if the order being placed is from a signed in user.
- The status can be 1 of 5 options - CART, CREATED, PROCESSING, CANCELLED, COMPLETED.
- Total will need to be calculated in a thunk by adding up all the line items that will make up an order.

LineItem - How each item being purchased within an order is tracked. Has columns for quantity and price. We track price separately here so that we honor the price at the point of sale.

User - User is a bit tricky, since we'll have three types of users - Unauthenticated (guest), authenticated, and admin users. The fields are name, username, password, isAdmin, and address. Address is setup to accept an array of addresses, in case a user has multiple addresses in their account.

Review - Users can leave reviews for a product. The fields are title, rating, and description.

-- I thought about creating a separate Address model that we can associate to Users so that we can properly track addresses. Currently, addresses are accepted in a text format which can lead to errors since we'll need to combine the user's address info into one string (probably in a thunk) once the user submits the order. The address model could have fields for each piece of information, such as line 1, line 2, city, state, zipcode. This provides a cleaner breakout and easier querying in the long run. Let me know what you guys think.

Associations:
The associations can be seen in the db/models.js file. The only special things to note are:
1. Orders belong to Users as customer - Figured it would look nicer if we identified clients as customers and not users in our DB.
2. Category and Product share a belongsToMany association and the join table is ProductCategories.
