const express = require('express');
const axios = require('axios')
const router = express.Router();
const { Player } = require('../db.js');


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