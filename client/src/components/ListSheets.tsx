/**
 * ListSheets Component
 *
 * This component lists all the existing entries from the database to the frontend.
 *
 * Features:
 * - Lists all backend entries to the page.
 * - Backend items are represented as labels, showing the name of the sheet as well as a delete button.
 * - Delete button deletes the entry from the backend and thus refreshes the view.
 */

import React, { useEffect, useState, useCallback } from "react";
import "./ListSheets.css";
import SheetModal from "./SheetModal";

interface CharacterSheetData {
	sheet_id: number;
	character_name: string;
	race: string;
	character_class: string;
	level: number;
	background: string;
	bio: string;
}

interface ListSheetsProps {
	onSelectSheet: (sheet: CharacterSheetData | undefined) => void;
}

const ListSheets: React.FC<ListSheetsProps> = ({ onSelectSheet }) => {
	const [sheets, setSheets] = useState<CharacterSheetData[]>([]);
	const [selectedSheet, setSelectedSheet] = useState<CharacterSheetData | null>(
		null
	);

	//OpenModal sets the selected sheet property to the sheet that is clicked on.
	const OpenModal = async (
		event: React.MouseEvent,
		sheet: CharacterSheetData
	) => {
		try {
			const targetClicked = event.target as HTMLElement;
			if (targetClicked.classList.contains("label-container")) {
				setSelectedSheet(sheet);
				onSelectSheet(sheet);
			}
		} catch (err) {
			console.error(err instanceof Error);
		}
	};

	//Delete sheet func
	const deleteSheet = async (id: number) => {
		try {
			const deleteSheet = await fetch(`http://localhost:5001/sheets/${id}`, {
				method: "DELETE",
			});
			console.log(deleteSheet);
		} catch (err) {
			console.error(err instanceof Error);
		}
	};

	//Get all sheets func
	const getSheets = useCallback(async () => {
		try {
			const response = await fetch("http://localhost:5001/sheets");
			const jsonData: CharacterSheetData[] = await response.json();

			setSheets(jsonData);
		} catch (err) {
			console.error(err instanceof Error);
		}
	}, []);

	useEffect(() => {
		getSheets();
	}, [getSheets]);

	return (
		<form className="sheet-view">
			<h1 className="container-title">Character Sheets</h1>
			{sheets.map((sheet) => (
				<div
					onClick={(e) => OpenModal(e, sheet)}
					key={sheet.sheet_id}
					className="label-container"
				>
					<div className="label-item">
						<span className="label-text">{sheet.character_name}</span>
						<button
							className="delete-btn"
							onClick={() => deleteSheet(sheet.sheet_id)}
						>
							✖
						</button>
					</div>
				</div>
			))}
		</form>
	);
};

export default ListSheets;
