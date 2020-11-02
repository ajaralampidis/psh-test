const express = require('express');
const player = require('./player.js');
const match = require('./match.js')
const ranking = require('./ranking.js')


const app = express();

app.use('/player', player);
app.use('/match', match);
app.use('/ranking', ranking);


app.get('/', (req, res) => {
	res.send('Ok');
});




module.exports = app;
