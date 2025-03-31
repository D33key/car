import { KeyboardControls, KeyboardControlsEntry } from '@react-three/drei';
import { useMemo } from 'react';
import { CONTROLS } from '../constants';

export default function KeyboardProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const map = useMemo<KeyboardControlsEntry<keyof typeof CONTROLS>[]>(
		() => [
			{ name: CONTROLS.forward, keys: ['ArrowUp', 'KeyW'] },
			{ name: CONTROLS.backward, keys: ['ArrowDown', 'KeyS'] },
			{ name: CONTROLS.left, keys: ['ArrowLeft', 'KeyA'] },
			{ name: CONTROLS.right, keys: ['ArrowRight', 'KeyD'] },
			{ name: CONTROLS.jump, keys: ['Space'] },
		],
		[],
	);
	return <KeyboardControls map={map}>{children}</KeyboardControls>;
}