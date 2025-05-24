export default function RaceList({ races, onDeleteRace, onEditRace }) {
	return (
		<>
			<h1>My race list</h1>
			<ol className="race-table">
				{}
				<li className="header">
					<span>Style</span>
					<span>Distance</span>
					<span>Participants</span>
					<span>Edit race</span>
					<span>Delete race</span>
				</li>

				{/* Data rows */}
				{races.map((race) => (
					<li key={race.id}>
						<span>{race.style}</span>
						<span>{race.distance}</span>
						<span>{race.numberOfParticipants}</span>
						<button onClick={() => onEditRace(race)}>Edit</button>
						<button onClick={() => onDeleteRace(race.id)}>Delete</button>
					</li>
				))}
			</ol>
		</>
	);
}
