import type * as THREE from 'three';

export type THREE_REF = React.RefObject<THREE_GROUP | undefined>;

export type THREE_GROUP = THREE.Group<THREE.Object3DEventMap>;
