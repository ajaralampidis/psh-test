const axios = require('axios')
const { Player } = require('../db.js');
const { Match } = require('../db.js');
const matchFunction = require('../helpers/matchFunction.js')

module.exports = async function seed() {
	console.log("seed Iteration")
	try {

		// =====================( Player Creation )==================== //

		const playersRequests = []

		for (let i = 0; i < 10; i++) {
			try {
				playersRequests.push(await axios.get('https://randomuser.me/api'))
			} catch (error) {
				i--
			}
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

	// =================( Random Matches Creation )==================== //
		for (let i = 0; i < 30; i++) {
			try {
				let randomPicker = () => Math.floor(Math.random() * 10)

				let A = randomPicker()
				let B = randomPicker()

				if (A === B) {
					A === 10 ? A = 9 : A = A + 1
				}

				const playerA = createdPlayers[A]	
				const playerB = createdPlayers[B]

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

			} catch (error) {
				console.log(error)
				i--
			}
		}	

		console.log('end of seed')
	} catch (error) {
		seed()
	}
}