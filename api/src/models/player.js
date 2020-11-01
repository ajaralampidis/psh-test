const {DataTypes} = require('sequelize');

module.exports = sequelize => {
	// defino el modelo
	sequelize.define('player',
	{
		nickname: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isString(value) {
					if (typeof value !== 'string') throw new Error('Name must be a string!');
				}
			}
		},

		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isString(value) {
					if (typeof value !== 'string') throw new Error('Password must be a string!');
				}
			}
		},

		profile_img: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isUrl: true,
			}
		},

		score: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 25,
		}

	},{
		timestamps: true,
		updatedAt: false
		
	});
};
