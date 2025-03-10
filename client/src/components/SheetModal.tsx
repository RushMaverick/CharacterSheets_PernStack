/**
 * SheetModal Component
 *
 * This component serves as a modal for creating or editing a character sheet.
 * It allows users to input character details such as name, race, class, level, background, and bio.
 *
 * Features:
 * - Opens as a modal when `isOpen` is true.
 * - Pre-fills fields if an existing `sheet` is provided.
 * - Sends a POST request for new characters and a PUT request for updates.
 * - Closes when clicking outside the modal or pressing the "Cancel" button.
 */
import React, { useState, useEffect } from "react";
import "./SheetModal.css";

interface ModalProperties {
	isOpen: boolean;
	onClose: () => void;
	sheet: any;
}

const SheetModal: React.FC<ModalProperties> = ({ isOpen, onClose, sheet }) => {
	//States
	const [c_name, setName] = useState("");
	const [c_race, setRace] = useState("");
	const [c_class, setClass] = useState("");
	const [c_level, setLevel] = useState<number>(1);
	const [c_bg, setBg] = useState("");
	const [c_bio, setBio] = useState("");

	// useEffect will update the modal with information if there is any, otherwise set them to default values
	useEffect(() => {
		if (sheet) {
			setName(sheet.character_name);
			setRace(sheet.race);
			setClass(sheet.character_class);
			setLevel(sheet.level);
			setBg(sheet.background);
			setBio(sheet.bio);
		} else {
			setName("");
			setRace("");
			setClass("");
			setLevel(1);
			setBg("");
			setBio("");
		}
	}, [sheet]);

	//handleSubmit recognizes if there is existing sheet information and then either uses POST or PUT depending on the instance the submit was handled!
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const body = {
				character_name: c_name,
				race: c_race,
				character_class: c_class,
				level: c_level,
				background: c_bg,
				bio: c_bio,
			};
			if (sheet) {
				const response = await fetch(
					`http://localhost:5001/sheets/${sheet.sheet_id}`,
					{
						method: "PUT",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(body),
					}
				);
			} else {
				const response = await fetch("http://localhost:5001/sheets", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(body),
				});
			}

			window.location.href = "/";
		} catch (err) {
			console.error(err instanceof Error);
		}
	};

	if (!isOpen) return null;

	return (
		<div className="modal-overlay" onClick={onClose}>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				<h2>Character Sheet</h2>
				<form className="sheet-form" onSubmit={handleSubmit}>
					<label>
						Name:
						<input
							type="text"
							onChange={(e) => setName(e.target.value)}
							placeholder="For example: Elrouvir Lightshiver"
							value={c_name}
						/>
					</label>
					<label>
						Race:
						<input
							type="text"
							onChange={(e) => setRace(e.target.value)}
							placeholder="For example: Fire Genasi"
							value={c_race}
						/>
					</label>
					<label>
						Class:
						<input
							type="text"
							onChange={(e) => setClass(e.target.value)}
							placeholder="For example: Artificer"
							value={c_class}
						/>
					</label>
					<label>
						Level:
						<input
							type="number"
							onChange={(e) => {
								const value = e.target.value ? Number(e.target.value) : 0;
								setLevel(value);
							}}
							placeholder="3"
							value={c_level}
						/>
					</label>
					<label>
						Background:
						<input
							type="text"
							onChange={(e) => setBg(e.target.value)}
							placeholder="For example: Noble"
							value={c_bg}
						/>
					</label>
					<label>
						Bio:
						<textarea
							className="bio-area"
							onChange={(e) => setBio(e.target.value)}
							placeholder="Write your interesting backstory here!"
							value={c_bio}
						/>
					</label>
					<div className="modal-buttons">
						<button type="button" className="btn-cancel" onClick={onClose}>
							Cancel
						</button>
						<button type="submit" className="btn-save">
							Save
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SheetModal;
