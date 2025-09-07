import { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'

export function MassIndicator({ physicsApi, mass, name }) {
  const indicatorRef = useRef()
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 })
  
  // Calculate size based on mass - normalize to a reasonable range
  const baseSize = 0.1
  const massScale = Math.max(0.5, Math.min(2.0, mass / 5.5)) // Normalize around the default scale of 5.5
  const indicatorSize = baseSize * massScale
  
  // Color scheme based on mass - lighter colors for lower mass, darker for higher mass
  const getMassColor = (mass) => {
    const normalizedMass = Math.max(0, Math.min(1, (mass - 3) / 8)) // Normalize mass to 0-1 range
    // Interpolate between light yellow (low mass) and dark orange (high mass)
    const r = 1.0
    const g = 1.0 - normalizedMass * 0.3 // From 1.0 to 0.7
    const b = 0.2 + normalizedMass * 0.3 // From 0.2 to 0.5
    return `rgb(${Math.floor(r * 255)}, ${Math.floor(g * 255)}, ${Math.floor(b * 255)})`
  }
  
  const massColor = getMassColor(mass)
  
  // Subscribe to position changes from physics API
  useEffect(() => {
    if (!physicsApi) return

    const unsubscribePosition = physicsApi.position.subscribe((p) => {
      setPosition({ x: p[0], y: p[1], z: p[2] })
    })

    return () => {
      unsubscribePosition()
    }
  }, [physicsApi])
  
  useFrame(() => {
    if (indicatorRef.current) {
      // Position the mass indicator above the bone
      indicatorRef.current.position.set(position.x, position.y + 0.5, position.z)
    }
  })
  
  return (
    <RoundedBox
      ref={indicatorRef}
      args={[indicatorSize, indicatorSize, indicatorSize]}
      castShadow={false}
      receiveShadow={false}
    >
      <meshStandardMaterial
        color={massColor}
        transparent={true}
        opacity={0.6}
      />
    </RoundedBox>
  )
}