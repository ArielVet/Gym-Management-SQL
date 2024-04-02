import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <header className="Header sticky top-0 z-50 bg-white shadow">
        <nav className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Gym Manager 💪🏼</h1>
          </div>
          <div>
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-800 px-3 py-2"
            >
              Home
            </Link>
            <Link
              to="User"
              className="text-gray-600 hover:text-gray-800 px-3 py-2"
            >
              User
            </Link>
            <Link
              to="Fitness"
              className="text-gray-600 hover:text-gray-800 px-3 py-2"
            >
              Fitness
            </Link>
          </div>
        </nav>
      </header>
    </div>
  );
}
