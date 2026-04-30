'use client';

import * as THREE from 'three';
import { useEffect, useRef} from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// cursor
const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / 800 - 0.5;
    cursor.y = -(event.clientY / 600 - 0.5);

    //console.log(cursor);
});

// you need canvas, scene, camera, renderer, geometry, material and mesh to create a 3D object in three.js
export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  

  useEffect(() => {
    
    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1),
        new THREE.MeshBasicMaterial({ color: 0xff0000 })
    )
    const scene = new THREE.Scene();
    scene.add(mesh);
    
    const camera = new THREE.PerspectiveCamera(75, 800 / 600, 0.1, 100);
    // const camera = new THREE.OrthographicCamera(-2, 2, 2, -2, 0.1, 100);
    //camera.position.z = 2;
    //camera.position.y = 2;
    camera.position.z = 6;
    camera.lookAt(mesh.position);
    scene.add(camera);

    //Controls
    const controls = new OrbitControls(camera, canvasRef.current as HTMLCanvasElement);
    controls.enableDamping = true;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current as HTMLCanvasElement
    });
    renderer.setSize(800, 600);
    //renderer.render(scene, camera);

    //animation
    const animate = () => {
        requestAnimationFrame(animate);
        //mesh.rotation.z += 0.01;
        // mesh.rotation.y += 0.01;

        // update camera
        //camera.position.y = cursor.y * 3;
        //camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
        //camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
        //camera.lookAt(mesh.position);

        // update controls
        controls.update();  

        renderer.render(scene, camera);
    };
    animate();


  }, []);



  return (
    <div>
        <canvas ref={canvasRef} className="webgl bg-amber-100" />
    </div>
);
}