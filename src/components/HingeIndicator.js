import { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import { Vector3 } from 'three'

export function HingeIndicator({ parentPhysicsApi, childPhysicsApi, jointConfig, jointName }) {
  const indicatorRef = useRef()
  const [parentPosition, setParentPosition] = useState({ x: 0, y: 0, z: 0 })
  const [childPosition, setChildPosition] = useState({ x: 0, y: 0, z: 0 })

  // Subscribe to position changes from both physics APIs
  useEffect(() => {
    if (!parentPhysicsApi || !childPhysicsApi) return

    const unsubscribeParent = parentPhysicsApi.position.subscribe((p) => {
      setParentPosition({ x: p[0], y: p[1], z: p[2] })
    })

    const unsubscribeChild = childPhysicsApi.position.subscribe((p) => {
      setChildPosition({ x: p[0], y: p[1], z: p[2] })
    })

    return () => {
      unsubscribeParent()
      unsubscribeChild()
    }
  }, [parentPhysicsApi, childPhysicsApi])

  // Color scheme for different joint types based on body part names
  const getJointColor = (jointName) => {
    const name = jointName.toLowerCase()
    if (name.includes('arm')) return '#ff6b6b' // Red for arms
    if (name.includes('leg')) return '#45b7d1' // Blue for legs
    if (name.includes('head')) return '#ffeaa7' // Yellow for head/neck
    if (name.includes('pelvis')) return '#dda0dd' // Purple for spine/pelvis
    return '#fd79a8' // Pink for other joints
  }

  const jointColor = getJointColor(jointName)

  useFrame(() => {
    if (!indicatorRef.current || !jointConfig) return

    // Calculate the joint position based on the pivot points and body positions
    const parentPos = new Vector3(parentPosition.x, parentPosition.y, parentPosition.z)
    const childPos = new Vector3(childPosition.x, childPosition.y, childPosition.z)
    
    // Use pivot points from joint configuration to get more accurate joint position
    const pivotA = jointConfig.pivotA || [0, 0, 0]
    const pivotB = jointConfig.pivotB || [0, 0, 0]
    
    // Transform pivot points to world space (simplified - assumes no rotation)
    const parentJointPos = parentPos.clone().add(new Vector3(pivotA[0], pivotA[1], pivotA[2]))
    const childJointPos = childPos.clone().add(new Vector3(pivotB[0], pivotB[1], pivotB[2]))
    
    // Use the average of the two pivot positions
    const jointPosition = parentJointPos.clone().add(childJointPos).multiplyScalar(0.5)
    
    indicatorRef.current.position.copy(jointPosition)
  })

  return (
    <RoundedBox
      ref={indicatorRef}
      args={[0.15, 0.15, 0.15]} // Small sphere-like rounded box
      castShadow={false}
      receiveShadow={false}
    >
      <meshStandardMaterial
        color={jointColor}
        transparent={true}
        opacity={0.8}
        emissive={jointColor}
        emissiveIntensity={0.2}
      />
    </RoundedBox>
  )
}