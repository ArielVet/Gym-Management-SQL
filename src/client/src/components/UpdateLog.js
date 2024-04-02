import React, { useEffect } from "react";
import { useState } from "react";
import Divider from "./shared/Divider";
import FormElement from "./shared/FormElement";

function UpdateLog() {
	const [logID, setLogID] = useState("");
	const [heartRate, setHeartRate] = useState("");
	const [duration, setDuration] = useState("");
	const [calories, setCalories] = useState("");
	const [date, setDate] = useState(null);

	const [errorMessage, setErrorMessage] = useState(null);
	const [updateMessage, setUpdateMessage] = useState(null);
	const [loaded, setLoaded] = useState(false);
	const [logIdList, setLogIdList] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!logID) {
			setErrorMessage("LogID is required");
			return;
		}
		if (!heartRate && !duration && !calories && !date) {
			setErrorMessage("At least one field must be filled");
			return;
		}

		// send data to server
		fetch("http://localhost:8080/Update_Log", {
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
				// changes update message to display success or displays error
				setUpdateMessage(
					data.rowsAffected[0]
						? "Succesfully Updated LogID " + logID
						: data.message
				);
			});
	};

	const handleFindData = () => {
		// fetch original data from server
		setErrorMessage(null);
		if (!logID) {
			setErrorMessage("LogID is required");
			return;
		}
		fetch("http://localhost:8080/Get_Log", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				logID,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.recordset.length == 0) {
					setErrorMessage("LogID does not exist");
					return;
				}
				setHeartRate(data.recordset[0].HeartRate);
				setDuration(
					data.recordset[0].duration.split("T")[1].split("Z")[0]
				);
				setCalories(data.recordset[0].calories);
				var fetchedDate = new Date(data.recordset[0].Date);
				setDate(fetchedDate.toISOString().split("T")[0]);
				setLoaded(true);
			});
	};

	useEffect(() => {
		// Get the LogIDs
		fetch("http://localhost:8080/logids")
			.then((res) => res.json())
			.then((data) => {
				let arr = [];
				data.recordset.forEach((element) => {
					arr.push(element.LogID);
				});
				setLogIdList(arr);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div className="select-body-measurement">
			<form
				className="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
				onSubmit={handleSubmit}
			>
				<h1 className="text-2xl">Update Exercise Log</h1>
				<Divider />

				<div className="my-2 space-y-2 flex flex-col">
					<label>
						Log ID{" "}
						<span className="text-red-500 font-semibold italic">
							*required
						</span>
					</label>
					<select
						className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						onChange={(event) => setLogID(event.target.value)}
					>
						<option value="">Choose an option</option>
						{logIdList.map((option, index) => (
							<option key={index} value={option}>
								{option}
							</option>
						))}
					</select>
				</div>
				<button
					className="mt-6 w-1/4 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full"
					type="button"
					onClick={handleFindData}
				>
					Find Log 🔍
				</button>

				{loaded && (
					<>
						<FormElement
							label="Heart Rate"
							type="text"
							name="heartRate"
							value={heartRate}
							onChange={setHeartRate}
						/>

						<FormElement
							label="Duration (hh:mm:ss)"
							type="text"
							name="duration"
							value={duration}
							onChange={setDuration}
						/>

						<FormElement
							label="Calories"
							type="text"
							name="calories"
							value={calories}
							onChange={setCalories}
						/>

						<FormElement
							label="Date"
							type="date"
							name="date"
							value={date}
							onChange={setDate}
						/>
						<button
							className="mt-6 w-1/4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
							type="submit"
						>
							Update Log
						</button>
					</>
				)}

				{/* If any error has been made display the error message */}
				{errorMessage ? (
					<p className="text-red-500 font-bold">{errorMessage}</p>
				) : null}
				{/* If any update has been attempted display the update message */}
				{updateMessage ? (
					<p className="text-green-600 italic">{updateMessage}</p>
				) : null}
			</form>
		</div>
	);
}

export default UpdateLog;
