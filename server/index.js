const PORT = process.env.PORT || 5000;
const { syncAndSeed } = require('./db');


require('./app').listen(PORT, () => console.log(`


    Listening on PORT ${PORT}!
    http://localhost:${PORT}/


`))

syncAndSeed();