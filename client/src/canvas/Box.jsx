import React, {useRef} from 'react'
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

const Box = (props) => {
    const meshRef = useRef();
    useFrame(()=>{
        if(meshRef.current){
            meshRef.current.rotation.x += 0.01
            meshRef.current.rotation.y += 0.01
            meshRef.current.rotation.z += 0.01
        }
    })
  return (
        <mesh ref={meshRef} {...props}>
            <boxGeometry args={[1,1,1]}/>
            <meshLambertMaterial color={props.color} emissive={props.color}/>
        </mesh>
  )
}

export default Box
