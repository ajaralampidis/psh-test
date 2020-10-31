require('dotenv').config();
const {Sequelize} = require('sequelize');
const fs = require('fs');
const path = require('path');
// ======================== End Imports ======================= //


// ==================== Enviroment Variables ==================== //
const {
	DB_USER,
	DB_PASSWORD,
	DB_HOST,
	DB_NAME
} = process.env;


// ======================= Sequelize Init ====================== //
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
	logging: false, // set to console.log to see the raw SQL queries
	native: false,// lets Sequelize know we can use pg-native for ~30% more speed
	define: { timestamps: false }
});


// ======================= Model Import and Init ======================= //
const basename = path.basename(__filename);

const modelDefiners = [];

// Read files from model folder, pushed into modelDefiners Array
fs
	.readdirSync(path.join(__dirname, '/models'))
	.filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
	.forEach(file => {
		modelDefiners.push(require(path.join(__dirname, '/models', file)));
	});

// Injecting models into sequelize
modelDefiners.forEach(model => model(sequelize));
// Model Capitalization. Eg: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map(entry => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);


// ======================= Sequelize Model Relations ======================= //
const { Match, Player, Top_player } = sequelize.models;

Player.hasMany(Match, { as: 'winner', foreignKey : 'winnerId' }); // foreign key in target model (Match)
Match.belongsTo(Player, {as: 'winner', foreignKey : 'winnerId'});

Player.hasMany(Match, { as: 'loser', foreignKey : 'loserId' }); // foreign key in target model (Match)
Match.belongsTo(Player, {as: 'loser', foreignKey : 'loserId'});

Player.hasMany(Top_player); // foreign key in target model (Top_player)
Top_player.belongsTo(Player);


// =============================== Exports ================================= //

module.exports = {
	...sequelize.models, // This allows models to be required. Eg: const { ModelName } = require('./db.js');
	conn: sequelize // This allows connection to be exported { conn } = require('./db.js');
};