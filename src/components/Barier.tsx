import {
	BARRIER_HEIGHT,
	BARRIER_OFFSET_X,
	BARRIER_OFFSET_Y,
	BARRIER_WIDTH,
	LEG_HEIGHT,
	LEG_LENGTH,
	LEG_SPACING,
	LEG_WIDTH,
	ROAD_LENGTH,
} from '../constants';

export default function Barier({
	position = 'left',
}: {
	position?: 'left' | 'right';
}) {
	const symbol = position === 'left' ? -1 : 1;
	return (
		<>
			<mesh position={[BARRIER_OFFSET_X * symbol, BARRIER_OFFSET_Y, 0]}>
				<boxGeometry args={[BARRIER_WIDTH, BARRIER_HEIGHT, ROAD_LENGTH]} />
				<meshStandardMaterial color='silver' />
			</mesh>

			{[...Array(Math.ceil(ROAD_LENGTH / LEG_SPACING))].map((_, i) => (
				<mesh
					key={`${position}-leg-${i}`}
					position={[
						BARRIER_OFFSET_X * symbol,
						LEG_HEIGHT / 2,
						i * LEG_SPACING - ROAD_LENGTH / 2,
					]}
				>
					<boxGeometry args={[LEG_LENGTH, LEG_HEIGHT, LEG_WIDTH]} />
					<meshStandardMaterial color='darkgray' />
				</mesh>
			))}
		</>
	);
}
