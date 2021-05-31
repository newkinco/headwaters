import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useControls } from "leva";
import { useTexture } from "@react-three/drei";

const FaceAction = ({
  name,
  args = [1, 1],
  position: initialPosition = [0, 0, 0],
  rotation: initialRotation = [0, 0, 0],
  scale: initialScale = 1,
  setShowPointer = () => {},
  extension = "png",
}) => {
  const [hover, setHover] = useState(false);
  const material = useRef(null);
  const { scale, rotation, position } = useControls({
    scale: initialScale,
    position: initialPosition,
    rotation: initialRotation,
  });

  const [map, mapHover] = useTexture([
    `/images/${name}.${extension}`,
    `/images/${name}-hover.${extension}`,
  ]);

  const toggleHover = (newState) => () => setHover(newState);

  const onClick = () => alert("click");

  useEffect(() => {
    map.encoding = THREE.sRGBEncoding;
    mapHover.encoding = THREE.sRGBEncoding;
  }, [map, mapHover]);

  useEffect(() => {
    setShowPointer(hover);
    material.current.map = hover ? mapHover : map;
  }, [material, hover, setShowPointer, map, mapHover]);

  return (
    <mesh
      scale={scale}
      position={position}
      rotation={rotation}
      onClick={onClick}
      onPointerOver={toggleHover(true)}
      onPointerOut={toggleHover(false)}
    >
      <planeGeometry args={args} />
      <meshBasicMaterial
        ref={material}
        map={map}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default FaceAction;
