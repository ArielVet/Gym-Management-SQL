import React from "react";
import InsertUser from "../components/InsertUser.js";
import DeleteUser from "../components/DeleteUser.js";
import Project from "../components/Project.js";
import UpdateLog from "../components/UpdateLog.js";
import Join from "../components/Join.js";
import Aggregation_GroupBy from "../components/Aggregation_GroupBy.js";
import Aggregation_Having from "../components/Aggregation_Having.js";
import Nested_Aggregation from "../components/Nested_Aggregation_Group_By.js";
import Division from "../components/Division.js";
import Select from "../components/Select.js";

function Home() {
	return (
		<div>
			<h2 className="text-2xl font-semibold mb-4">
				Welcome to Gym Manager 🎧
			</h2>
			<InsertUser />
			<DeleteUser />
			<UpdateLog />
			<Select />
			<Project />
			<Join />
			<Aggregation_GroupBy />
			<Aggregation_Having />
			<Nested_Aggregation />
			<Division />
		</div>
	);
}

export default Home;
