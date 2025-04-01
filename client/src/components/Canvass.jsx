import React, {Suspense} from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { motion,AnimatePresence } from 'framer-motion'
import Canvasloader from './Canvasloader'
import AiModel from './AiModel'
import CanvasCamera from './CanvasCamera'
import Box from '../canvas/Box'
import Toru from '../canvas/Toru'
import Cones from "../canvas/Cones"
import Tube from '../canvas/Tube'
import state from '../store'
import { useSnapshot } from 'valtio'
import Backdrop from './Backdrop'

const Canvass = () => {
    const snap = useSnapshot(state)

    return (       
        <AnimatePresence>
            <motion.div className='canvas'>
                <Canvas 
                    shadows
                    gl={{preserveDrawingBuffer: true}}
                >
                    <Suspense fallback={<Canvasloader/>} >
                        <OrbitControls enableZoom={true} enablePan enableRotate={false}/>
                        <PerspectiveCamera makeDefault position={[0,0,0]} />
                        <CanvasCamera>
                            <Backdrop />
                            <AiModel 
                                scale={1} 
                                position={[-2, 0, 0]} 
                                rotation={[-1,0,-0.5]} 
                            />
                            <Box scale={0.30} position={[-0.5,-1.5,-0.5]} color='blue'/>
                            <Toru scale={0.15} position={[2,2,0]} color='yellow'/>
                            <Cones scale={0.25} position={[2.5,-1.5,-0.5]} color='red'/>
                            <Tube scale={0.15} position={[-2.2,1.5,-1]} color='green'/>
                        </CanvasCamera>
                        <ambientLight intensity={5} />
                        <directionalLight 
                            position={[2, 5, 3]}
                            intensity={1}
                            castShadow
                            shadow-mapSize={[1024, 1024]}
                            shadow-bias={-0.0001}
                        /> 
                    </Suspense>

                </Canvas>
            </motion.div>
        </AnimatePresence>
    )
    
}

export default Canvass
