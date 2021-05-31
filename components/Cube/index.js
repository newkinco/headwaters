import { useTexture } from "@react-three/drei";
import FaceAction from "../FaceAction";
import cubeFaces from "../../data/cubeData";

const CUBE_SIZE = 20;

const Cube = ({ setShowPointer }) => {
  const cubeTextures = useTexture(
    Object.values(cubeFaces).map(({ url }) => `/images/${url}`)
  );

  // useEffect(() => {
  //   cubeTextures.forEach((texture) => {
  //     texture.encoding = THREE.LinearEncoding;
  //   });
  // }, [cubeTextures])

  return (
    <group rotation={[0, Math.PI * 0.5, 0]}>
      {cubeTextures.map((texture, i) => {
        const { id, position, rotation, action } = cubeFaces[i];

        return (
          <group key={id} position={position} rotation={rotation}>
            <mesh>
              <planeGeometry args={[CUBE_SIZE, CUBE_SIZE]} />
              <meshBasicMaterial map={texture} />
            </mesh>

            {action && (
              <FaceAction
                name={action.name}
                url={action.url}
                args={[action.width, action.height]}
                position={action.position}
                scale={action.scale}
                setShowPointer={setShowPointer}
              />
            )}
          </group>
        );
      })}
    </group>
  );
};

export default Cube
