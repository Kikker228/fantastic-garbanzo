import React, { Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Создание пользовательского ShaderMaterial
const vertexShader = `
  uniform float time;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 pos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform float time;
  varying vec2 vUv;
  void main() {
    vec3 color = vec3(sin(time), cos(time), 1.0);
    gl_FragColor = vec4(color, 1.0);
  }
`;

function Particles() {
  const ref = React.useRef();

  useFrame(({ clock }) => {
    ref.current.material.uniforms.time.value = clock.getElapsedTime();
  });

  const numParticles = 5000;
  const positions = new Float32Array(numParticles * 3);

  for (let i = 0; i < numParticles; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = Math.random() * 10;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
    },
    vertexShader,
    fragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  return (
    <points ref={ref}>
      <primitive object={geometry} />
      <shaderMaterial attach="material" args={[material]} />
    </points>
  );
}

function Background() {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <Particles />
      </Suspense>
    </Canvas>
  );
}

export default Background;
