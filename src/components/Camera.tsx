import { PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { THREE_REF } from '../type';

export default function Camera({ carRef }: { carRef: THREE_REF }) {
	const cameraRef = useRef(undefined);
	useFrame(() => {
		if (!cameraRef.current || !carRef.current) return;

		cameraRef.current.position.lerp(
			new THREE.Vector3(
				carRef.current.position.x,
				3,
				carRef.current.position.z + 5,
			),
			0.1,
		);

		cameraRef.current.lookAt(carRef.current.position);
	});

	return (
		<PerspectiveCamera
			makeDefault
			ref={cameraRef}
			position={[0, 3, 25]}
			fov={100}
		/>
	);
}
