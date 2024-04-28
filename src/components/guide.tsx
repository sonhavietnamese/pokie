// function Banner(props) {
// 	const ref = useRef()
// 	const texture = useTexture('/emote-angry.png')

// 	texture.wrapS = texture.wrapT = THREE.RepeatWrapping
// 	const scroll = useScroll()

// 	// useFrame((state, delta) => {
// 	// 	ref.current.material.map.offset.x += delta / 2
// 	// })

// 	// useFrame((state, delta) => {
// 	// 	ref.current.material.time.value += Math.abs(scroll.delta) * 4
// 	// 	ref.current.material.map.offset.x += delta / 2
// 	// })

// 	return (
// 		<mesh {...props}>
// 			<Sapidae />
// 			{/* <torusKnotGeometry args={[0.5, 0.2, 110, 20, 2, 3]} /> */}
// 		</mesh>
// 	)
// }
// // <mesh ref={ref} {...props}>
// // 	<cylinderGeometry args={[1.6, 1.6, 0.14, 128, 16, true]} />
// // 	<meshBasicMaterial map={texture} alphaTest={0.5} />

// // 	{/* <meshSineMaterial
// // 		map={texture}
// // 		alphaTest={0.5}
// // 		map-anisotropy={16}
// // 		map-repeat={[30, 1]}
// // 		side={THREE.DoubleSide}
// // 		toneMapped={false}
// // 	/> */}
// // </mesh>

// class MeshSineMaterial extends THREE.MeshBasicMaterial {
// 	constructor(parameters = {}) {
// 		super(parameters)
// 		this.setValues(parameters)
// 		this.time = { value: 0 }
// 	}
// 	onBeforeCompile(shader) {
// 		shader.uniforms.time = this.time
// 		shader.vertexShader = `
//       uniform float time;
//       ${shader.vertexShader}
//     `
// 		shader.vertexShader = shader.vertexShader.replace(
// 			'#include <begin_vertex>',
// 			`vec3 transformed = vec3(position.x, position.y + sin(time + uv.x * PI * 4.0) / 4.0, position.z);`,
// 		)
// 	}
// }

// extend({ MeshSineMaterial })
