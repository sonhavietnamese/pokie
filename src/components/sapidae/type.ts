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
