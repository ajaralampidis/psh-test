require('dotenv').config();
const server = require('./src/app.js');
const {conn} = require('./src/db.js');
const seed = require('./src/seed/seed.js')

const { backendPort } = process.env;


conn.sync({force: true})
	.then(() => {
		server.listen(backendPort, () => {
		console.log(`listening at ${backendPort}`);
		seed()
		require('./src/helpers/cron_job.js');
	});
});