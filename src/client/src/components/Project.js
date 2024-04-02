import React from "react";
import { useState, useEffect } from "react";
import Divider from "./shared/Divider";
import Table from "./shared/Table";

function Project() {
	const size = 5;
	const columnOptions = [
		"Date_of_Birth",
		"Gender",
		"Name",
		"UserID",
		"Phone_Number",
		"Email_Address",
	];

	// Data Sent to Server
	const [form, setForm] = useState(Array(size).fill(""));
	const [tableHeaders, setTableHeaders] = useState([]);
	const [fetchedData, setFetchedData] = useState(null);

	//  Update the column values when one changes
	const updateForm = (index, value) => {
		const newArray = [...form];
		newArray[index] = value;
		setForm(newArray);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		var count = 0;
		form.forEach((item) => {
			if (item === "") {
				count++;
			}
		});
		if (count == form.length) {
			alert("Please select at least one column");
			return;
		} else {
			// send data to server
			fetch("http://localhost:8080/Project", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				// convert form to object and stringify
				body: JSON.stringify({ form }),
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
		}
	};

	return (
		<div className="project-user">
			<form
				onSubmit={handleSubmit}
				className="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
			>
				<h1 className="text-2xl">Project User Data</h1>
				<Divider />

				{/* Loop 'size' amount of times to create a dropdown menu for each column */}
				{Array(size)
					.fill()
					.map((value, i) => (
						<div key={i} className="flex flex-col m-2">
							{/* Column Label that is indexed by i+1 */}
							<label>Choose Column {(i + 1).toString()}:</label>

							{/* Dropdown Menu (i+1) that upon selection updates the form[i] with selection */}
							<select
								className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								name={"col" + (i + 1).toString()}
								value={form[i]}
								onChange={(event) =>
									updateForm(i, event.target.value)
								}
							>
								{/* Base Option */}
								<option value="">Choose an option</option>

								{/* Take the array of attributes and only keep an option that is currently selected by dropdown OR isnt selected by any dropdown
								 * As a result you filter out the options are are already selected by another dropdown
								 * The new array maps its elements to dropdown options*/}
								{columnOptions
									.filter(
										(option) =>
											option == form[i] ||
											!form.includes(option)
									)
									.map((attribute) => (
										<option
											key={attribute}
											value={attribute}
										>
											{attribute.split("_").join(" ")}
										</option>
									))}
							</select>
						</div>
					))}
				{fetchedData && (
					<Table
						headers={tableHeaders}
						rows={Object.values(fetchedData)}
					/>
				)}
				<button
					className="mt-6 w-1/4 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full"
					type="submit"
				>
					Project
				</button>
			</form>
		</div>
	);
}

export default Project;
