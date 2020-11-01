const express = require('express');
const player = require('./player.js');
const match = require('./match.js')

const app = express();

app.use('/match', match)
app.use('/player', player);


app.get('/', (req, res) => {
	res.send('Ok');
});




module.exports = app;
