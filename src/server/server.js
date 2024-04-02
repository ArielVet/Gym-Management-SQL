const express = require("express");
const cors = require("cors");
const dbQueries = require("./database/dbQueries");

const app = express();

var corsOptions = {
	origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// root route
app.get("/", (req, res) => {
	res.json({ message: "Welcome to the application." });
});

// User route to get information about a user
app.post("/user", (req, res) => {
	dbQueries
		.getUser(req.body)
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			console.log(err);
		});
});

// Userids route to get userIDs
app.get("/userids", (req, res) => {
	dbQueries
		.getUserIDs()
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			console.log(err);
		});
});

// Insert_User route
app.post("/Insert_User", (req, res) => {
	// Data sent from the client side converted to SQL Query
	const data = req.body;

	// Query sent to the database and the result is sent back to the client side
	dbQueries
		.insertUser(data)
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			console.log(err);
		});
});

// Delete_User route
app.post("/Delete_User", (req, res) => {
	// Data sent from the client side converted to SQL Query
	const data = req.body;

	// Query sent to the database and the result is sent back to the client side
	dbQueries
		.deleteUser(data)
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			console.log(err);
		});
});

// Get_Log route
app.post("/Get_Log", (req, res) => {
	// Data sent from the client side converted to SQL Query
	const data = req.body;
	// Query sent to the database and the result is sent back to the client side
	dbQueries
		.getExerciseLog(data)
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			console.log(err);
		});
});

// Update Log route
app.post("/Update_Log", (req, res) => {
	// Data sent from the client side converted to SQL Query
	const data = req.body;
	// Query sent to the database and the result is sent back to the client side
	dbQueries
		.updateLog(data)
		.then((result) => {
			if (result.rowsAffected[0] == 0)
				result.message = "LogID does not exist";
			res.json(result);
		})
		.catch((err) => {
			res.send(
				JSON.stringify({
					rowsAffected: [0],
					message: err.originalError.info.message,
				})
			);
			console.log(err);
		});
});

// Get_Attributes route
app.post("/Get_Attributes", (req, res) => {
	// Data sent from the client side converted to SQL Query
	const data = req.body;
	dbQueries
		.get_Attributes(data)
		.then((result) => {
			res.json(Object.keys(result.recordset[0]));
		})
		.catch((err) => {
			console.log(err);
		});
});

// Select route
app.post("/Select", (req, res) => {
	// Data sent from the client side converted to SQL Query
	const data = req.body;
	dbQueries
		.select(data)
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			console.log(err);
		});
});

// Project route
app.post("/Project", (req, res) => {
	// Data sent from the client side converted to SQL Query
	const data = req.body;

	// Query sent to the database and the result is sent back to the client side
	dbQueries
		.project(data)
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			console.log(err);
		});
});

// Get MemberIDs route
app.get("/memberids", (req, res) => {
	dbQueries
		.getMemberIDs()
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			console.log(err);
		});
});

// Join route
app.post("/Join", (req, res) => {
	// Data sent from the client side converted to SQL Query
	const data = req.body;

	// Query sent to the database and the result is sent back to the client side
	dbQueries
		.join(data)
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			console.log(err);
		});
});

// Aggregation_GroupBy route
app.post("/Aggregation_GroupBy", (req, res) => {
	// Data sent from the client side converted to SQL Query
	const data = req.body;

	// Query sent to the database and the result is sent back to the client side
	dbQueries
		.aggregationGroupBy()
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			console.log(err);
		});
});

// Aggregation_Having route
app.post("/Aggregation_Having", (req, res) => {
	// Query sent to the database and the result is sent back to the client side
	dbQueries
		.aggregationHaving()
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			console.log(err);
		});
});

// Nested_Aggregation route
app.post("/Nested_Aggregation", (req, res) => {
	// Query sent to the database and the result is sent back to the client side
	dbQueries
		.nestedAggregation()
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			console.log(err);
		});
});

// Division route
app.post("/Division", (req, res) => {
	// Query sent to the database and the result is sent back to the client side
	dbQueries
		.division()
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			console.log(err);
		});
});

// Exercise Log Join route
app.post("/fitness", (req, res) => {
	// Data sent from the client side converted to SQL Query
	const data = req.body;
	dbQueries
		.fitnessJoin(data)
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			console.log(err);
		});
});

app.get("/logids", (req, res) => {
	dbQueries
		.getLogIDs()
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			console.log(err);
		});
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
