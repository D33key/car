import { Html } from '@react-three/drei';
import { useEffect } from 'react';
import { Joystick } from 'react-joystick-component';

interface MobileControls {
	forward: boolean;
	backward: boolean;
	left: boolean;
	right: boolean;
}

export const MobileJoystickControls = ({
	onControlChange,
}: {
	onControlChange: (controls: MobileControls) => void;
}) => {
	const handleMove = (e: { x: number; y: number }) => {
		const newControls = {
			forward: e.direction === 'FORWARD',
			backward: e.direction === 'BACKWARD',
			left: e.direction === 'LEFT',
			right: e.direction === 'RIGHT',
		};
		onControlChange(newControls);
	};

	const handleStop = () => {
		const newControls = {
			forward: false,
			backward: false,
			left: false,
			right: false,
		};
		onControlChange(newControls);
	};

	useEffect(() => {
		window.addEventListener('visibilitychange', handleStop);

		return () => {
			window.removeEventListener('visibilitychange', handleStop);
		};
	}, []);

	return (
		<Html
			style={{
				bottom: -window.innerHeight / 3,
				left: -window.innerWidth / 40
			}}
		>
			<Joystick
				size={80}
				baseColor='#666666'
				stickColor='#333333'
				move={handleMove}
				stop={handleStop}
				throttle={16}
			/>
		</Html>
	);
};
