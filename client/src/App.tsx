import "./App.css";
import React, { useState } from "react";

//Components
import AddSheetModal from "./components/AddSheetModal";
import SheetModal from "./components/SheetModal";
import ListSheets from "./components/ListSheets";

const App: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [selectedSheet, setSelectedSheet] = useState<any>(null);

	const openModal = (sheet: any) => {
		setSelectedSheet(sheet);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedSheet("");
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
