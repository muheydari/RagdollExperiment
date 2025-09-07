import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'

export function VelocityIndicator({ physicsApi }) {
  const arrowRef = useRef()
  const shaftRef = useRef()
  const headRef = useRef()
  const shaftMaterialRef = useRef()
  const headMaterialRef = useRef()
  const [velocity, setVelocity] = useState({ x: 0, y: 0, z: 0 })
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 })

  // Subscribe to velocity and position changes from physics API
  useEffect(() => {
    if (!physicsApi) return

    const unsubscribeVelocity = physicsApi.velocity.subscribe((v) => {
      setVelocity({ x: v[0], y: v[1], z: v[2] })
    })

    const unsubscribePosition = physicsApi.position.subscribe((p) => {
      setPosition({ x: p[0], y: p[1], z: p[2] })
    })

    return () => {
      unsubscribeVelocity()
      unsubscribePosition()
    }
  }, [physicsApi])

  useFrame(() => {
    if (!arrowRef.current) return

    const velocityVector = new Vector3(velocity.x, velocity.y, velocity.z)
    const magnitude = velocityVector.length()

    // Position the arrow at the center of mass (physics body position)
    arrowRef.current.position.set(position.x, position.y, position.z)

    // Hide arrow if velocity is very small
    if (magnitude < 0.1) {
      arrowRef.current.visible = false
      return
    }

    arrowRef.current.visible = true

    // Scale arrow length based on velocity magnitude (max length of 2 units)
    const maxLength = 2
    const scaledLength = Math.min(magnitude / 5, maxLength)

    // Update shaft scale based on velocity magnitude
    if (shaftRef.current) {
      shaftRef.current.scale.set(0.05, scaledLength, 0.05)
      shaftRef.current.position.set(0, scaledLength / 2, 0)
    }

    // Update head position
    if (headRef.current) {
      headRef.current.position.set(0, scaledLength, 0)
    }

    // Rotate arrow to point in velocity direction
    const direction = velocityVector.clone().normalize()
    const up = new Vector3(0, 1, 0)
    const quaternion = arrowRef.current.quaternion
    quaternion.setFromUnitVectors(up, direction)

    // Color coding: blue for slow (0-5), green for medium (5-15), red for fast (15+)
    let color = '#0066ff' // blue for slow
    if (magnitude > 15) {
      color = '#ff0000' // red for fast
    } else if (magnitude > 5) {
      color = '#00ff00' // green for medium
    }

    if (shaftMaterialRef.current) shaftMaterialRef.current.color.set(color)
    if (headMaterialRef.current) headMaterialRef.current.color.set(color)
  })

  return (
    <group ref={arrowRef} visible={false}>
      {/* Arrow shaft */}
      <mesh ref={shaftRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial ref={shaftMaterialRef} color="#0066ff" />
      </mesh>
      {/* Arrow head */}
      <mesh ref={headRef}>
        <coneGeometry args={[0.1, 0.2, 8]} />
        <meshBasicMaterial ref={headMaterialRef} color="#0066ff" />
      </mesh>
    </group>
  )
}