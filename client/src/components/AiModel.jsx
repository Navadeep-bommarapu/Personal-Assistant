import React, {useRef} from 'react'
import { useGLTF, Float } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { easing } from "maath"

const AiModel = (props) => {
    const  {nodes, materials} = useGLTF('/chocolate-donut.glb')
    const meshref = useRef()

    useFrame((state, delta) => {
        // if(meshref.current){
        //     meshref.current.rotation.z += 0.01
        // }
        easing.damp3(state.camera.position, [0,0,-5], 0.25, delta)

        easing.dampC(materials.donut_texture.color,  0.25, delta);
    });

    

    return (
            <group {...props} ref={meshref}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.donut.geometry}
                    material={materials.donut_texture}
                    material-roughness={1}
                    dispose={null}
                    color={materials.donut_texture.color}
                />
                <mesh 
                    geometry={nodes.icing.geometry}
                    material={materials.icing_texture}
                    color={materials.icing_texture.color}
                />
            </group>
    )
}

useGLTF.preload("/chocolate-donut.glb")

export default AiModel
