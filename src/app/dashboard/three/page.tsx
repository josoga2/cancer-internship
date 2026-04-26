'use client';

import * as THREE from 'three';
import { useEffect, useRef } from 'react';

// you need canvas, scene, camera, renderer, geometry, material and mesh to create a 3D object in three.js
export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    //scene
    const scene = new THREE.Scene();
    const axesHelper = new THREE.AxesHelper();
    scene.add(axesHelper);

    //camera
    const camera = new THREE.PerspectiveCamera(75, 800 / 600, 0.1, 100);
    

    const sizes = {
        width: 800,
        height: 600
    }
    

    //group
    const group = new THREE.Group();
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

   

    //renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas as HTMLCanvasElement
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.render(scene, camera);

  }, []);

  return (
    <div>
        <canvas ref={canvasRef} className="webgl" />
    </div>
);
}