import React from "react";

const Table = ({ headers, rows }) => {
	return (
		<div className="overflow-x-auto">
			<table className="w-full text-center text-md font-light">
				<thead className="border-b font-medium dark:border-neutral-500">
					<tr>
						{headers.map((header, index) => (
							<th scope="col" className="px-6 py-4" key={index}>
								{header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows.map((row, rowIndex) => (
						<tr
							className="border-b rounded-lg dark:border-neutral-500 bg-slate-200 hover:bg-slate-400"
							key={rowIndex}
						>
							{row.map((cell, cellIndex) => (
								<td
									className="whitespace-nowrap px-4 py-4 font-medium"
									key={cellIndex}
								>
									{cell}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
