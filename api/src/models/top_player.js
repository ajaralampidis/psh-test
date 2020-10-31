const {DataTypes} = require('sequelize');

module.exports = sequelize => {
	sequelize.define('top_player',
	{
		// top_playerId: FK (player)

		score_record: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isString(value) {
					if (typeof value !== 'string') throw new Error('Name must be a string!');
				}
			}
		}

	},{
		timestamps: true 
	});
};
