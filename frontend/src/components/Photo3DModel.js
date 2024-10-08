import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three'; // Import THREE
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'; // Import GLTFLoader from the correct path


const Photo3DModel = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [modelUrl, setModelUrl] = useState('path/to/your/model.glb'); // Set your 3D model URL
  const [modelPosition, setModelPosition] = useState([0, 0, 0]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  const handleModelDrag = (e) => {
    // Update the model's position based on mouse/touch position
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    setModelPosition([x, y, 0]); // Adjust Z position as needed
  };

  return (
    <div style={{ position: 'relative' }}>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {imageUrl && (
        <div
          onMouseMove={handleModelDrag}
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            width: '800px', // Set desired width
            height: '600px', // Set desired height
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Canvas style={{ position: 'absolute', top: 0, left: 0 }}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <OrbitControls />
            <Model url={modelUrl} position={modelPosition} />
          </Canvas>
        </div>
      )}
    </div>
  );
};

const Model = ({ url, position }) => {
  const ref = useRef();
  const loader = new GLTFLoader();

  loader.load(url, (gltf) => {
    ref.current = gltf.scene;
    ref.current.position.set(...position);
    ref.current.scale.set(0.1, 0.1, 0.1); // Scale the model as needed
  });

  return <primitive object={ref.current} />;
};

export default Photo3DModel;
