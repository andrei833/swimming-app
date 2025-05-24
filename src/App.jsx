import { useEffect, useState } from "react";
import "./App.css";
import RaceForm from "./components/RaceForm";
import RaceList from "./components/RaceList";

function App() {
	const [races, setRaces] = useState([]);
	const [refresh, setRefresh] = useState(false);
	const [editingRace, setEditingRace] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		fetch("http://192.168.1.132:8080/races")
			.then((response) => response.json())
			.then((data) => setRaces(data))
			.finally(() => setLoading(false));
	}, [refresh]);

	const handleAddRace = (race) => {
		fetch("http://192.168.1.132:8080/races", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(race),
		}).then(() => setRefresh((r) => !r));
	};

	const handleDelete = (id) => {
		fetch(`http://192.168.1.132:8080/races/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		}).then(() => {
			setRefresh((r) => !r);
			console.log("Deletion succesful");
		});
	};

	const handleEdit = (race) => {
		setEditingRace(race);
	};

	const handleUpdateRace = (updatedRace) => {
		fetch(`http://192.168.1.132:8080/races/${updatedRace.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedRace),
		}).then(() => {
			setEditingRace(null);
			setRefresh((r) => !r);
		});
	};

	return (
		<>
			{loading && <div>Loading races...</div>}
			<RaceList
				races={races}
				onDeleteRace={handleDelete}
				onEditRace={handleEdit}
			/>
			<RaceForm onAddRace={handleAddRace} />
			{editingRace && (
				<RaceForm
					onAddRace={handleUpdateRace}
					initialData={editingRace}
					isEdit={true}
					onCancel={() => setEditingRace(null)}
				/>
			)}
		</>
	);
}

export default App;
