import { useTexture } from '@react-three/drei'
import type * as THREE from 'three'

export default function useTextureFactory() {
	const [
		skinDefault,
		skinBlue,
		skinGreen,
		skinPurple,
		skinYellow,
		eyeOpen,
		eyeClose,
	] = useTexture([
		'/textures/sapidae/skin-default.png',
		'/textures/sapidae/skin-blue.png',
		'/textures/sapidae/skin-green.png',
		'/textures/sapidae/skin-purple.png',
		'/textures/sapidae/skin-yellow.png',

		'/textures/sapidae/skin-default.png',
		'/textures/sapidae/skin-eye-close.png',
	])

	skinDefault.flipY = false
	skinBlue.flipY = false
	skinGreen.flipY = false
	skinPurple.flipY = false
	skinYellow.flipY = false

	eyeOpen.flipY = false
	eyeClose.flipY = false

	skinDefault.needsUpdate = true
	skinBlue.needsUpdate = true
	skinGreen.needsUpdate = true
	skinPurple.needsUpdate = true
	skinYellow.needsUpdate = true

	eyeOpen.needsUpdate = true
	eyeClose.needsUpdate = true

	const skins: Record<string, THREE.Texture> = {
		DEFAULT: skinDefault,
		BLUE: skinBlue,
		GREEN: skinGreen,
		PURPLE: skinPurple,
		YELLOW: skinYellow,

		EYE_OPEN: eyeOpen,
		EYE_CLOSE: eyeClose,
	}

	return { skins }
}
