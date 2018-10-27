const PORT = process.env.PORT || 3000;
<<<<<<< HEAD


require('./app').listen(PORT, () => console.log(`


    Listening on PORT ${PORT}!
    http://localhost:${PORT}/


`))
=======
const { syncAndSeed } = require('./db');

require('./app').listen(PORT, () => console.log(`
  Listening on PORT ${PORT}!
  http://localhost:${PORT}/
`));

syncAndSeed()
  .then(() => console.log('Database is synced!'))


>>>>>>> a7e4cd0db15c16bd8608e4e5fd94d16c38c71fa0
