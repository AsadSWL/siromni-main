module.exports = {
	local: {
		client: "mysql2",
		connection: {
			host: "localhost",
			user: "root",
			password: "root123",
			database: "omni",
		}
	},
	development: {
		client: "mysql2",
		connection: {
			// host: "us-cdbr-east-06.cleardb.net",
			// user: "bf755aedec1c67",
			// password: "79e8e86d",
			// database: "heroku_113b5a65dbb982f",

			// host: "localhost",
			// user: "root",
			// password: "",
			// database: "omnitogether-social-media",

			host: process.env.DEV_DB_HOST,
			user: process.env.DEV_DB_USER,
			password: process.env.DEV_DB_PASSWORD,
			database: process.env.DEV_DB_NAME
		}
	},
	production: {
		client: "mysql2",
		connection: {
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME
		}
	}
}
