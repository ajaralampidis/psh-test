const {DataTypes} = require('sequelize');

module.exports = sequelize => {
	sequelize.define('top_player',
	{
		// top_playerId: FK (player)

		score_record: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				points(value) {
					if (value < 0 || value > 100) throw new Error('Score must be a value between 0 and 100');
				}
			}
		}

	},{
		timestamps: true 
	});
};
