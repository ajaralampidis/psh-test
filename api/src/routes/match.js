const express = require('express');
const axios = require('axios')
const router = express.Router();
const { Player, Match } = require('../db.js');
const matchFunction = require('../helpers/matchFunction.js')


router.get('/:id', (req, res) => {
	const {id} = req.params;

	Match.findByPk(id).then(match => {
		if (!match) res.status(404).send('Player not found :(');
		res.send(match);
	});

})

router.post('/newMatch', async (req, res) => {

	let {playerA, playerB} = req.body;

	if (!playerA || typeof playerA !== 'number') {
		return res.status(400).send('PlayerA is not a number or is missing');
	}

	if (!playerB || typeof playerB !== 'number') {
		return res.status(400).send('PlayerB is not a number or is missing');
	}


	try {

		playerA = await Player.findByPk(playerA)
		playerB = await Player.findByPk(playerB)

		const matchResults = matchFunction(playerA, playerB)
		

		if ( playerA.id = matchResults.winnerId ) {
			playerA.score = matchResults.winner_new_score
			playerB.score = matchResults.loser_new_score
		} else {
			playerA.score = matchResults.loser_new_score
			playerB.score = matchResults.winner_new_score
		}

		await playerA.save();
		await playerB.save();
		const newMatch = await Match.create(matchResults)

		return res.send(matchResults)

	} catch(error) {

		return res.status(500).send(error)
	
	}

})


module.exports = router;