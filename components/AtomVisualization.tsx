import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderMaterial } from 'three';

const AtomVisualization: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const mountElement = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountElement.appendChild(renderer.domElement);

    const atomGroup = new THREE.Group();
    scene.add(atomGroup);

    // Nucleus
    const nucleusGeometry = new THREE.SphereGeometry(0.5, 64, 64);
    const nucleusMaterial = new ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0x00ffff) }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color;
        varying vec2 vUv;
        varying vec3 vNormal;
        
        void main() {
          float noise = sin(vUv.x * 10.0 + time) * cos(vUv.y * 10.0 + time) * 0.5 + 0.5;
          vec3 glow = color * (noise * 0.5 + 0.5);
          float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(glow + color * fresnel, 1.0);
        }
      `
    });
    const nucleus = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
    atomGroup.add(nucleus);

    // Orbiting particles with trails
    const orbitingParticlesCnt = 10;
    const trailLength = 60;
    const orbitingParticlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(orbitingParticlesCnt * trailLength * 3);
    const opacities = new Float32Array(orbitingParticlesCnt * trailLength);

    // Generate random elliptical orbits
    const orbits = Array(orbitingParticlesCnt).fill(0).map(() => ({
      a: 6 + Math.random() * 6,
      b: 4 + Math.random() * 4,
      angle: Math.random() * Math.PI * 2,
      offset: new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      ),
      speed: 0.5 + Math.random() * 0.5
    }));

    for (let i = 0; i < orbitingParticlesCnt; i++) {
      for (let j = 0; j < trailLength; j++) {
        const index = i * trailLength + j;
        positions[index * 3] = 0;
        positions[index * 3 + 1] = 0;
        positions[index * 3 + 2] = 0;
        opacities[index] = j / trailLength;
      }
    }

    orbitingParticlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    orbitingParticlesGeometry.setAttribute('opacity', new THREE.BufferAttribute(opacities, 1));

    const orbitingParticlesMaterial = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(0x00FF00) },
      },
      vertexShader: `
        attribute float opacity;
        varying float vOpacity;
        void main() {
          vOpacity = opacity;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = 3.0 * (1.0 - opacity);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        varying float vOpacity;
        void main() {
          gl_FragColor = vec4(color, vOpacity);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const orbitingParticlesMesh = new THREE.Points(orbitingParticlesGeometry, orbitingParticlesMaterial);
    atomGroup.add(orbitingParticlesMesh);

    // Cosmic dust
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCnt = 5000;
    const posArray = new Float32Array(particlesCnt * 3);
    const particleColors = new Float32Array(particlesCnt * 3);
    
    for (let i = 0; i < particlesCnt * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 85;
      particleColors[i] = Math.random();
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Background stars
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.1 });
    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = -Math.random() * 1000;
      starVertices.push(x, y, z);
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    camera.position.z = 25;

    // Post-processing
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.0, // Intensity
      0.7, // Radius
      0.4  // Threshold
    );
    composer.addPass(bloomPass);

    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.001;
      (nucleusMaterial as THREE.ShaderMaterial).uniforms.time.value = time;

      // Update orbiting particles
      const positions = orbitingParticlesGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < orbitingParticlesCnt; i++) {
        const orbit = orbits[i];
        const t = time * orbit.speed;
        const x = orbit.a * Math.cos(t) * Math.cos(orbit.angle) - orbit.b * Math.sin(t) * Math.sin(orbit.angle) + orbit.offset.x;
        const y = orbit.a * Math.cos(t) * Math.sin(orbit.angle) + orbit.b * Math.sin(t) * Math.cos(orbit.angle) + orbit.offset.y;
        const z = Math.sin(t * 2) * 2 + orbit.offset.z;

        for (let j = 0; j < trailLength; j++) {
          const index = (i * trailLength + j) * 3;
          positions[index] = x;
          positions[index + 1] = y;
          positions[index + 2] = z;
        }
      }
      orbitingParticlesGeometry.attributes.position.needsUpdate = true;

      // Rotate cosmic dust
      particlesMesh.rotation.y += 0.0002;

      nucleus.rotation.y += 0.005;
      atomGroup.rotation.y += 0.001; // Rotate the entire atom

      composer.render();
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountElement) {
        mountElement.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} />;
};

export default AtomVisualization;
