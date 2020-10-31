require('dotenv').config();
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
// ======================== End Imports ======================= //

// ==================== Enviroment Variables ==================== //
const {
	serverName,
	frontName 
} = process.env;


// ========================= Express setup ========================== //
const server = express();
server.name = `${serverName}`;


// ========================== CORS setup ========================== //
var corsOptions = {
  origin: `${frontName}`,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  methods: "GET, PUT, POST, DELETE"
}
server.use(cors(corsOptions))


// ======================== Body-Parser setup ====================== //
server.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
server.use(bodyParser.json({limit: '50mb'}));

// ========================== Morgan setup ========================= //
server.use(morgan('dev'));

// ============================= Routes ============================ //
server.use('/', routes);


// Error catching endware.
server.use((err, req, res, next) => {

	const status = err.status || 500;
	const message = err.message || err;
	console.error(err);
	res.status(status).send(message);

});

module.exports = server;