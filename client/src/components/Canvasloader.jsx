import { Html, useProgress } from "@react-three/drei";

const Canvasloader = () => {
    const { progress } = useProgress

    return (
        <Html
            center
            as="div"
            style={{
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                flexDirection:'column'
            }}
        >
            <p style={{fontSize:14, color:'black', fontWeight:800, marginTop:40}}>
                {progress !== 0 ? `${progress.toFixed(2)}%`: 'loading...'}
            </p>
        </Html>
    )
}

export default Canvasloader
