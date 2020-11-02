const express = require('express');
const axios = require('axios')
const router = express.Router();
const { Player, Match } = require('../db.js');
const { conn } = require('../db.js')


router.get('/allTimeTopTen', (req, res) => {
		
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


// 3, 8, 9, 1, 10, 5, 7, 4 ,2
// [
//     {
//         "id": 4,
//         "winner_prev_score": 25,
//         "winner_new_score": 37,
//         "loser_prev_score": 32,
//         "loser_new_score": 20,
//         "createdAt": "2020-11-02T05:58:02.793Z",
//         "winnerId": 3,
//         "loserId": 1
//     },
//     {
//         "id": 10,
//         "winner_prev_score": 20,
//         "winner_new_score": 35,
//         "loser_prev_score": 30,
//         "loser_new_score": 15,
//         "createdAt": "2020-11-02T05:58:19.850Z",
//         "winnerId": 8,
//         "loserId": 7
//     },
//     {
//         "id": 12,
//         "winner_prev_score": 15,
//         "winner_new_score": 35,
//         "loser_prev_score": 30,
//         "loser_new_score": 10,
//         "createdAt": "2020-11-02T05:58:25.857Z",
//         "winnerId": 9,
//         "loserId": 10
//     },
//     {
//         "id": 3,
//         "winner_prev_score": 31,
//         "winner_new_score": 32,
//         "loser_prev_score": 24,
//         "loser_new_score": 23,
//         "createdAt": "2020-11-02T05:57:59.958Z",
//         "winnerId": 1,
//         "loserId": 2
//     },
//     {
//         "id": 11,
//         "winner_prev_score": 20,
//         "winner_new_score": 30,
//         "loser_prev_score": 25,
//         "loser_new_score": 15,
//         "createdAt": "2020-11-02T05:58:24.310Z",
//         "winnerId": 10,
//         "loserId": 9
//     },
//     {
//         "id": 8,
//         "winner_prev_score": 22,
//         "winner_new_score": 30,
//         "loser_prev_score": 25,
//         "loser_new_score": 17,
//         "createdAt": "2020-11-02T05:58:13.987Z",
//         "winnerId": 5,
//         "loserId": 6
//     },
//     {
//         "id": 9,
//         "winner_prev_score": 25,
//         "winner_new_score": 30,
//         "loser_prev_score": 25,
//         "loser_new_score": 20,
//         "createdAt": "2020-11-02T05:58:18.424Z",
//         "winnerId": 7,
//         "loserId": 8
//     },
//     {
//         "id": 7,
//         "winner_prev_score": 26,
//         "winner_new_score": 29,
//         "loser_prev_score": 25,
//         "loser_new_score": 22,
//         "createdAt": "2020-11-02T05:58:10.913Z",
//         "winnerId": 4,
//         "loserId": 5
//     },
//     {
//         "id": 5,
//         "winner_prev_score": 23,
//         "winner_new_score": 25,
//         "loser_prev_score": 20,
//         "loser_new_score": 18,
//         "createdAt": "2020-11-02T05:58:05.323Z",
//         "winnerId": 2,
//         "loserId": 3
//     }
// ]