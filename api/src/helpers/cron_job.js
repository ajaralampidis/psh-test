const cron = require('node-cron');
const { Player, Match, Top_player } = require('../db.js');


cron.schedule('*/5 * * * *', () => {
	// Player.findAll({
	// 	order: [
	// 		[sequelize.fn('max', sequelize.col('age')), 'DESC']
	// 	],
	// 	limit: 10 
	// })



})

module.exports = cron