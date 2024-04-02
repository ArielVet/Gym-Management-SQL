import React from "react";
import { useState, useEffect } from "react";
import Divider from "./shared/Divider";
import Table from "./shared/Table";

function Select() {

	// Constants
	const tableNames = [
		'Users',
		'Member',
		'Trainer',
		'General_Employee',
		'Achievement_Desc',
		'Achievement_Name',
		'Achieves',
		'BodyMeasurement_Records',
		'WorkoutGoal',
		'Workout_Has',
		'MemberDoesWorkout',
		'Exercise_Writes_Logs',
		'WorkoutConsistsExercise',
		'FitnessGroup_Desc',
		'FitnessGroup_Name',
		'Trains',
		'MemberBelongsToGroup'
	];
	const equalities = [ "=", "<", ">", "<=", ">=", "<>","LIKE" ]; 
	const numOfAttributes = 3;

	// Values Sent to Server
	const [table, setTable] = useState("");
	const [attributes, setAttributes] = useState([]);
	const [formColumns, setFormColumns] = useState(Array(numOfAttributes).fill(""));
	const [formValues, setFormValues] = useState(Array(numOfAttributes).fill(""));
	const [formEqualities, setFormEqualities] = useState(Array(numOfAttributes).fill(""));

	// Data For Table
	const [fetchedData, setFetchedData] = useState(null);
	const [tableHeaders, setTableHeaders] = useState([]);

	// When Table selection happens, it gets attributes from server
	const getAttributes = (table) => {
		fetch("http://localhost:8080/Get_Attributes", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ table }),
		})
			.then((res) => res.json())
			.then((data) => {
				setAttributes(data);
			})
			.catch((err) => console.log(err));
	}

	// Updates the array that has attributes
	const updateFormColumns = (index, value) => {
		const newArray = [...formColumns];
		newArray[index] = value;
		setFormColumns(newArray);
	};

	// Updates the array that selects equalities
	const updateFormEqualities = (index, value) => {
		const newArray = [...formEqualities];
		newArray[index] = value;
		setFormEqualities(newArray);
	}
	
	const updateFormValues = (index, value) => {
		const newArray = [...formValues];
		newArray[index] = value;
		setFormValues(newArray);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// send data to server
		fetch("http://localhost:8080/Select", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ table, formColumns, formEqualities, formValues }),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.rowsAffected.length > 0 && data.rowsAffected[0] > 0) {
					let arr = [];
					setTableHeaders(Object.keys(data.recordset[0]));
					data.recordset.forEach((row) => {
						arr.push(Object.values(row));
					});
					setFetchedData(arr);
				}
				else{
					setFetchedData(null);
				}
			})
			.catch((err) => console.log(err));
	};
	return (
		<div className="select-body-measurement">
			<form
				onSubmit={handleSubmit}
				className="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
			>
				<h1 className="text-2xl">Select Body Measurement</h1>
				<Divider />

				{/* Choose Table */}
				<div className="flex flex-col m-2">
					<label>Choose Table:</label>

					<select
						className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						name={"table"}
						value={table}
						onChange={(event) => {
							setTable(event.target.value);
							getAttributes(event.target.value);
						}}
					>

						{/* Base Option */}
						<option value="">Choose an option</option>

						{/* Map all table names to options */}
						{tableNames.map((tableName) => (
							<option key={tableName} value={tableName}>{tableName}</option>
						))}
					</select>
				</div>

				<Divider />

				{/* Create numOfAttributes amount of dropdowns */}
				{Array(numOfAttributes)
					.fill()
					.map((value, i) => (
						<div key={i} className="flex flex-col m-2">
							{/* Column Label that is indexed by i+1 */}
							<label>Choose Filter {(i + 1).toString()}:</label>

							{/* Dropdown Menu (i+1) that upon selection updates the form[i] with selection */}
							<select
								className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								name={"col" + (i + 1).toString() + "dropdown"}
								value={formColumns[i]}
								onChange={(event) =>
									updateFormColumns(i, event.target.value)
								}
							>
								{/* Base Option */}
								<option value="">Choose an option</option>

								{/* Take the array of attributes and only keep an option that is currently selected by dropdown OR isnt selected by any dropdown
								 * As a result you filter out the options are are already selected by another dropdown
								 * The new array maps its elements to dropdown options*/}
								{attributes.length > 0 && attributes
									.map((attribute) => (
										<option
											key={attribute}
											value={attribute}
										>
											{attribute.split("_").join(" ")}
										</option>
									))}
							</select>

							{/* Dropdown Menu (i+1) for equalities */}
							<select
								className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								name={"col" + (i + 1).toString() + "equalities"}
								value={formEqualities[i]} 
								onChange={(event) =>
									updateFormEqualities(i, event.target.value)
								}
							>
								{/* Base Option */}
								<option value="">Choose an Equality</option>

								{/* Take the array of attributes and only keep an option that is currently selected by dropdown OR isnt selected by any dropdown
								 * As a result you filter out the options are are already selected by another dropdown
								 * The new array maps its elements to dropdown options*/}
								{equalities
									.map(equality => (
										<option
											key={equality}
											value={equality}
										>{equality}
										</option>
									))}
							</select>			

							<input
								className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								type="text"
								name={"col" + (i + 1).toString() + "value"}
								value={formValues[i]}
								onChange={e => updateFormValues(i, e.target.value)}
							/>
						</div>
					))}

				{/* Table */}
				{fetchedData ?
				(
					<Table
						headers={tableHeaders}
						rows={Object.values(fetchedData)}
					/>
				) :(
					<p>No Values Found</p>
				)}

				<button
					className="mt-6 w-1/4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
					type="submit"
				>
					Find Body Measurement
				</button>
			</form>
		</div>
	);
}

export default Select;
