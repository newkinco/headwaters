import { useEffect, useState, Suspense } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import { Leva } from "leva";
import Cube from "../components/Cube";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [showPointer, setShowPointer] = useState(false);
  const [controlsEnabled, setControlsEnabled] = useState(false);
  const { query } = useRouter();

  useEffect(() => {
    const key = 'showcontrols'

    const hascontrolsEnabled = Object.keys(query).some((i) => i === key)
    if (!hascontrolsEnabled) {
      setControlsEnabled(false)
      return
    }

    const shouldHide = query[key] === 'false'
    if (shouldHide) {
      setControlsEnabled(false)
      return
    }

    setControlsEnabled(true)
  }, [query])

  return (
    <div
      className={[
        styles["container"],
        showPointer && styles["force-hover"],
      ].join(" ")}
    >
      <Head>
        <title>The Soft Protest Digest – Headwaters / Water extraction: our ressource and their milieu</title>
        <meta name="description" content="Water is a central ingredient in the recipe of life. Life’s primordial element, “the cell”, is a fragment of the lifeless oceans of the past, that separated itself from them to exist. However, among the effects of climate change, the rise in temperature undoubtedly impacts the way humans use water, as well as the stability of entire ecosystems. The region of Vaud plays a role in water extractivism, as the Swiss company Nestlé operates from Vevey. Indeed, Nestlé Waters has built a monopoly of the bottled water industry, operating from a country whose power grid highly depends on hydroelectricity. Through the recordings and drawings of “Headwaters” digital platform, the Soft Protest Digest tries to unwind the water dispute, whether H2O is seen as a resource for humans or as a milieu for wild species." />
        <meta property="og:title" content="The Soft Protest Digest – Headwaters / Water extraction: our ressource and their milieu" />
        <meta property="og:description" content="Water is a central ingredient in the recipe of life. Life’s primordial element, “the cell”, is a fragment of the lifeless oceans of the past, that separated itself from them to exist. However, among the effects of climate change, the rise in temperature undoubtedly impacts the way humans use water, as well as the stability of entire ecosystems. The region of Vaud plays a role in water extractivism, as the Swiss company Nestlé operates from Vevey. Indeed, Nestlé Waters has built a monopoly of the bottled water industry, operating from a country whose power grid highly depends on hydroelectricity. Through the recordings and drawings of “Headwaters” digital platform, the Soft Protest Digest tries to unwind the water dispute, whether H2O is seen as a resource for humans or as a milieu for wild species." />
        <meta property="og:image" content="/images/THE_SOFT_PROTEST_DIGEST_Headwaters.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Leva collapsed hidden={!controlsEnabled} />

      <Canvas
        style={{ height: "100vh", width: "100vw" }}
        onCreated={({ gl }) => (gl.toneMapping = THREE.NoToneMapping)}
      >
        <Suspense fallback={null}>
          {controlsEnabled && (
            <>
              <axesHelper />
              <Stats />
            </>
          )}

          <ambientLight />
          <OrbitControls
            enablePan={false}
            enableDamping
            dampingFactor={0.1}
            rotateSpeed={0.5}
            maxDistance={9}
          />

          <Cube setShowPointer={setShowPointer} />
        </Suspense>
      </Canvas>
    </div>
  );
}

