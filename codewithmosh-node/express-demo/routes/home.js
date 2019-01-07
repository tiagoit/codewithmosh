const express = require('express');
const home = express.Router();

home.get('/', (req, res) => {
    //    res.send('Hello World');
    res.render('index', { title: 'Hello World', message: 'My express App'});
});

module.exports = home;