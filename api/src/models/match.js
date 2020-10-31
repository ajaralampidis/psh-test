const {DataTypes} = require('sequelize');

module.exports = sequelize => {
	sequelize.define('match',
	{
		// winnerId: FK (player)

		winner_prev_score: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				isInt: true,
			}
		},

		winner_new_score: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				isInt: true,
			}
		},

		// loserId: FK (player)

		loser_prev_score: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				isInt: true,
			}
		},

		loser_new_score: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				isInt: true,
			}
		}

	},{
		timestamps: true,
		updatedAt: false,
	});
};
