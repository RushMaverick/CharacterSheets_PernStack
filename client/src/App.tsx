/**
 * App Component
 *
 * This is the main entry point of the application. It manages the state for modals
 * and selected character sheets while rendering core UI components.
 *
 * Features:
 * - Displays a list of character sheets.
 * - Allows users to add or edit a sheet using modals.
 * - Manages modal visibility and selected sheet data.
 */

import "./App.css";
import React, { useState } from "react";

//Custom components
import AddSheetModal from "./components/AddSheetModal";
import SheetModal from "./components/SheetModal";
import ListSheets from "./components/ListSheets";

interface CharacterSheetData {
	sheet_id: number;
	character_name: string;
	race: string;
	character_class: string;
	level: number;
	background: string;
	bio: string;
}

const App: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [selectedSheet, setSelectedSheet] = useState<CharacterSheetData | null>(
		null
	);
	const openModal = (sheet: any) => {
		setSelectedSheet(sheet);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setSelectedSheet(null);
		setIsModalOpen(false);
	};

	return (
		<div>
			<AddSheetModal onClick={() => openModal(null)} />
			<ListSheets onSelectSheet={openModal} />
			<SheetModal
				isOpen={isModalOpen}
				onClose={closeModal}
				sheet={selectedSheet}
			/>
		</div>
	);
};

export default App;
