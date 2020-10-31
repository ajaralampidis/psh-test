const express = require('express');
const player = require('./player.js');

const app = express();




app.use('/player', player);


app.get('/', (req, res) => {
	res.send('Estas en index');
});




module.exports = app;
