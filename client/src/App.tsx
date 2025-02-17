import "./App.css";
import React, { useState } from "react";

//Components
import AddSheetModal from "./components/AddSheetModal";
import SheetModal from "./components/SheetModal";
import ListSheets from "./components/ListSheets";

const App: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false); //change to Zustand

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<div>
			<ListSheets />
			<AddSheetModal onClick={() => openModal()} />
			<SheetModal isOpen={isModalOpen} onClose={closeModal} />
		</div>
	);
};

export default App;
