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
	onSelectSheet: (sheet: CharacterSheetData | undefined) => void; // Function passed from App to open modal with sheet
}

const ListSheets: React.FC<ListSheetsProps> = ({ onSelectSheet }) => {
	const [sheets, setSheets] = useState<CharacterSheetData[]>([]);
	const [selectedSheet, setSelectedSheet] = useState<CharacterSheetData | null>(
		null
	);

	const OpenModal = async (
		event: React.MouseEvent,
		sheet: CharacterSheetData
	) => {
		try {
			const targetClicked = event.target as HTMLElement; // Does not empty out the sheet
			if (targetClicked.classList.contains("label-container")) {
				setSelectedSheet(sheet);
				onSelectSheet(sheet);
				console.log(sheet);
			} else {
				setSelectedSheet(null);
				onSelectSheet(undefined);
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

	const getSheets = useCallback(async () => {
		try {
			const response = await fetch("http://localhost:5001/sheets");
			const jsonData: CharacterSheetData[] = await response.json();

			setSheets(jsonData);
			console.log(jsonData);
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
