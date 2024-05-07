import type * as THREE from 'three'
import type { GLTF } from 'three-stdlib'

export type SapidaeAnimation =
	| 'idle-00'
	| 'idle-01'
	| 'idle-02'
	| 'walk'
	| 'run'
	| 'jump'
	| 'swing'
	| 'pet-animal'
	| 'floating'
	| 'swim'
	| 'swing-stick'
	| 'swing-stick-01'
	| 'talk-00'
	| 'talk-01'
	| 'throw'
	| 'throw-00'
	| 'wave-01'
	| 'clap-01'
	| 'fight-00'
	| 'fight-01'
	| 'fight-02'
	| 'fight-03'
	| 'gesture-01'
	| 'gesture-02'
	| 'gesture-03'

export type SapidaeGLTFResult = GLTF & {
	nodes: {
		Sapidae_male_arms2_new001: THREE.SkinnedMesh
		Sapidae_male_arms2_new002: THREE.SkinnedMesh
		Sapidae_male_arms2_new003: THREE.SkinnedMesh
		mixamorigHips: THREE.Bone
		mixamorigNeck: THREE.Bone
	}
	materials: {
		lambert11: THREE.MeshStandardMaterial
	}
	animations: string[]
}
