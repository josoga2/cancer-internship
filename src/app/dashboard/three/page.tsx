'use client';

import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

// you need canvas, scene, camera, renderer, geometry, material and mesh to create a 3D object in three.js
export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationRef = useRef<number | null>(null);
  const [rotateAngle, setRotateAngle] = useState(0.8);
  console.log(rotateAngle);

  useEffect(() => {
    const canvas = canvasRef.current;

    //scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const axesHelper = new THREE.AxesHelper();
    scene.add(axesHelper);

    //camera
    const camera = new THREE.PerspectiveCamera(75, 800 / 600, 0.1, 100);
    cameraRef.current = camera;
    camera.position.z = 3;
    

    const sizes = {
        width: 800,
        height: 600
    }
    

    //group
    const group = new THREE.Group();
    groupRef.current = group;
    group.position.y = 1;
    scene.add(group);

    //cube
    const cube1 = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1),
        new THREE.MeshBasicMaterial({ color: 0xff0000 })
    )
    group.add(cube1);

    const cube2 = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1),
        new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    )
    cube2.position.x = -2;
    group.add(cube2);

    const cube3 = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1),
        new THREE.MeshBasicMaterial({ color: 0x0000ff })
    )
    cube3.position.x = 2;
    group.add(cube3);
   // group.rotation.y = rotateAngle;

    //renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas as HTMLCanvasElement
    });
    rendererRef.current = renderer;
    renderer.setSize(sizes.width, sizes.height);

    gsap.to(group.position, { z: 0, duration: 1, ease: 'bounce.out' });

    let time = Date.now();
    const tick = () => {
        //compose FPS
        const currentTime = Date.now();
        const deltaTime = currentTime - time;
        time = currentTime;
        group.lookAt(group.position);

      renderer.render(scene, camera);
      cube1.rotation.x += 0.005*deltaTime;
      cube2.rotation.y += 0.005*deltaTime;
      cube3.rotation.z += 0.005*deltaTime;
      animationRef.current = window.requestAnimationFrame(tick);
    };

    tick();

    return () => {
      if (animationRef.current !== null) {
        window.cancelAnimationFrame(animationRef.current);
      }
      renderer.dispose();
    };

  }, []);

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = rotateAngle;
    }
  }, [rotateAngle]);


  return (
    <div>
        <canvas ref={canvasRef} className="webgl" />
        <div className='space-x-2'>
            <button className='p-5 bg-amber-700' onClick={() => setRotateAngle(rotateAngle - 0.1)}>← Rotate</button>
            <button className='p-5 bg-amber-700' onClick={() => setRotateAngle(rotateAngle + 0.1)}>Rotate → </button>
        </div>
    </div>
);
}