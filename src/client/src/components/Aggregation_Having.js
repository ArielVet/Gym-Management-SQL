import React from "react";
import { useState } from "react";
import Divider from "./shared/Divider";
import Table from "./shared/Table";

function Aggregation_Having() {
	const [logID, setLogID] = useState("");
	const [heartRate, setHeartRate] = useState("");
	const [duration, setDuration] = useState("");
	const [calories, setCalories] = useState("");
	const [date, setDate] = useState("");

	const [tableHeaders, setTableHeaders] = useState([]);
	const [fetchedData, setFetchedData] = useState(null);

	const handleSubmit = (e) => {
		e.preventDefault();

		// send data to server
		fetch("http://localhost:8080/Aggregation_Having", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				logID,
				heartRate,
				duration,
				calories,
				date,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.rowsAffected.length > 0) {
					let arr = [];
					setTableHeaders(Object.keys(data.recordset[0]));
					data.recordset.forEach((row) => {
						arr.push(Object.values(row));
					});
					setFetchedData(arr);
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="aggregation-having">
			<form
				className="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
				onSubmit={handleSubmit}
			>
				<h1 className="text-2xl"> Aggregation with HAVING </h1>
				<h1 className="text-ll">
					Get Log with Max Calories Burned, Grouped By Date, Having
					HeartRate &lt; 140
				</h1>
				
				<Divider />

				{fetchedData && (
					<Table
						headers={tableHeaders}
						rows={Object.values(fetchedData)}
					/>
				)}

				<button
					className="mt-6 w-1/4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
					type="submit"
				>
					Get Data
				</button>
			</form>
		</div>
	);
}

export default Aggregation_Having;
