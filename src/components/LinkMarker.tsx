import { Text, useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { RapierRigidBody, RigidBody } from '@react-three/rapier';
import { useRef } from 'react';
import * as THREE from 'three';

type LinkMarkerProps = {
	position: [number, number, number];
	imageUrl: string;
	text: string;
	url: string;
	carRef: React.RefObject<THREE.Group<THREE.Object3DEventMap>>;
};

export default function LinkMarker({
	position,
	imageUrl,
	text,
	url,
	carRef,
}: LinkMarkerProps) {
	const [, getKeys] = useKeyboardControls();
	const isMobile =
		typeof window !== 'undefined' &&
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent,
		);

	const rigidBodyRef = useRef<RapierRigidBody>(null);
	const markerRef = useRef<THREE.Group>(null);

	const resetKeys = () => {
		const keys = getKeys();
		Object.keys(keys).forEach((key) => (keys[key] = false));
	};

	useFrame(() => {
		if (!carRef.current || !rigidBodyRef.current) return;

		const carPosition = carRef.current.position;
		const markerPosition = rigidBodyRef.current.translation();

		const distance = carPosition.distanceTo(
			new THREE.Vector3(markerPosition.x, markerPosition.y, markerPosition.z),
		);

		if (distance < 3) {
			const variation = isMobile ? '_blank' : '_blank';
			resetKeys();
			const a = document.createElement('a');

			a.setAttribute('href', url);
			a.setAttribute('target', variation);
			a.click();

			carRef.current.position.x = 0;
		}
	});

	return (
		<group position={position} ref={markerRef}>
			<RigidBody
				ref={rigidBodyRef}
				type='fixed'
				colliders='ball'
				sensor
				position={[0, 2.5, 0]}
			>
				<mesh>
					<meshStandardMaterial color='#ffffff' side={THREE.DoubleSide} />
					{/* Текстура внутри сферы */}
					<mesh position={[0, 0, 0]}>
						<planeGeometry args={[1.8, 1.8]} />
						<meshBasicMaterial map={new THREE.TextureLoader().load(imageUrl)} />
					</mesh>
				</mesh>
			</RigidBody>
			<Text
				position={[0, 1, 0]}
				color='white'
				anchorX='center'
				anchorY='middle'
				fontSize={0.5}
			>
				{text}
			</Text>
		</group>
	);
}
