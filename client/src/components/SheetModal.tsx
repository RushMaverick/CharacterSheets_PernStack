import React, { Fragment } from "react";
import "./SheetModal.css";

interface ModalProperties {
	isOpen: boolean;
	onClose: () => void;
}

const SheetModal: React.FC<ModalProperties> = ({ isOpen, onClose }) => {
	if (!isOpen) return null;
	return (
		<div className="modal-overlay" onClick={onClose}>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				<h2>Character Sheet</h2>
				<form className="sheet-form">
					<label>
						Name:
						<input type="text" placeholder="Elrouvir Lightshiver" />
					</label>
					<label>
						Race:
						<input type="text" placeholder="Fire Genasi" />
					</label>
					<label>
						Class:
						<input type="text" placeholder="Artificer" />
					</label>
					<label>
						Level:
						<input type="number" placeholder="3" />
					</label>
					<label>
						Background:
						<input type="text" placeholder="Street Urchin" />
					</label>
					<label>
						Bio:
						<textarea className="bio-area" placeholder="Blablablablabla" />
					</label>
				</form>
			</div>
		</div>
	);
};

export default SheetModal;
