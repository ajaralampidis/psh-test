const express = require('express');
const axios = require('axios')
const router = express.Router();
const { Player, Match } = require('../db.js');
const matchFunction = require('../helpers/matchFunction.js')


router.get('/getById/:id', (req, res) => {
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

		return res.send(newMatch)

	} catch(error) {

		return res.status(500).send(error)
	
	}

})

router.post('/fakeMatch', async (req, res) => {
	const { winnerId, loserId } = req.body;
	try {	

		playerA = await Player.findByPk(winnerId)
		playerB = await Player.findByPk(loserId)

		const matchResults = matchFunction(playerA, playerB, true)

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

		return res.send(newMatch)

	} catch(error) {
		res.status(500).send(error)
	}
})


module.exports = router;