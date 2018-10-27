const express = require('express');
const app = express();
const path = require('path');
const jwt = require('jwt-simple');


app.use(require('body-parser').json());
app.use('/public', express.static(path.join(__dirname, '../public')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));


app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send({ error: err.message });
})


<<<<<<< HEAD
module.exports = app;
=======
module.exports = app;
>>>>>>> a7e4cd0db15c16bd8608e4e5fd94d16c38c71fa0
