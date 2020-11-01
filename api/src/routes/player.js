const express = require('express');
const axios = require('axios')
const router = express.Router();
const { Player } = require('../db.js');


router.get('/:id', (req, res) => {

	const {id} = req.params;

	Player.findByPk(id).then(user => {
		if (!user) res.status(404).send('Player not found :(');
		res.send(user);
	});

})

router.post('/register', (req, res) => {

	const {nickname, password, profile_img} = req.body;

	if (!nickname || !password || !profile_img) {
		return res.status(400).send('Parameteres are missing');
	}

	Player.create(req.body)
		.then(response => {
			return res.status(201).send(response);
		})
		.catch(error => {
			return res.status(500).send(error);
		});

})


router.put('/:id', async (req, res) => {
	const {id} = req.params;
	const {nickname, password, profile_img} = req.body;

	try {
	
		let player = await Player.findByPk(id)

		if (nickname) {
			player.nickname = nickname
		}

		if (password) {
			player.password = password
		}

		if (profile_img) {
			player.profile_img = profile_img
		}

		await player.save();
		await player.reload();

		return res.send(player);

	} catch (error) {
		return res.status(500).send(error);
	}

})


router.delete('/:id', async (req, res) => {
	const {id} = req.params;
	const player = await Player.findByPk(id)

	if (!player) {
		return res.status(404).send('Player not found')
	}

	try {
		await player.destroy()
	} catch(error) {
		return res.status(500).send(error)
	} finally {
		return res.send('deleted')
	}

})

router.put('/:id/score', async (req, res) => {
	const {id} = req.params;
	const {newScore} = req.body;

	if (!newScore || typeof newScore !== 'number') {
		return res.status(400).send('New Score not sended or incorrect format')
	}

	const player = await Player.findByPk(id);

	if (!player) {
		return res.status(404).send('Player not found')
	}
	
	try {
		player.score = newScore

		await player.save();
		await player.reload();

		return res.send(player);

	} catch(error) {
		res.status(500).send(error);
	}



})


router.get('/prueba', (req, res) => {
	res.send('hola')
});

router.get('/axios', (req, res) => {
	axios.get('https://randomuser.me/api')
	.then(response => {
		res.json(response.data)
	})
	.catch(error => {
		res.status(500).send(error)
	})
});



module.exports = router;