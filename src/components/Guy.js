import React, { createContext, useContext, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useBox, useConeTwistConstraint } from '@react-three/cannon'
import { createRagdoll } from '../helpers/createRagdoll'
import { useDragConstraint } from '../helpers/Drag'
import { Block } from '../helpers/Block'
import { VelocityIndicator } from './VelocityIndicator'
import { MassIndicator } from './MassIndicator'
import { HingeIndicator } from './HingeIndicator'

const { shapes, joints } = createRagdoll(5.5, Math.PI / 16, Math.PI / 16, 0)
const context = createContext()

function Face() {
  const mouth = useRef()
  const eyes = useRef()
  useFrame((state) => {
    eyes.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1
    mouth.current.scale.y = (1 + Math.sin(state.clock.elapsedTime * 2)) * 0.6
  })
  return (
    <>
      <group ref={eyes}>
        <Block position={[-0.3, 0.1, 0.5]} args={[0.2, 0.1, 0.1]} color="black" transparent opacity={0.8} />
        <Block position={[0.3, 0.1, 0.5]} args={[0.2, 0.1, 0.1]} color="black" transparent opacity={0.8} />
      </group>
      <Block ref={mouth} position={[0, -0.2, 0.5]} args={[0.3, 0.05, 0.1]} color="#700000" transparent opacity={0.8} />
    </>
  )
}

// Enhanced BodyPart wrapper that tracks its own API for passing to children
const BodyPart = ({ config, children, render, name, visualizationMode, parentApi, ...props }) => {
  const { color, args, mass, position } = shapes[name]
  const parent = useContext(context)
  const [ref, api] = useBox(() => ({ mass, args, position, linearDamping: 0.99, ...props }))
  useConeTwistConstraint(ref, parent, config)
  const bind = useDragConstraint(ref)
  
  return (
    <context.Provider value={ref}>
      <Block castShadow receiveShadow ref={ref} {...props} {...bind} scale={args} name={name} color={color}>
        {render}
      </Block>
      {/* Render physics indicators when in physics mode */}
      {visualizationMode === 'physics' && (
        <>
          <VelocityIndicator physicsApi={api} />
          <MassIndicator physicsApi={api} mass={mass} name={name} />
        </>
      )}
      {/* Render hinge indicator when in hinges mode and there's a parent connection */}
      {visualizationMode === 'hinges' && config && parentApi && (
        <HingeIndicator 
          parentPhysicsApi={parentApi} 
          childPhysicsApi={api} 
          jointConfig={config}
          jointName={name}
        />
      )}
      {/* Pass this component's API as parentApi to children */}
      {typeof children === 'function' ? children(api) : children}
    </context.Provider>
  )
}

export function Guy({ visualizationMode, ...props }) {
  return (
    <BodyPart name="upperBody" visualizationMode={visualizationMode} {...props}>
      {(upperBodyApi) => (
        <>
          <BodyPart 
            {...props} 
            visualizationMode={visualizationMode} 
            name="head" 
            config={joints['neckJoint']} 
            parentApi={upperBodyApi}
            render={<Face />} 
          />
          <BodyPart 
            {...props} 
            visualizationMode={visualizationMode} 
            name="upperLeftArm" 
            config={joints['leftShoulder']}
            parentApi={upperBodyApi}
          >
            {(upperLeftArmApi) => (
              <BodyPart 
                {...props} 
                visualizationMode={visualizationMode} 
                name="lowerLeftArm" 
                config={joints['leftElbowJoint']}
                parentApi={upperLeftArmApi}
              />
            )}
          </BodyPart>
          <BodyPart 
            {...props} 
            visualizationMode={visualizationMode} 
            name="upperRightArm" 
            config={joints['rightShoulder']}
            parentApi={upperBodyApi}
          >
            {(upperRightArmApi) => (
              <BodyPart 
                {...props} 
                visualizationMode={visualizationMode} 
                name="lowerRightArm" 
                config={joints['rightElbowJoint']}
                parentApi={upperRightArmApi}
              />
            )}
          </BodyPart>
          <BodyPart 
            {...props} 
            visualizationMode={visualizationMode} 
            name="pelvis" 
            config={joints['spineJoint']}
            parentApi={upperBodyApi}
          >
            {(pelvisApi) => (
              <>
                <BodyPart 
                  {...props} 
                  visualizationMode={visualizationMode} 
                  name="upperLeftLeg" 
                  config={joints['leftHipJoint']}
                  parentApi={pelvisApi}
                >
                  {(upperLeftLegApi) => (
                    <BodyPart 
                      {...props} 
                      visualizationMode={visualizationMode} 
                      name="lowerLeftLeg" 
                      config={joints['leftKneeJoint']}
                      parentApi={upperLeftLegApi}
                    />
                  )}
                </BodyPart>
                <BodyPart 
                  {...props} 
                  visualizationMode={visualizationMode} 
                  name="upperRightLeg" 
                  config={joints['rightHipJoint']}
                  parentApi={pelvisApi}
                >
                  {(upperRightLegApi) => (
                    <BodyPart 
                      {...props} 
                      visualizationMode={visualizationMode} 
                      name="lowerRightLeg" 
                      config={joints['rightKneeJoint']}
                      parentApi={upperRightLegApi}
                    />
                  )}
                </BodyPart>
              </>
            )}
          </BodyPart>
        </>
      )}
    </BodyPart>
  )
}
