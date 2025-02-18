/**
 * AddButton Component
 *
 * This component is a hovering button that opens an empty sheet where the user can fill out.
 *
 * Features:
 * - Lists all backend entries to the page.
 * - Backend items are represented as labels, showing the name of the sheet as well as a delete button.
 * - Delete button deletes the entry from the backend and thus refreshes the view.
 */

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
