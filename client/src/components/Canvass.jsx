import React, {Suspense} from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { motion,AnimatePresence } from 'framer-motion'
import Canvasloader from './Canvasloader'
import AiModel from './AiModel'
import { canvasAnimation } from '../config/motion'
import CanvasCamera from './CanvasCamera'

const Canvass = () => {


    return (       
        <AnimatePresence>
            <motion.div className='sm:relative absolute w-full h-screen pointer-events-none ' {...canvasAnimation("left")}>
                <Canvas >
                    <Suspense fallback={<Canvasloader />} >
                        <OrbitControls enableZoom={true} enablePan enableRotate={true}/>
                        <PerspectiveCamera makeDefault position={[0,0,-0]} />
                        <CanvasCamera>
                            <AiModel 
                                scale={3} 
                                position={[-1.5, 0, -1]} 
                                rotation={[0,3,0]} 
                            />
                        </CanvasCamera>
                        <ambientLight intensity={1} />
                        <directionalLight position={[0,3,0]} scale={3} intensity={0.5} /> 
                    </Suspense>

                </Canvas>
            </motion.div>
        </AnimatePresence>
    )
    
}

export default Canvass
