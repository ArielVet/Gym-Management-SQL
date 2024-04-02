import React from "react";

const TableVertical = ({ headers, rows }) => {
	console.log(rows);
	return (
		<div className="overflow-x-auto">
			<div className="flex">
				{/* Header column */}
				<div className="w-40 bg-gray-200 py-2 px-4 grid grid-cols-1 gap-0">
					{headers.map((header, index) => (
						<div
							key={index}
							className="text-gray-700 font-bold mb-2"
						>
							{header}
						</div>
					))}
				</div>
				{/* Data columns */}
				<div className="bg-gray-100 py-2 px-4 grid grid-cols-1 gap-0">
					{rows[0].map((item, index) => (
						<div key={index} className="text-gray-700 mb-2">
							{item}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default TableVertical;
