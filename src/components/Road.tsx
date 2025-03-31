import { ROAD_WIDTH } from '../constants';
import Barier from './Barier';
import MainRoad from './MainRoad';
import Spiral from './Spiral';

export default function Road() {
	return (
		<group>
			{/* Основная дорога */}
			<MainRoad />

			{/* Спиральки */}
			<Spiral
				position={[-ROAD_WIDTH / 2 - 6, 1, 0]}
				rotation={[0, 0, Math.PI / 8]}
			/>

			{/* Спиральки */}
			<Spiral
				position={[ROAD_WIDTH / 2 + 6, 1, 0]}
				rotation={[0, 0, -Math.PI / 8]}
			/>

			{/* ОГРАЖДЕНИЕ */}
			<Barier />
			<Barier position='right' />
		</group>
	);
}
