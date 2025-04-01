import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";

const Tube = (props) => {

    const meshref = useRef();
    useFrame(()=>{
        if(meshref.current){
            // meshref.current.rotation.x += 0.01
            meshref.current.rotation.y += 0.01
            // meshref.current.rotation.y += 0.01
        }
    })

    const path = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-2, 0, 0),
        new THREE.Vector3(-1, 1, 0),
        new THREE.Vector3(1, 1, 0),
        new THREE.Vector3(2, 0, 0),
      ]);
    
      return (
        <Float>
            <mesh {...props} ref={meshref}>
            <tubeGeometry args={[path, 20, 0.1, 8, false]} />
            <meshLambertMaterial color={props.color} emissive={props.color} />
            </mesh>
        </Float>
      );
}

export default Tube
