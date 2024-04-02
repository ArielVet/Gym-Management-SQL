import React from "react";
import { useState, useEffect } from "react";
import FormElement from "./shared/FormElement";
import Divider from "./shared/Divider";

function DeleteUser() {
	const [userID, setUserID] = useState("");
	const [userIdList, setUserIdList] = useState([]);

	const [madeDeletion, setMadeDeletion] = useState(false);
	const [deletionMessage, setDeletionMessage] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		// send data to server
		fetch("http://localhost:8080/Delete_User", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ userID }),
		})
			.then((res) => res.json())
			.then((data) => {
				// After any deletion attempt has been made, update deletion flag to true
				// updates deletion message to display success or displays error
				setMadeDeletion(true);
				setDeletionMessage(
					data.rowsAffected[0]
						? "Deleted User " + userID
						: "No User Found with that ID"
				);
			});
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
				setUserIdList(arr);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div className="delete-user">
			<form
				onSubmit={handleSubmit}
				className="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
			>
				<h1 className="text-2xl">Delete User</h1>

				<Divider />
				<select
					className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					onChange={(event) => setUserID(event.target.value)}
				>
					<option value="">Choose a user</option>
					{userIdList.map((option, index) => (
						<option key={index} value={option}>
							{option}
						</option>
					))}
				</select>

				<p className="italic mt-2 font-semibold text-red-600">
					CAUTION: This action is irreversible!
				</p>

				{/* If any deletion has been attempted display the deletion message */}
				{madeDeletion ? (
					<p className="text-red-600">{deletionMessage}</p>
				) : (
					<></>
				)}

				<button
					className="mt-6 w-1/4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
					type="submit"
				>
					Delete User
				</button>
			</form>
		</div>
	);
}

export default DeleteUser;
