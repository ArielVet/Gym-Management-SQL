import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Header from "./components/Header";
import User from "./screens/User";
import Fitness from "./screens/Fitness";

function App() {
	return (
		<div className="min-h-screen bg-gray-300">
			<Header />
			<main className="container mx-auto px-4 py-8">
				<Routes>
					<Route path="/" element={<Home />} />{" "}
					<Route path="User" element={<User />} />{" "}
					<Route path="Fitness" element={<Fitness />} />{" "}
				</Routes>{" "}
			</main>{" "}
		</div>
	);
}

export default App;
