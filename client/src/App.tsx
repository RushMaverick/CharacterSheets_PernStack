import "./App.css";
import React, { useState } from "react";

//Components
import AddSheetModal from "./components/AddSheetModal";
import SheetModal from "./components/SheetModal";

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
			<AddSheetModal onClick={() => openModal()} />
			<SheetModal isOpen={isModalOpen} onClose={closeModal} />
		</div>
	);
};

export default App;
