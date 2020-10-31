require('dotenv').config();
const server = require('./src/app.js');
const {conn} = require('./src/db.js');


const { backendPort } = process.env;


conn.sync({force: false}).then(() => {
	server.listen(backendPort, () => {
		console.log(`listening at ${backendPort}`);
	});
});
