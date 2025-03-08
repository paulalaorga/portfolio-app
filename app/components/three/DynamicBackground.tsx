'use client';

import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useState, useEffect } from 'react';

interface AnimatedPlaneProps {
  mousePosition: THREE.Vector2;
}

function AnimatedPlane({ mousePosition }: AnimatedPlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const uniformsRef = useRef({
    time: { value: 0 },
    mousePosition: { value: new THREE.Vector2(0, 0) },
    resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
  });

  // Actualizar posición del ratón y tiempo de animación
  useFrame(({ clock }) => {
    if (meshRef.current) {
      uniformsRef.current.time.value = clock.getElapsedTime();
      uniformsRef.current.mousePosition.value.copy(mousePosition);
    }
  });

  const vertexShader = `
    uniform float time;
    uniform vec2 mousePosition;
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      
      // Calcular distancia al cursor
      vec3 pos = position;
      float dist = distance(mousePosition, vec2(pos.x, pos.y));
      
      // Efecto de onda basado en la distancia al cursor
      float amplitude = 0.1;
      float frequency = 5.0;
      float speed = 0.3;
      
      pos.z += sin(dist * frequency - time * speed) * amplitude * (1.0 - min(1.0, dist));
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float time;
    varying vec2 vUv;
    uniform vec2 resolution;
    
    void main() {
      // Gradiente de color fluido que cambia con el tiempo
      vec3 color1 = vec3(0.0, 0.94, 1.0);  // #00f0ff (primary)
      vec3 color2 = vec3(1.0, 0.0, 0.6);   // #ff0099 (secondary)
      vec3 color3 = vec3(1.0, 1.0, 0.0);   // #ffff00 (accent)
      
      // Coordenadas normalizadas
      vec2 uv = gl_FragCoord.xy / resolution.xy;
      
      // Efecto de distorsión basado en el tiempo
      float noiseValue = sin(vUv.x * 10.0 + time) * sin(vUv.y * 10.0 + time * 0.5) * 0.5 + 0.5;
      
      // Mezclar colores basados en coordenadas y tiempo
      vec3 color = mix(color1, color2, vUv.x + sin(time * 0.2) * 0.2);
      color = mix(color, color3, noiseValue * sin(time * 0.1) * 0.3);
      
      // Añadir viñeteado suave
      float vignetteAmount = 1.0 - smoothstep(0.4, 1.5, length(vUv * 2.0 - 1.0));
      color = mix(color * 0.5, color, vignetteAmount);
      
      // Opacidad animada para efecto de nebulosa
      float alpha = 0.15 + 0.1 * sin(time + vUv.x * 5.0 + vUv.y * 3.0);
      
      gl_FragColor = vec4(color, alpha);
    }
  `;

  // Usar un plano grande que cubra toda la pantalla
  return (
    <mesh ref={meshRef} position={[0, 0, 0]} rotation={[-Math.PI / 4, 0, 0]}>
      <planeGeometry args={[35, 35, 128, 128]} />
      <shaderMaterial
        uniforms={uniformsRef.current}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function DynamicBackground() {
  const [mousePosition, setMousePosition] = useState<THREE.Vector2>(new THREE.Vector2(0, 0));
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });
  
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition(new THREE.Vector2(x * 5, y * 5));
    };
    
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    // Para dispositivos móviles, simular movimiento aleatorio suave del ratón
    let animationFrame: number;
    
    const simulateMouseMovement = () => {
      // Solo simulamos en móviles o si no hay movimiento del ratón
      if (window.innerWidth <= 768) {
        const time = Date.now() * 0.001;
        const x = Math.sin(time * 0.5) * 3;
        const y = Math.cos(time * 0.3) * 3;
        setMousePosition(new THREE.Vector2(x, y));
      }
      
      animationFrame = requestAnimationFrame(simulateMouseMovement);
    };
    
    simulateMouseMovement();
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <Canvas 
      camera={{ position: [0, 0, 10], fov: 55 }}
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%' 
      }}
    >
      <ambientLight intensity={0.1} />
      <AnimatedPlane mousePosition={mousePosition} />
    </Canvas>
  );
}