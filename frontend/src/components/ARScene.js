import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { ARButton } from 'three/examples/jsm/webxr/ARButton';

const ARScene = () => {
  const mountRef = useRef(null);
  
  useEffect(() => {
    let hitTestSource = null;
    let hitTestSourceRequested = false;

    // Scene setup
    const scene = new THREE.Scene();

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.xr.enabled = true;

    // Attach the renderer to the DOM
    mountRef.current.appendChild(renderer.domElement);
    mountRef.current.appendChild(ARButton.createButton(renderer, { requiredFeatures: ['hit-test'] }));

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 5);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);

    // Lighting setup
    const light = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(light);

    // Reticle setup
    let reticle = new THREE.Mesh(
      new THREE.RingGeometry(0.15, 0.2, 32).rotateX(-Math.PI / 2),
      new THREE.MeshStandardMaterial({ color: 0xffffff * Math.random() })
    );
    reticle.visible = false;
    reticle.matrixAutoUpdate = false;
    scene.add(reticle);

    // Cube setup
    const geometry = new THREE.BoxGeometry(0.75, 0.5, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0xacd8a7 });

    // Controller setup
    let controller = renderer.xr.getController(0);
    controller.addEventListener('select', () => {
      if (reticle.visible) {
        const cube = new THREE.Mesh(geometry, material);
        cube.position.setFromMatrixPosition(reticle.matrix);
        cube.name = "cube";
        scene.add(cube);
      }
    });
    scene.add(controller);

    // Resize handler
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onWindowResize);

    // Animation loop
    const render = (timestamp, frame) => {
      if (frame) {
        const referenceSpace = renderer.xr.getReferenceSpace();
        const session = renderer.xr.getSession();

        if (hitTestSourceRequested === false) {
          session.requestReferenceSpace('viewer').then(referenceSpace => {
            session.requestHitTestSource({ space: referenceSpace }).then(source =>
              hitTestSource = source
            );
          });

          hitTestSourceRequested = true;

          session.addEventListener("end", () => {
            hitTestSourceRequested = false;
            hitTestSource = null;
          });
        }

        if (hitTestSource) {
          const hitTestResults = frame.getHitTestResults(hitTestSource);
          if (hitTestResults.length > 0) {
            const hit = hitTestResults[0];
            reticle.visible = true;
            reticle.matrix.fromArray(hit.getPose(referenceSpace).transform.matrix);
          } else {
            reticle.visible = false;
          }
        }
      }

      scene.children.forEach(object => {
        if (object.name === "cube") {
          // Object rotation or other animation logic can be added here
          // object.rotation.y += 0.01;
        }
      });

      renderer.render(scene, camera);
    };

    renderer.setAnimationLoop(render);

    return () => {
      window.removeEventListener('resize', onWindowResize);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default ARScene;
