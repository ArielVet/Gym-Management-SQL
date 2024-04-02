import React from "react";
import { useState } from "react";
import FormElement from "./shared/FormElement";
import Divider from "./shared/Divider";

function InsertUser() {
	const [userID, setUserID] = useState("");
	const [name, setName] = useState("");
	const [gender, setGender] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [date_of_birth, setDate_of_birth] = useState("");

	const [madeInsertion, setMadeInsertion] = useState(false);
	const [insertionMessage, setInsertionMessage] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		// send data to server
		fetch("http://localhost:8080/Insert_User", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				userID,
				name,
				gender,
				email,
				phone,
				date_of_birth,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				// After any insertion attempt has been made, update insertion flag to true
				// updates insertion message to display success or displays error
				setMadeInsertion(true);
				setInsertionMessage(
					data.rowsAffected[0] ? "Inserted User" : data.message
				);
			});
	};

	return (
		<div className="insert-user">
			<form
				onSubmit={handleSubmit}
				className="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
			>
				<h1 className="text-2xl">Insert User</h1>
				<Divider />
				<FormElement
					label="User ID"
					type="text"
					name="userID"
					value={userID}
					onChange={setUserID}
				/>

				<FormElement
					label="Name"
					type="text"
					name="name"
					value={name}
					onChange={setName}
				/>

				<FormElement
					label="Gender"
					type="text"
					name="gender"
					value={gender}
					onChange={setGender}
				/>

				<FormElement
					label="Email"
					type="email"
					name="email"
					value={email}
					onChange={setEmail}
				/>

				<FormElement
					label="Phone"
					type="text"
					name="phone"
					value={phone}
					onChange={setPhone}
				/>

				<FormElement
					label="Date of Birth"
					type="date"
					name="date_of_birth"
					value={date_of_birth}
					onChange={setDate_of_birth}
				/>

				{/* If any insertion has been attempted display the insertion message */}
				{madeInsertion ? (
					<p className="text-green-600">{insertionMessage}</p>
				) : (
					<></>
				)}

				<button
					className="mt-6 w-1/4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
					type="submit"
				>
					Insert User
				</button>
			</form>
		</div>
	);
}

export default InsertUser;
