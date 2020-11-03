const cron = require('node-cron');
const axios = require('axios');
const matchFunction = require('./matchFunction.js');
const { Player, Match } = require('../db.js');


cron.schedule('*/5 * * * *', async function cronSimulation() {
	console.log("Cron Job Iteration")
	try {

		// =====================( Player Creation )==================== //

		const playersRequests = []

		for (let i = 0; i < 3; i++) {
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
		
		await Player.bulkCreate(chunkOfPlayers)

	// =================( Random Matches Creation )==================== //

		const registeredPlayers = await Player.findAll();

		for (let i = 0; i < 30; i++) {
			try {
				let randomPicker = () => Math.floor(Math.random() * 10)

				let A = randomPicker()
				let B = randomPicker()

				if (A === B) {
					A === 10 ? A = 9 : A = A + 1
				}

				const playerA = registeredPlayers[A]	
				const playerB = registeredPlayers[B]

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

		console.log('Cron Job Finished Succesfully')
	} catch (error) {
		cronSimulation()
	}
})


cron.schedule('*/2 * * * *', async () => {
	console.log("Score Reduce Iteration")
	try {
	
		const registeredPlayers = await Player.findAll();
	
		registeredPlayers.forEach(player => {
			if (player.score > 1) {
				player.score = player.score - 1;
			} else {
				player.score = 0
			}
			player.save();
		})

		console.log('Score Reduce Finished Succesfully')
	
	} catch(error) {
		console.log('===============================================')
		console.log('Score Reduce Error:')
		console.log(error)
		console.log('===============================================')
	}
})



module.exports = cron