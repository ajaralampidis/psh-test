const axios = require('axios')
const { Player } = require('../db.js');
const { Match } = require('../db.js');
const { Top_player } = require('../db.js');

module.exports = async function seed() {

	try {

		const playersRequests = []

		for (let i = 0; i < 10; i++) {
			playersRequests.push(axios.get('https://randomuser.me/api'))
		}

		const rawChunkOfPlayers = await Promise.all(playersRequests);
		const chunkOfPlayers = []

		for (let i = 0; i < rawChunkOfPlayers.length; i++) {
			let player = {
				nickname: rawChunkOfPlayers[i].data.results[0].login.username,
				password: rawChunkOfPlayers[i].data.results[0].login.password,
				profile_img: rawChunkOfPlayers[i].data.results[0].picture.medium
			}

			chunkOfPlayers.push(player)
		}
		
		const createdPlayers = await Player.bulkCreate(chunkOfPlayers)
		// console.log(createdPlayers)
		// createdPlayers = [instanceOfPlayerModel, ...]

	} catch (error) {
		console.log(error)
	}

}