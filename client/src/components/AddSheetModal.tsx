import React from "react";
import "./AddSheetModal.css";

interface AddButton {
	onClick: () => void;
}

const AddSheetModal: React.FC<AddButton> = ({ onClick }) => {
	return (
		<div>
			<button onClick={onClick} className="add-modal-button">
				<span className="material-icons">+</span>
			</button>
		</div>
	);
};

export default AddSheetModal;
