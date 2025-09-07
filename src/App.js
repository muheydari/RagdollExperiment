import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { MeshReflectorMaterial } from '@react-three/drei'
import { Physics, usePlane } from '@react-three/cannon'
import { Cursor } from './helpers/Drag'
import { Guy } from './components/Guy'
import { Mug, Chair, Table, Lamp } from './components/Furniture'

export default function App() {
  const [visualizationMode, setVisualizationMode] = useState('off') // 'off' | 'physics' | 'hinges'

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key.toLowerCase() === 'v') {
        setVisualizationMode(prev => {
          switch (prev) {
            case 'off':
              return 'physics'
            case 'physics':
              return 'hinges'
            case 'hinges':
              return 'off'
            default:
              return 'off'
          }
        })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <>
      <Canvas dpr={[1, 2]} shadows camera={{ position: [-40, 40, 40], fov: 25, near: 1, far: 100 }}>
        <color attach="background" args={['#2a2a3a']} />
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
        />
        <Physics allowSleep={false} iterations={15} gravity={[0, -200, 0]}>
          <Cursor />
          <Guy rotation={[-Math.PI / 3, 0, 0]} visualizationMode={visualizationMode} />
          <Floor position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]} />
          <Chair position={[0, 0, -2.52]} />
          <Table position={[8, 0, 0]} />
          <Mug position={[8, 3, 0]} />
          <Lamp position={[0, 15, 0]} />
        </Physics>
      </Canvas>
      {/* Visualization mode indicator */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        color: 'white',
        fontSize: '16px',
        fontFamily: 'Arial, sans-serif',
        background: 'rgba(0, 0, 0, 0.5)',
        padding: '8px 12px',
        borderRadius: '4px',
        zIndex: 1000
      }}>
        Visualization: {visualizationMode === 'off' ? 'Off' : visualizationMode === 'physics' ? 'Physics Data' : 'Hinges'} (Press 'V' to cycle)
      </div>
    </>
  )
}

function Floor(props) {
  const [ref] = usePlane(() => ({ type: 'Static', ...props }))
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <MeshReflectorMaterial
        color="#a0a0b0"
        blur={[300, 100]}
        resolution={1024}
        mixBlur={1}
        mixStrength={2}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        metalness={0.1}
        roughness={0.8}
      />
    </mesh>
  )
}
