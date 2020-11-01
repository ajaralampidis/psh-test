const {DataTypes} = require('sequelize');

module.exports = sequelize => {
	// defino el modelo
	sequelize.define('player',
	{
		nickname: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
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
			validate: {
				points(value) {
					if (value < 0 || value > 100) throw new Error('Score must be a value between 0 and 100');
				}
			}
		}

	},{
		timestamps: true,
		updatedAt: false
		
	});
};
