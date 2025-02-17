import React, { useState } from "react";
import "./SheetModal.css";

interface ModalProperties {
	isOpen: boolean;
	onClose: () => void;
}

interface CharacterSheetData {
	c_name: string;
	c_race: string;
	c_class: string;
	c_level: number;
	c_bg: string;
	c_bio: string;
}

const SheetModal: React.FC<ModalProperties> = ({ isOpen, onClose }) => {
	//States
	const [c_name, setName] = useState("");
	const [c_race, setRace] = useState("");
	const [c_class, setClass] = useState("");
	const [c_level, setLevel] = useState<number>(1);
	const [c_bg, setBg] = useState("");
	const [c_bio, setBio] = useState("");

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
			}; // Figure out how to place these in the correct spots
			console.log("body is: ", body);
			const response = await fetch("http://localhost:5001/sheets", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});
			const data = await response.json();
			console.log("Character sheet saved in Frontend.", data);
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
							placeholder="Elrouvir Lightshiver"
						/>
					</label>
					<label>
						Race:
						<input
							type="text"
							onChange={(e) => setRace(e.target.value)}
							placeholder="Fire Genasi"
						/>
					</label>
					<label>
						Class:
						<input
							type="text"
							onChange={(e) => setClass(e.target.value)}
							placeholder="Artificer"
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
						/>
					</label>
					<label>
						Background:
						<input
							type="text"
							onChange={(e) => setBg(e.target.value)}
							placeholder="Street Urchin"
						/>
					</label>
					<label>
						Bio:
						<textarea
							className="bio-area"
							onChange={(e) => setBio(e.target.value)}
							placeholder="Blablablablabla"
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
