import React from "react";
import { useState, useEffect } from "react";
import Divider from "../components/shared/Divider";
import Table from "../components/shared/Table";

function User() {
	const [userID, setUserID] = useState("");
	const [memberIdList, setMemberIdList] = useState([]);
	const [tableHeaders, setTableHeaders] = useState([]);
	const [fetchedData, setFetchedData] = useState(null);
	const [userName, setUserName] = useState("");
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!userID) {
			alert("Please enter a userID");
		} else {
			// send data to server
			fetch("http://localhost:8080/user", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userID,
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.rowsAffected[0] > 0) {
						setTableHeaders(Object.keys(data.recordset[0]));
						setFetchedData(data.recordset[0]);
						setUserName(data.recordset[0].Name);
					}
				})
				.catch((err) => console.log(err));
		}
	};

	useEffect(() => {
		// Get the workout IDs
		fetch("http://localhost:8080/userids")
			.then((res) => res.json())
			.then((data) => {
				let arr = [];
				data.recordset.forEach((element) => {
					arr.push(element.UserID);
				});
				setMemberIdList(arr);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div className="Join">
			<form
				className="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
				onSubmit={handleSubmit}
			>
				<h1 className="text-2xl">User Dashboard</h1>
				<h1 className="text-lg">View User Information</h1>
				<Divider />
				<p className="mb-2">User ID</p>
				<select
					className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					onChange={(event) => setUserID(event.target.value)}
				>
					<option value="">Choose an option</option>
					{memberIdList.map((option, index) => (
						<option key={index} value={option}>
							{option}
						</option>
					))}
				</select>
				{fetchedData && (
					<>
						<Divider />
						<h1 className="mt-8 text-lg font-medium">
							Hi {userName} 👋!
						</h1>
						<p className="mb-4">Let's learn more about you.</p>
						<Table
							headers={tableHeaders}
							rows={[Object.values(fetchedData)]}
						/>
					</>
				)}

				<button
					className="mt-6 w-1/4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
					type="submit"
				>
					View User
				</button>
			</form>
		</div>
	);
}

export default User;
