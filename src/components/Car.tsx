import { useGLTF, useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import {
	CAR_SPEED,
	CAR_SPEED_MOBILE,
	ROAD_LENGTH,
	ROAD_WIDTH,
} from '../constants';
import { THREE_REF } from '../type';
import { MobileJoystickControls } from './MobileControls';

export default function Car({ carRef }: { carRef: THREE_REF }) {
	const [, get] = useKeyboardControls();
	const [mobileControls, setMobileControls] = useState({
		forward: false,
		backward: false,
		left: false,
		right: false,
	});
	const isMobile =
		typeof window !== 'undefined' &&
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent,
		);

	const direction = new THREE.Vector3();
	const { nodes, materials } = useGLTF('/models/car.glb');

	const wheelFrontRef = useRef<THREE.Mesh | null>(null);
	const wheelBackRef = useRef<THREE.Mesh | null>(null);

	useFrame(() => {
		if (!carRef.current) {
			return;
		}

		if (carRef.current && carRef.current.position.z === 0) {
			carRef.current.position.z = ROAD_LENGTH / 2 - 5;
		}

		const { forward, backward, left, right } = get();
		const {
			forward: mobForward,
			backward: mobBackward,
			left: mobLeft,
			right: mobRight,
		} = mobileControls;
		direction.set(0, 0, 0);

		if (forward) direction.z -= CAR_SPEED;
		if (mobForward) direction.z -= CAR_SPEED_MOBILE;
		if (backward) direction.z += CAR_SPEED;
		if (mobBackward) direction.z += CAR_SPEED_MOBILE;
		if (left) direction.x -= CAR_SPEED;
		if (mobLeft) direction.x -= CAR_SPEED_MOBILE;
		if (right) direction.x += CAR_SPEED;
		if (mobRight) direction.x += CAR_SPEED_MOBILE;

		carRef.current.position.add(direction);

		// Телепорт при достижении Z
		if (carRef.current.position.z < -ROAD_LENGTH / 2) {
			carRef.current.position.z = ROAD_LENGTH / 2;
		}
		if (carRef.current.position.z > ROAD_LENGTH / 2) {
			carRef.current.position.z = 0;
		}

		// Телепорт при выезде за границы дороги (по X)
		if (carRef.current.position.x < -ROAD_WIDTH / 2) {
			carRef.current.position.x += ROAD_WIDTH;
		}
		if (carRef.current.position.x > ROAD_WIDTH / 2) {
			carRef.current.position.x -= ROAD_WIDTH;
		}

		// Проверяем движение вперед или назад
		if (forward || backward || left || right || mobLeft || mobRight) {
			// Анимация вращения колес
			const wheelRotation = CAR_SPEED * 10 * (forward ? -1 : 1); // Параметр 10 можно настроить в зависимости от модели и нужной скорости вращения колес

			// Если рефы на колеса существуют, анимируем их вращение
			if (wheelFrontRef.current) {
				wheelFrontRef.current.rotation.x += wheelRotation;
			}
			if (wheelBackRef.current) {
				wheelBackRef.current.rotation.x += wheelRotation;
			}
		}
	});
	return (
		<>
			{isMobile && (
				<MobileJoystickControls
					onControlChange={(controls) => setMobileControls(controls)}
				/>
			)}
			<group ref={carRef} dispose={null} rotation={[0, Math.PI, 0]}>
				<group position={[0, 0.831, 0]} rotation={[Math.PI / 2, 0, 0]}>
					<mesh
						geometry={nodes.Plane.geometry}
						material={materials.main_paintBody}
					/>
					<mesh
						geometry={nodes.Plane_1.geometry}
						material={materials.plastic}
					/>
				</group>
				<mesh
					geometry={nodes.fender.geometry}
					material={materials.main_paintBody}
					position={[0, 0.831, 0]}
					rotation={[Math.PI / 2, 0, 0]}
				/>
				<group position={[0, 0.831, 0.002]} rotation={[Math.PI / 2, 0, 0]}>
					<mesh
						geometry={nodes.Plane002.geometry}
						material={materials.main_paintBody}
					/>
					<mesh
						geometry={nodes.Plane002_1.geometry}
						material={materials.chromex}
					/>
					<mesh
						geometry={nodes.Plane002_2.geometry}
						material={materials.plastic_satin}
					/>
					<mesh
						geometry={nodes.door_front_window.geometry}
						material={materials.glass}
					/>
					<mesh
						geometry={nodes.Plane032.geometry}
						material={materials.plastic_satin}
					/>
					<mesh
						geometry={nodes.Plane032_1.geometry}
						material={materials.main_paintBody}
					/>
					<mesh
						geometry={nodes.Plane032_2.geometry}
						material={materials.glass}
					/>
				</group>
				<group position={[0, 0.831, 0.006]} rotation={[Math.PI / 2, 0, 0]}>
					<mesh
						geometry={nodes.Plane003.geometry}
						material={materials.main_paintBody}
					/>
					<mesh
						geometry={nodes.Plane003_1.geometry}
						material={materials.chromex}
					/>
					<mesh
						geometry={nodes.Plane003_2.geometry}
						material={materials.plastic_satin}
					/>
					<mesh
						geometry={nodes.door_back_window_a.geometry}
						material={materials.glass}
					/>
					<mesh
						geometry={nodes.door_back_window_b.geometry}
						material={materials.glass}
					/>
				</group>
				<mesh
					geometry={nodes.front_bumper.geometry}
					material={materials.main_paintBody}
					position={[0, 0.831, -0.001]}
					rotation={[Math.PI / 2, 0, 0]}
				>
					<mesh
						geometry={nodes.bottom_grille.geometry}
						material={materials.plastic}
						rotation={[-Math.PI / 2, 0, 0]}
					/>
					<mesh
						geometry={nodes.front_bumper_led.geometry}
						material={materials.plastic}
						position={[-0.005, -0.014, -0.004]}
						rotation={[-Math.PI / 2, 0, 0]}
						scale={1.004}
					>
						<mesh
							geometry={nodes._led_housing.geometry}
							material={materials.chromex}
						/>
						<mesh
							geometry={nodes.led_cover.geometry}
							material={materials.glass}
						/>
						<mesh
							geometry={nodes.leds.geometry}
							material={materials.chrome}
							position={[0.644, -0.401, 2.146]}
							rotation={[Math.PI / 2, 0, -0.262]}
							scale={0.006}
						/>
						<mesh
							geometry={nodes.mesh.geometry}
							material={materials.plastic}
							position={[0.005, -0.004, 0.014]}
							scale={0.996}
						/>
					</mesh>
					<mesh
						geometry={nodes.front_grille.geometry}
						material={materials.chromex}
					>
						<mesh
							geometry={nodes.mesh001.geometry}
							material={materials.plastic}
							position={[0.003, 0, 0]}
							rotation={[-Math.PI / 2, 0, 0]}
						/>
						<mesh
							geometry={nodes.Plane025.geometry}
							material={materials.chromex}
						/>
						<mesh
							geometry={nodes.Plane025_1.geometry}
							material={materials.gloss}
						/>
					</mesh>
					<mesh
						geometry={nodes.Plane016.geometry}
						material={materials.plastic}
					/>
					<mesh
						geometry={nodes.Plane016_1.geometry}
						material={materials.chromex}
					/>
				</mesh>
				<group position={[0.004, 0.833, 0.007]} rotation={[Math.PI / 2, 0, 0]}>
					<mesh
						geometry={nodes.Plane006.geometry}
						material={materials.main_paintBody}
					/>
					<mesh
						geometry={nodes.Plane006_1.geometry}
						material={materials.chromex}
					/>
					<mesh
						geometry={nodes.Plane006_2.geometry}
						material={materials.plastic_satin}
					/>
					<mesh
						geometry={nodes.side_skirt_window001.geometry}
						material={materials.glass}
					/>
				</group>
				<group position={[0.004, 0.835, 0.005]} rotation={[Math.PI / 2, 0, 0]}>
					<mesh
						geometry={nodes.Plane007.geometry}
						material={materials.main_paintBody}
					/>
					<mesh
						geometry={nodes.Plane007_1.geometry}
						material={materials.chromex}
					/>
					<mesh
						geometry={nodes.Plane007_2.geometry}
						material={materials['Backlight red']}
					/>
					<mesh
						geometry={nodes.Plane012.geometry}
						material={materials.chromex}
					/>
					<mesh
						geometry={nodes.Plane012_1.geometry}
						material={materials.plastic}
					/>
					<mesh
						geometry={nodes.Plane012_2.geometry}
						material={materials.main_paintBody}
					/>
				</group>
				<group position={[0.004, 0.833, 0.005]} rotation={[Math.PI / 2, 0, 0]}>
					<mesh
						geometry={nodes.Plane014.geometry}
						material={materials.interior_plastic}
					/>
					<mesh
						geometry={nodes.Plane014_1.geometry}
						material={materials.main_paintBody}
					/>
					<mesh
						geometry={nodes.rear_window.geometry}
						material={materials.glass}
						position={[0, 0.335, 0]}
					/>
				</group>
				<group position={[0.004, 0.833, 0.007]} rotation={[Math.PI / 2, 0, 0]}>
					<mesh
						geometry={nodes.Plane005.geometry}
						material={materials.main_paintBody}
					/>
					<mesh
						geometry={nodes.Plane005_1.geometry}
						material={materials.chromex}
					/>
				</group>
				<group position={[0.004, 0.835, 0.005]} rotation={[Math.PI / 2, 0, 0]}>
					<mesh
						geometry={nodes.Plane035.geometry}
						material={materials.chrome_darker}
					/>
					<mesh
						geometry={nodes.Plane035_1.geometry}
						material={materials.glass_tinted_red}
					/>
					<mesh
						geometry={nodes.Plane035_2.geometry}
						material={materials.chrome}
					/>
					<mesh
						geometry={nodes.taillight_glass.geometry}
						material={materials['Backlight red']}
					/>
					<mesh
						geometry={nodes.taillight_glass001.geometry}
						material={materials['tailliht white']}
					/>
					<group
						position={[0.684, -1.993, -0.183]}
						rotation={[0, 0, 0.56]}
						scale={0.003}
					>
						<mesh
							geometry={nodes.Cylinder001.geometry}
							material={materials.glass}
						/>
						<mesh
							geometry={nodes.Cylinder001_1.geometry}
							material={materials.LED}
						/>
					</group>
					<group
						position={[0.662, -2.037, -0.074]}
						rotation={[0, 0, 0.47]}
						scale={0.003}
					>
						<mesh
							geometry={nodes.Cylinder002.geometry}
							material={materials.glass}
						/>
						<mesh
							geometry={nodes.Cylinder002_1.geometry}
							material={materials.LED}
						/>
					</group>
					<mesh
						geometry={nodes.taillight001.geometry}
						material={materials.taillight_clear_rough}
					/>
					<mesh
						geometry={nodes.taillight002.geometry}
						material={materials.taillight_clear_rough}
					/>
				</group>
				<group position={[0, 0.831, 0]} rotation={[Math.PI / 2, 0, 0]}>
					<mesh
						geometry={nodes.Plane042.geometry}
						material={materials.headlight_plastic}
					/>
					<mesh
						geometry={nodes.Plane042_1.geometry}
						material={materials.headlight_chrome}
					/>
					<mesh
						geometry={nodes.Plane042_2.geometry}
						material={materials.headlight_trim}
					/>
					<mesh
						geometry={nodes.Plane042_3.geometry}
						material={materials.headlight_plastic_light}
					/>
					<mesh
						geometry={nodes.Plane042_4.geometry}
						material={materials.headlight_reflector}
					/>
					<mesh
						geometry={nodes.Plane042_5.geometry}
						material={materials.headligh_bulb_housing_rim}
					/>
					<mesh
						geometry={nodes.Plane042_6.geometry}
						material={materials.headlight_bulb_housing}
					/>
					<mesh
						geometry={nodes.Plane042_7.geometry}
						material={materials.glass}
					/>
					<mesh
						geometry={nodes.headlight_led_cover_2.geometry}
						material={materials.glass_difused}
					/>
					<mesh
						geometry={nodes.headlight_cover.geometry}
						material={materials.glass}
					/>
					<group
						position={[0.508, 2.098, 0.134]}
						rotation={[-2.055, 0.024, 0]}
						scale={-0.004}
					>
						<mesh
							geometry={nodes.Cube.geometry}
							material={materials.headlight_chrome}
						/>
						<mesh geometry={nodes.Cube_1.geometry} material={materials.LED} />
					</group>
					<group
						position={[0.581, 1.988, -0.035]}
						rotation={[-2.368, 0.501, -0.702]}
						scale={-0.004}
					>
						<mesh
							geometry={nodes.Cube001.geometry}
							material={materials.headlight_chrome}
						/>
						<mesh
							geometry={nodes.Cube001_1.geometry}
							material={materials.LED}
						/>
					</group>
					<group
						position={[0.8, 1.905, 0.04]}
						rotation={[-2.507, 0.569, 0.196]}
						scale={-0.004}
					>
						<mesh
							geometry={nodes.Cube003.geometry}
							material={materials.headlight_chrome}
						/>
						<mesh
							geometry={nodes.Cube003_1.geometry}
							material={materials.LED}
						/>
					</group>
				</group>
				<mesh
					geometry={nodes.windshield.geometry}
					material={materials.glass}
					position={[0.004, 0.833, 0.007]}
					rotation={[Math.PI / 2, 0, 0]}
				/>
				<group position={[0.004, 0.833, 0.007]} rotation={[Math.PI / 2, 0, 0]}>
					<mesh
						geometry={nodes.Plane039.geometry}
						material={materials.main_paintBody}
					/>
					<mesh
						geometry={nodes.Plane039_1.geometry}
						material={materials.interior_plastic}
					/>
					<mesh
						geometry={nodes.Plane039_2.geometry}
						material={materials.headlight_plastic}
					/>
					<mesh
						geometry={nodes.seat_front.geometry}
						material={materials.seat_leather}
						position={[0.397, 0.039, 0.25]}
						rotation={[-1.74, 0, 0]}
						scale={[1.564, 0.425, 1.737]}
					/>
					<mesh
						geometry={nodes.seat_rear.geometry}
						material={materials.seat_leather}
						position={[0.408, -1.283, -0.399]}
						rotation={[-1.447, 0, 0]}
						scale={0.14}
					/>
					<mesh
						geometry={nodes.steering_wheel.geometry}
						material={materials.headlight_plastic}
						position={[0.355, 0.326, -0.197]}
						rotation={[0.469, 0, Math.PI]}
						scale={0.187}
					/>
				</group>
				<group
					position={[0.903, 0.375, 1.441]}
					rotation={[Math.PI / 2, 0, -Math.PI / 2]}
					scale={0.174}
				>
					<mesh
						geometry={nodes.Cylinder004.geometry}
						material={materials.brake_rotor}
					/>
					<mesh
						geometry={nodes.Cylinder004_1.geometry}
						material={materials.brake_caliper}
					/>
				</group>
				<group
					position={[0.903, 0.378, -1.322]}
					rotation={[Math.PI / 2, 0, -Math.PI / 2]}
					scale={0.174}
				>
					<mesh
						geometry={nodes.Cylinder005.geometry}
						material={materials.brake_rotor}
					/>
					<mesh
						geometry={nodes.Cylinder005_1.geometry}
						material={materials.brake_caliper}
					/>
				</group>
				<mesh
					geometry={nodes.badge_glk.geometry}
					material={materials.chromex}
					position={[0.499, 1.076, -2.105]}
					rotation={[1.805, 0.097, -2.854]}
					scale={1.747}
				/>
				<mesh
					ref={wheelFrontRef}
					geometry={nodes.wheel_front.geometry}
					material={materials.rims}
					position={[0.903, 0.375, 1.441]}
					rotation={[Math.PI / 2, 0, -Math.PI / 2]}
					scale={0.355}
				>
					<mesh
						geometry={nodes.Bolt001.geometry}
						material={materials.screw}
						position={[-0.098, -0.195, -0.137]}
						scale={0.012}
					/>
					<group
						position={[0, -0.075, 0]}
						rotation={[0.115, 0, 0]}
						scale={0.102}
					>
						<mesh
							geometry={nodes.Circle004.geometry}
							material={materials.chromex}
						/>
						<mesh
							geometry={nodes.Circle004_1.geometry}
							material={materials.gloss}
						/>
					</group>
					<mesh
						geometry={nodes.tire_front.geometry}
						material={materials['Material.007']}
						position={[0.005, -0.9, -0.001]}
						rotation={[Math.PI / 2, 0, -Math.PI / 2]}
						scale={[0.159, 0.149, 0.214]}
					/>
				</mesh>
				<mesh
					ref={wheelBackRef}
					geometry={nodes.wheel_back.geometry}
					material={materials.rims}
					position={[0.903, 0.378, -1.322]}
					rotation={[Math.PI / 2, 0, -Math.PI / 2]}
					scale={0.355}
				>
					<mesh
						geometry={nodes.Bolt.geometry}
						material={materials.screw}
						position={[-0.098, -0.195, -0.137]}
						scale={0.012}
					/>
					<group
						position={[0, -0.075, 0]}
						rotation={[0.115, 0, 0]}
						scale={0.102}
					>
						<mesh
							geometry={nodes.Circle022.geometry}
							material={materials.chromex}
						/>
						<mesh
							geometry={nodes.Circle022_1.geometry}
							material={materials.gloss}
						/>
					</group>
					<mesh
						geometry={nodes.tire_back.geometry}
						material={materials['Material.007']}
						position={[0.005, -0.893, 0]}
						rotation={[Math.PI / 2, 0, -Math.PI / 2]}
						scale={[0.159, 0.149, 0.214]}
					/>
				</mesh>
				<group
					position={[0.475, 1.065, 0.936]}
					rotation={[0.721, 0.133, -0.297]}
					scale={0.012}
				>
					<mesh
						geometry={nodes.Cylinder006.geometry}
						material={materials.interior_plastic}
					/>
					<mesh
						geometry={nodes.Cylinder006_1.geometry}
						material={materials.plastic_satin}
					/>
				</group>
				<group
					position={[-0.087, 1.218, -2.122]}
					rotation={[-1.076, 0.207, -0.098]}
					scale={0.012}
				>
					<mesh
						geometry={nodes.Cylinder008.geometry}
						material={materials.interior_plastic}
					/>
					<mesh
						geometry={nodes.Cylinder008_1.geometry}
						material={materials.plastic_satin}
					/>
				</group>
				<group position={[0.516, 0.399, -2.072]} scale={0.04}>
					<mesh
						geometry={nodes.Cube002.geometry}
						material={materials.exhaust}
					/>
					<mesh
						geometry={nodes.Cube002_1.geometry}
						material={materials.plastic}
					/>
				</group>
			</group>
		</>
	);
}

useGLTF.preload('/models/car.glb');
