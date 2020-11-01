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


/*
{
	"results":[{
		"gender":"female",
		"name":{
			"title":"Mrs",
			"first":"Isabelle",
			"last":"Roberts"
		},
		"location":{
			"street":{
				"number":9831,
				"name":"Cameron Road"
			},
			"city":"Greymouth",
			"state":"Southland",
			"country":"New Zealand",
			"postcode":90271,
			"coordinates":{
				"latitude":"58.4384",
				"longitude":"99.1287"
			},
			"timezone":{
				"offset":"-9:00",
				"description":"Alaska"
			}
		},
		"email":"isabelle.roberts@example.com",
		"login":{
			"uuid":"7982f13a-ec43-44d7-bc5a-e4599c11e591",
			"username":"redwolf353",
			"password":"enterprise",
			"salt":"WqppYDSW",
			"md5":"3e3f7c8031ecd2d11ee159658d1ac531",
			"sha1":"f2938652120b416ab258ae2d972c52b4f23ffa75",
			"sha256":"e2dba0112fa60aad75e4015dba5d44f6098e59e1491d2f99e9a9d3ecd896678d"
		},
		"dob":{
			"date":"1962-01-02T00:53:11.072Z",
			"age":58
		},
		"registered":{
			"date":"2012-10-15T12:03:17.304Z",
			"age":8
		},
		"phone":"(700)-936-0776",
		"cell":"(225)-591-0957",
		"id":{
			"name":"",
			"value":null
		},
		"picture":{
			"large":"https://randomuser.me/api/portraits/women/58.jpg",
			"medium":"https://randomuser.me/api/portraits/med/women/58.jpg",
			"thumbnail":"https://randomuser.me/api/portraits/thumb/women/58.jpg"
		},
		"nat":"NZ"
	}],
	"info":{
		"seed":"6a16f73d9b59b594",
		"results":1,
		"page":1,
		"version":"1.3"
	}
}
*/