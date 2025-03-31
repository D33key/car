import { useTexture } from '@react-three/drei';

export default function Background() {
	const texture = useTexture('/background.webp');
	return (
		<mesh scale={[-1, 1, 1]} position={[0, 0, -10]}>
			<planeGeometry args={[100, 100]} />
			<meshBasicMaterial map={texture} />
		</mesh>
	);
}
