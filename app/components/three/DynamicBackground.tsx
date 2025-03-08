// En un nuevo archivo: /app/components/three/DynamicBackground.tsx
'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function DynamicBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    
    // Configuración básica de Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    
    // Posición de la cámara
    camera.position.z = 5;
    
    // Creación de geometría fluida
    const geometry = new THREE.PlaneGeometry(20, 20, 128, 128);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        mousePosition: { value: new THREE.Vector2(0, 0) }
      },
      vertexShader: `
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
      `,
      fragmentShader: `
        uniform float time;
        varying vec2 vUv;
        
        void main() {
          // Gradiente de color fluido que cambia con el tiempo
          vec3 color1 = vec3(0.0, 0.94, 1.0);  // #00f0ff (primary)
          vec3 color2 = vec3(1.0, 0.0, 0.6);   // #ff0099 (secondary)
          vec3 color3 = vec3(1.0, 1.0, 0.0);   // #ffff00 (accent)
          
          float noiseValue = sin(vUv.x * 10.0 + time) * sin(vUv.y * 10.0 + time) * 0.5 + 0.5;
          vec3 color = mix(color1, color2, vUv.x);
          color = mix(color, color3, noiseValue);
          
          gl_FragColor = vec4(color, 0.1 + 0.1 * sin(time + vUv.x * 5.0));
        }
      `,
      transparent: true,
      wireframe: false,
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    // Seguimiento del movimiento del ratón
    const mousePosition = { x: 0, y: 0 };
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
      material.uniforms.mousePosition.value = new THREE.Vector2(mousePosition.x * 5, mousePosition.y * 5);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animación
    const clock = new THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      material.uniforms.time.value = elapsedTime;
      
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Manejo de cambio de tamaño de ventana
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
    };
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
      }, []);
  
  return <div ref={containerRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
}