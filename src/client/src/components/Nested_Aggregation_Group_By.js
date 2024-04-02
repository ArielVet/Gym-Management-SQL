import React from "react";
import { useState } from "react";
import Divider from "./shared/Divider";
import Table from "./shared/Table";

function Nested_Aggregation() {
	const [fetchedData, setFetchedData] = useState(null);
	const [tableHeaders, setTableHeaders] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();

		// send data to server
		fetch("http://localhost:8080/Nested_Aggregation", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.rowsAffected[0] > 0) {
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
		<div className="Nested_Aggregation">
			<form
				className="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
				onSubmit={handleSubmit}
			>
				<h1 className="text-2xl"> Nested Aggregation with Group By </h1>
				<h1 className="text-ll">
					The number of individuals, who at some point, had body fat
					below the average for their respective gender.
				</h1>

				<Divider />
				{fetchedData && (
					<div>
						<Table
							headers={tableHeaders}
							rows={Object.values(fetchedData)}
						/>
					</div>
				)}

				<button
					className="mt-6 w-1/4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
					type="submit"
				>
					Find Members
				</button>
			</form>
		</div>
	);
}

export default Nested_Aggregation;
