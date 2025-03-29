import React,{ useRef } from 'react'
import { useFrame } from '@react-three/fiber';
import { easing } from "maath";

const CanvasCamera = ({ children }) => {
  const groupRef = useRef();

  useFrame((state,delta)=>{
    easing.dampE(groupRef.current.rotation, [-state.pointer.y / 10, -state.pointer.x / 10, 0], 0.25, delta)
  })

  return (
    <group ref={groupRef}>
      {children}
    </group>
  )
}

export default CanvasCamera;
