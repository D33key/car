import { ROAD_LENGTH, ROAD_WIDTH } from "../constants";

export default function MainRoad() {
	return (
		<>
			{/* Основная дорога */}
			<mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
				<planeGeometry args={[ROAD_WIDTH, ROAD_LENGTH + 10]} />
				<meshStandardMaterial color='gray' />
			</mesh>
			{/* Разметка */}
			{[...Array(25)].map((_, i) => (
				<mesh
					key={i}
					position={[0, -0.005, i * 5 - ROAD_LENGTH / 2]}
					rotation={[-Math.PI / 2, 0, 0]}
				>
					<planeGeometry args={[0.2, 2]} />
					<meshStandardMaterial color='white' />
				</mesh>
			))}
		</>
	);
}
