import { useRef } from 'react';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ROAD_LENGTH } from '../constants';

export default function AnimatedSmoke() {
	const particles = useRef();
	const squareSize = 100; // Размер квадрата 100x100
	const smokeThickness = 1; // Толщина дымового слоя по Z
	const particleCount = 10000; // Увеличим количество частиц для большого квадрата

	// Создаем частицы в плоском квадрате
	const particlesArray = random.inBox(new Float32Array(particleCount * 3), {
		width: squareSize,
		height: squareSize,
		depth: smokeThickness, // Минимальная толщина для создания плоскости
	});

	useFrame(() => {
		if (!particles.current) return;

		const positions = particles.current.geometry.attributes.position.array;
		for (let i = 0; i < positions.length; i += 3) {
			// Легкое хаотичное движение в плоскости квадрата
			positions[i] += (Math.random() - 0.5) * 0.4; // X
			positions[i + 1] += (Math.random() - 0.5) * 0.3; // Y
			positions[i + 2] += (Math.random() - 0.5) * 0.02; // Z (очень слабое)

			// Если частица вышла за границы квадрата, возвращаем ее обратно
			if (Math.abs(positions[i]) > squareSize / 2) {
				positions[i] = (Math.random() - 0.5) * squareSize * 0.95;
			}
			if (Math.abs(positions[i + 1]) > squareSize / 2) {
				positions[i + 1] = (Math.random() - 0.5) * squareSize * 0.95;
			}
			if (Math.abs(positions[i + 2]) > smokeThickness / 2) {
				positions[i + 2] = (Math.random() - 0.5) * smokeThickness * 0.5;
			}
		}
		particles.current.geometry.attributes.position.needsUpdate = true;
	});

	return (
		<group position={[0, 0, -ROAD_LENGTH / 2]}>
			<Points ref={particles} positions={particlesArray} stride={3}>
				<PointMaterial
					transparent
					color='#a0a0a0'
					size={0.5}
					sizeAttenuation={true}
					depthWrite={false}
					opacity={0.4}
					blending={THREE.AdditiveBlending}
				/>
			</Points>
		</group>
	);
}
