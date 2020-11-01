const express = require('express');
const player = require('./player.js');
const match = require('./match.js')
const top_players = require('./top_players.js')

const app = express();

app.use('/match', match)
app.use('/player', player);
app.use('/top_players', top_players);

app.get('/', (req, res) => {
	res.send('Ok');
});




module.exports = app;
