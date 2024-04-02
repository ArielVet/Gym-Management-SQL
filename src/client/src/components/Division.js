import React from "react";
import { useState } from "react";
import Divider from "./shared/Divider";

function Division() {
	const [fetchedData, setFetchedData] = useState(null);

	const handleSubmit = (e) => {
		e.preventDefault();

		// send data to server
		fetch("http://localhost:8080/division", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.rowsAffected[0] > 0) {
					setFetchedData(data.recordset);
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="division">
			<form
				className="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
				onSubmit={handleSubmit}
			>
				<h1 className="text-2xl"> Division </h1>
				<h1 className="text-ll">
					Find all users that belong to all Fitness Groups.
				</h1>
				<Divider />
				{fetchedData && (
					<div>
						<table className="min-w-full text-center text-md font-light">
							<thead className="border-b font-medium dark:border-neutral-500">
								<tr>
									<th scope="col" className="px-6 py-4">
										UserID
									</th>
									<th scope="col" className="px-6 py-4">
										Name
									</th>
									<th scope="col" className="px-6 py-4">
										Email Address
									</th>
								</tr>
							</thead>
							<tbody>
								{fetchedData.map((row) => (
									<tr
										className="border-b rounded-lg dark:border-neutral-500 bg-slate-200 hover:bg-slate-400"
										key={row.UserID}
									>
										<td className="whitespace-nowrap px-6 py-4 font-medium">
											{row.UserID}
										</td>
										<td className="whitespace-nowrap px-6 py-4 font-medium">
											{row.Name}
										</td>
										<td className="whitespace-nowrap px-6 py-4 font-medium">
											{row.Email_Address}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
				<button
					className="mt-6 w-1/4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
					type="submit"
				>
					Find Users
				</button>
			</form>
		</div>
	);
}

export default Division;
