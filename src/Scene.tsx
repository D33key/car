import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { useRef } from 'react';
import * as THREE from 'three';

import { Environment, OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import Camera from './components/Camera';
import Car from './components/Car';
import KeyboardProvider from './components/KeyboardProvider';
import Road from './components/Road';
import AnimatedSmoke from './components/Smoke';
import { MARKERS } from './constants';
import LinkMarker from './components/LinkMarker';
import shouldAddPrefix from './shouldAddPrefix';
import Preloader from './components/Preloader';

export default function Scene() {
	const carRef = useRef<THREE.Group<THREE.Object3DEventMap>>(undefined);
	return (
		<KeyboardProvider>
			<Preloader />
			<Canvas shadows className='fullscreen'>
				<Environment files={shouldAddPrefix('/background.jpg')} background />
				<ambientLight intensity={0.5} />
				<directionalLight position={[5, 5, 5]} intensity={1} />
				<Road />
				<Physics>
					<Car carRef={carRef} />
					<Camera carRef={carRef} />

					{/* Рендерим маркеры */}
					{MARKERS.map((marker, index) => (
						<LinkMarker
							key={index}
							position={marker.position}
							imageUrl={marker.imageUrl}
							text={marker.text}
							url={marker.url}
							carRef={carRef}
						/>
					))}
				</Physics>
				<OrbitControls
					enableZoom={false}
					enableRotate={false}
					enablePan={false}
					mouseButtons={{
						LEFT: THREE.MOUSE.PAN,
					}}
				/>

				<AnimatedSmoke />
			</Canvas>
		</KeyboardProvider>
	);
}
