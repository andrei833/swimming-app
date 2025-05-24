import { useEffect, useState } from "react";

export default function RaceForm({
	onAddRace,
	initialData = undefined,
	isEdit = false,
	onCancel = undefined,
}) {
	const [style, setStyle] = useState(initialData?.style || "");
	const [distance, setDistance] = useState(initialData?.distance || "");
	const [numberOfParticipants, setNumberOfParticipants] = useState(
		initialData?.numberOfParticipants || ""
	);

	useEffect(() => {
		if (initialData) {
			setStyle(initialData.style || "");
			setDistance(initialData.distance || "");
			setNumberOfParticipants(initialData.numberOfParticipants || "");
		} else {
			setStyle("");
			setDistance("");
			setNumberOfParticipants("");
		}
	}, [initialData]);

	const handleSubmit = (e) => {
		e.preventDefault();
		onAddRace({
			...(initialData?.id ? { id: initialData.id } : {}),
			distance: parseInt(distance, 10),
			style,
			numberOfParticipants: parseInt(numberOfParticipants, 10),
		});
		// Optionally clear form after submit if not editing
		if (!isEdit) {
			setStyle("");
			setDistance("");
			setNumberOfParticipants("");
		}
	};

	const isValid = () => {
		return style !== "" && distance !== "" && numberOfParticipants !== "";
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				value={style}
				onChange={(e) => setStyle(e.target.value)}
				placeholder="Race style"
			/>
			<input
				type="number"
				value={distance}
				onChange={(e) => setDistance(e.target.value)}
				placeholder="Race distance"
			/>
			<input
				type="number"
				value={numberOfParticipants}
				onChange={(e) => setNumberOfParticipants(e.target.value)}
				placeholder="Number of participants"
			/>
			<button type="submit" disabled={!isValid()}>
				{isEdit ? "Update Race" : "Add Race"}
			</button>
			{onCancel && (
				<button type="button" onClick={onCancel} style={{ marginLeft: "1em" }}>
					Cancel
				</button>
			)}
		</form>
	);
}
