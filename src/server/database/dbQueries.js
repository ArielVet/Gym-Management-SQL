/* 
 * This file contains all the queries that are used in the application
*/


const Database = require("../config/dbOperation");

const getUser = (data) => {
	const userID = data.userID;
	const query = `SELECT * FROM Users WHERE UserID = ${userID};`;
	return Database.makeQuery(query);
};

const getMemberIDs = () => {
	const query = `SELECT UserID FROM Member;`;
	return Database.makeQuery(query);
};

const insertUser = (data) => {
	const query =
		`INSERT INTO Users VALUES ('${data.date_of_birth}','${data.gender}','${data.name}', ` +
		`${data.userID},'${data.phone}','${data.email}');`;
	return Database.makeQuery(query);
};

const deleteUser = (data) => {
	const query = `DELETE FROM Users WHERE UserID = ${data.userID};`;
	return Database.makeQuery(query);
};

const getExerciseLog = (data) => {
	const query =
		`SELECT HeartRate, duration, CaloriesBurnt as calories, Date ` +
		` FROM exercise_writes_logs ` +
		` WHERE LogID = ${data.logID}; `;
	return Database.makeQuery(query);
};

const updateLog = (data) => {
	const query =
		`UPDATE Exercise_Writes_Logs SET ` +
		`HeartRate = ${data.heartRate}, ` +
		`Duration = '${data.duration}', ` +
		`CaloriesBurnt = ${data.calories}, ` +
		`Date = '${data.date}' ` +
		`WHERE LogID = ${data.logID};`;
	return Database.makeQuery(query);
};

const get_Attributes = (data) => {
	const query = `SELECT * FROM ${data.table};`;
	return Database.makeQuery(query);
};

const select = (data) => {
	// Hardcoded table that has al the attributes that are numbers
	const attributesNumber = [
		"UserID",
		"Salary",
		"AchievementID",
		"BMI",
		"BodyFat",
		"Height",
		"Weight",
		"GoalID",
		"TargetCalories",
		"Reps",
		"Sets",
		"HeartRate",
		"CaloriesBurnt",
		"GroupID",
	];
	const tableName = data.table;

	// Filter is the WHERE clause of the query
	let filter = "";
	for (let i = 0; i < data.formColumns.length; i++) {
		// Only add if the the attribute is there
		if (data.formColumns[i] != "") {
			// Add a WHERE if it is the first attribute and AND if it is not
			filter += i == 0 ? "WHERE " : " AND ";

			// If the attribute is a number, do not add quotes
			// If the equality is LIKE, add % to the value
			// Else, add quotes
			if (attributesNumber.includes(data.formColumns[i])) {
				filter += `${data.formColumns[i]} ${data.formEqualities[i]} ${data.formValues[i]}`;
			} else if (data.formEqualities[i] == "LIKE") {
				filter += `${data.formColumns[i]} ${data.formEqualities[i]} '%${data.formValues[i]}%'`;
			} else {
				filter += `${data.formColumns[i]} ${data.formEqualities[i]} '${data.formValues[i]}'`;
			}
		}
	}

	// Final Query
	const query = `SELECT * FROM ${tableName} ${filter};`;
	return Database.makeQuery(query);
};

const project = (data) => {
	const attributes = data.form.filter((elem) => elem != "").join(", ");
	const query = `SELECT ${attributes} FROM Users;`;
	return Database.makeQuery(query);
};

const getUserIDs = () => {
	const query = `SELECT UserID FROM Users ORDER BY UserID;`;
	return Database.makeQuery(query);
};

const join = (data) => {
	const query =
		`SELECT U.UserID, U.Name, U.Gender, U.Phone_Number AS Phone_Number, U.Email_Address AS Email, ` +
		`B.BMI, B.BodyFat, B.Height, B.Weight, MT.GymPlan  ` +
		`FROM Users U, BodyMeasurement_Records B, Member MT  ` +
		`WHERE U.UserID = B.UserID ` +
		`AND MT.UserID = U.UserID ` +
		`AND U.UserID = ${data.userID} ;`;
	return Database.makeQuery(query);
};

const aggregationGroupBy = () => {
	const query =
		`SELECT LogID, HeartRate, Duration, Date, MAX(CaloriesBurnt) AS CaloriesBurnt ` +
		`FROM Exercise_Writes_Logs ` +
		`GROUP BY Date, LogID, HeartRate, Duration`;
	return Database.makeQuery(query);
};

const aggregationHaving = () => {
	const query =
		`SELECT LogID, HeartRate, Duration, Date, MAX(CaloriesBurnt) AS CaloriesBurnt ` +
		`FROM Exercise_Writes_Logs ` +
		`GROUP BY Date, LogID, HeartRate, Duration ` +
		`HAVING HeartRate < 140`;
	return Database.makeQuery(query);
};

const nestedAggregation = () => {
	const query =
		`SELECT COUNT(DISTINCT U1.UserID) AS Count, U1.Gender ` +
		`FROM Users U1, BodyMeasurement_Records B1 ` +
		`WHERE U1.UserID = B1.UserID ` +
		`AND EXISTS (` +
		`SELECT AVG(B2.BodyFat) AS BodyFat, U2.Gender ` +
		`FROM Users U2, BodyMeasurement_Records B2 ` +
		`WHERE U2.UserID = B2.UserID ` +
		`AND U1.Gender = U2.Gender ` +
		`GROUP BY U2.Gender ` +
		`HAVING AVG(B2.BodyFat) > B1.BodyFat) ` +
		`GROUP BY U1.Gender;`;
	return Database.makeQuery(query);
};

const division = () => {
	const query =
		`SELECT DISTINCT M.UserID, U.Name, U.Email_Address ` +
		`FROM Member M, Users U ` +
		`WHERE M.UserID = U.UserID ` +
		`AND NOT EXISTS ( ` +
		`SELECT GroupID ` +
		`FROM Fitnessgroup_name F ` +
		`EXCEPT ` +
		`SELECT M2.GroupID ` +
		`FROM MemberBelongsToGroup M2 ` +
		`WHERE M2.UserID = M.UserID ` +
		`);`;
	return Database.makeQuery(query);
};

const fitnessJoin = (data) => {
	const query =
		`SELECT UserID, WH.Name AS 'Exercise Name', WH.WorkoutID, Difficulty, WCE.ExerciseID, LogID, Reps, Sets, Weight ` +
		`HeartRate, CaloriesBurnt, Date, Duration, GoalID  ` +
		`FROM Workout_Has WH,  ` +
		`MemberDoesWorkout M,  ` +
		`WorkoutConsistsExercise WCE,  ` +
		`Exercise_Writes_Logs E ` +
		`WHERE M.WorkoutID = WH.WorkoutID ` +
		`AND M.WorkoutID = WCE.WorkoutID ` +
		`AND WCE.ExerciseID = E.ExerciseID ` +
		`AND M.UserID = ${data.userID}; `;
	return Database.makeQuery(query);
};

const getLogIDs = () => {
	const query = `SELECT LogID FROM Exercise_Writes_logs;`;
	return Database.makeQuery(query);
};

module.exports = {
	insertUser,
	deleteUser,
	getExerciseLog,
	updateLog,
	select,
	project,
	getUser,
	getUserIDs,
	getMemberIDs,
	join,
	aggregationGroupBy,
	aggregationHaving,
	nestedAggregation,
	division,
	fitnessJoin,
	get_Attributes,
	getLogIDs,
};
