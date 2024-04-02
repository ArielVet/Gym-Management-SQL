const config = require("./dbConfig");
var sql = require("mssql");

// Query Code adapted from a SQL SetUp Tutorial https://youtu.be/Uh2JCSUjA_E
const makeQuery = async (query) => {
	try {
		let pool = await sql.connect(config);
		let result = await pool.request().query(query);
		return result;
	} catch (error) {
		throw error;
	}
};

module.exports = { makeQuery };
