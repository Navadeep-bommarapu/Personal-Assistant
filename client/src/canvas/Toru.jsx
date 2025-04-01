import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const Rings = (props) => {
    const meshref = useRef();
    useFrame(()=>{
        if(meshref.current){
            meshref.current.rotation.x += 0.01
            meshref.current.rotation.y += 0.01
        }
    })

  return (
    <mesh ref={meshref} {...props}>
      <torusGeometry args={[1.5, 1, 10, 100]} rotate={[0,0,0]}/>
      <meshLambertMaterial color={props.color} />
    </mesh>
  )
}

export default Rings
