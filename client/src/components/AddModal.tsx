import React from "react";

const AddModal: React.FC = () => {
	const handleClick = () => {
		alert("Button clicked!");
	};

	return (
		<div>
			<button onClick={handleClick} className="round-button">
				Click Me
			</button>
		</div>
	);
};

export default AddModal;
