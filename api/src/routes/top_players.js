const express = require('express');
const axios = require('axios')
const router = express.Router();
const { Top_player, Player } = require('../db.js');


router.post('/createRank', async (req, res) => {

	try {
		
		const rawTopPlayers = await Player.findAll({
			order: [
			['score', 'DESC']
			],
			limit: 10 
		})

		const topPlayers = rawTopPlayers.map(player => {
			return {playerId: player.id, score_record: player.score}
		});

		console.log(topPlayers)

		const newTopPlayers = await Top_player.bulkCreate(topPlayers)

		console.log(newTopPlayers)

		res.send(newTopPlayers)

	} catch (error) {
		res.status(500).send(error) 
	}

});


module.exports = router;