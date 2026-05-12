'use client';

import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import GUI from 'lil-gui'

// cursor
const cursor = {
    x: 0,
    y: 0
}

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// you need canvas, scene, camera, renderer, geometry, material and mesh to create a 3D object in three.js
export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {

// Setup Debug GUI
    const gui = new GUI();

    const textureLoader = new THREE.TextureLoader();
    const leatherTexture = textureLoader.load('/leather.jpg');
    leatherTexture.colorSpace = THREE.SRGBColorSpace;
    leatherTexture.wrapS = THREE.RepeatWrapping;
    leatherTexture.wrapT = THREE.RepeatWrapping;
    leatherTexture.repeat.set(1,1);
    leatherTexture.offset.set(0,0);
    leatherTexture.rotation = Math.PI / 4;
    leatherTexture.minFilter = THREE.LinearFilter;

    const handleMouseMove = (event: MouseEvent) => {
        cursor.x = event.clientX / sizes.width - 0.5;
        cursor.y = -(event.clientY / sizes.height - 0.5);
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    /* const leatherMaterial = new THREE.MeshStandardMaterial({
        map: leatherTexture,
        color: 0xffffff,
        roughness: 0.6,
        metalness: 0,
    }); */

    const leatherMaterial = new THREE.MeshMatcapMaterial()
    leatherMaterial.flatShading = true;

    const mesh = new THREE.Mesh(
        new RoundedBoxGeometry(1, 1, 1, 8, 0.15),
        leatherMaterial
    )

    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 32, 32),
        leatherMaterial
    )
    sphere.position.x = 2;

    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1),
        leatherMaterial
    )
    //plane.rotation.x = -Math.PI / 2;
    plane.position.x = -4;

    const torus = new THREE.Mesh(
        new THREE.TorusGeometry(0.5, 0.2, 16, 100),
        leatherMaterial
    )
    torus.position.x = -2;


    const scene = new THREE.Scene();

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(1,1,1);
    scene.add(directionalLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1);
    rimLight.position.set(-3, 2, -4);
    scene.add(rimLight);

    scene.add(mesh);
    scene.add(sphere);
    scene.add(plane);
    scene.add(torus);
    gui.add(mesh.position, 'y').min(-3).max(3).step(0.00001).name('elevation');
    gui.add(mesh.position, 'x').min(-3).max(3).step(0.00001).name('longitude');
    gui.add(mesh.position, 'z').min(-3).max(3).step(0.00001).name('latitude');

    gui.add(mesh, 'visible').name('visible');
    
    gui.add(directionalLight, 'intensity').min(0).max(5).step(0.01).name('main light');
    gui.add(rimLight, 'intensity').min(0).max(5).step(0.01).name('rim light');

    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
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
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    //renderer.render(scene, camera);

    window.addEventListener('resize', () => {
        // Update sizes
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;

        // Update camera
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();
        
        // Update renderer
        renderer.setSize(sizes.width, sizes.height);
    });

    const handleDoubleClick = async () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const fullscreenElement = document.fullscreenElement || (document as any).webkitFullscreenElement;

        try {
            if (!fullscreenElement) {
                if (canvas.requestFullscreen) {
                    await canvas.requestFullscreen();
                } else if ((canvas as any).webkitRequestFullscreen) {
                    (canvas as any).webkitRequestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    await document.exitFullscreen();
                } else if ((document as any).webkitExitFullscreen) {
                    (document as any).webkitExitFullscreen();
                }
            }
        } catch (error) {
            console.error('Fullscreen toggle failed:', error);
        }
    };

    canvasRef.current?.addEventListener('dblclick', handleDoubleClick);

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

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        canvasRef.current?.removeEventListener('dblclick', handleDoubleClick);
        controls.dispose();
        renderer.dispose();
        gui.destroy();
        mesh.geometry.dispose();
        leatherTexture.dispose();
        leatherMaterial.dispose();
    };

  }, []);



  return (
    <div>
        <canvas ref={canvasRef} className="webgl bg-amber-100" />
    </div>
);
}