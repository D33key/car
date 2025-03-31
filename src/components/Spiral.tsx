import { useMemo } from 'react';
import { BufferGeometry, Float32BufferAttribute } from 'three';
import {
	MOUNTAIN_HEIGHT,
	MOUNTAIN_WIDTH,
	ROAD_LENGTH,
	SEGMENTS,
} from '../constants';

export default function Spiral({
	position,
	rotation,
}: {
	position: [number, number, number];
	rotation: [number, number, number];
}) {
	const geometry = useMemo(() => {
		const geo = new BufferGeometry();
		const vertices = [];

		for (let z = 0; z <= SEGMENTS; z++) {
			for (let x = 0; x <= SEGMENTS; x++) {
				const xPos = (x / SEGMENTS) * MOUNTAIN_WIDTH - MOUNTAIN_WIDTH / 2;
				const zPos = (z / SEGMENTS) * ROAD_LENGTH - ROAD_LENGTH / 2;
				const yPos =
					Math.sin(xPos * 0.5) * Math.cos(zPos * 0.2) * MOUNTAIN_HEIGHT +
					Math.random() * 0.5;
				vertices.push(xPos, yPos, zPos);
			}
		}

		geo.setAttribute('position', new Float32BufferAttribute(vertices, 3));
		geo.computeVertexNormals(); // Улучшает освещение
		return geo;
	}, []);

	return (
		<mesh geometry={geometry} position={position} rotation={rotation}>
			<meshStandardMaterial color='white' side={2} />
		</mesh>
	);
}
