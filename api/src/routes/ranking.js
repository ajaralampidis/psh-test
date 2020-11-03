const express = require('express');
const axios = require('axios')
const router = express.Router();
const { Player, Match } = require('../db.js');
const { conn } = require('../db.js')


router.get('/allTimeTop', (req, res) => {
		
	conn.query(
	`
	SELECT *
	FROM( 
		SELECT DISTINCT ON ("winnerId")
		t1.*, t2.nickname, t2.profile_img, score
		FROM 
			matches as t1
		INNER JOIN players as t2 ON "winnerId" = t2.id
		ORDER BY "winnerId", winner_new_score DESC
		LIMIT 10
	) as ordered
	ORDER BY winner_new_score DESC;
	`, 
	{ model: Match })

	.then(function(result){
		
		res.send(result)
		
	})
	.catch(error => {
		res.status(500).send(error)
	})

})

router.get('/currentTopTen', async (req, res) => {

	try {
		const topPlayers = await Player.findAll({
			order: [
				['score', 'DESC']
			],
			limit: 10 
		})

		res.send(topPlayers)

	} catch(error) {
		res.status(500).send(error)
	}

})

module.exports = router