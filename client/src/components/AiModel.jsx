import React, {useRef} from 'react'
import { useGLTF, Float } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { easing } from "maath"
import { color } from 'framer-motion'

const AiModel = (props) => {
    const  {nodes, materials} = useGLTF('/shirt_baked.glb')


    useFrame((state, delta) => {
        easing.damp3(state.camera.position, [0,0,-5], 0.25, delta)

        easing.dampC(materials.lambert1.color,  0.25, delta);
    });

    return (
        // <Float floatIntensity={1}>
            <group {...props}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.T_Shirt_male.geometry}
                    material={materials.lambert1}
                    material-roughness={1}
                    dispose={null}
                />
            </group>
        // </Float>
    )
}

useGLTF.preload("/shirt_baked.glb")

export default AiModel
