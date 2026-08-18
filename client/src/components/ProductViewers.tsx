/**
 * Design: Instrumento de Luz — modelos 3D táteis, luz ótica controlada
 * e geometria legível, agora em mesa de inspeção cinzenta para armações móveis.
 */
import { ContactShadows, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo } from "react";

type FrameKind = "round" | "square" | "aviator" | "rimless";
type ViewerAngle = "front" | "threeQuarter" | "side";

function filmProfile() {
  const shape = new THREE.Shape();
  shape.moveTo(0, -1.22);
  shape.bezierCurveTo(-0.82, -1.22, -1.1, -0.55, -1.02, 0.15);
  shape.bezierCurveTo(-0.95, 0.95, -0.52, 1.33, 0.08, 1.3);
  shape.bezierCurveTo(0.76, 1.27, 1.1, 0.7, 1.03, 0.08);
  shape.bezierCurveTo(0.98, -0.6, 0.7, -1.15, 0.18, -1.22);
  shape.lineTo(0.34, -1.4);
  shape.bezierCurveTo(0.47, -1.55, 0.68, -1.52, 0.75, -1.36);
  shape.bezierCurveTo(0.84, -1.16, 0.63, -1.04, 0.38, -1.08);
  shape.closePath();
  return shape;
}

function frameProfile(kind: FrameKind) {
  const shape = new THREE.Shape();
  if (kind === "round") {
    shape.absellipse(0, 0, 0.76, 0.76, 0, Math.PI * 2, false, 0);
    return shape;
  }
  if (kind === "square" || kind === "rimless") {
    const width = kind === "rimless" ? 0.9 : 0.88;
    const height = kind === "rimless" ? 0.62 : 0.67;
    const r = 0.2;
    shape.moveTo(-width + r, -height);
    shape.lineTo(width - r, -height);
    shape.quadraticCurveTo(width, -height, width, -height + r);
    shape.lineTo(width, height - r);
    shape.quadraticCurveTo(width, height, width - r, height);
    shape.lineTo(-width + r, height);
    shape.quadraticCurveTo(-width, height, -width, height - r);
    shape.lineTo(-width, -height + r);
    shape.quadraticCurveTo(-width, -height, -width + r, -height);
    return shape;
  }
  shape.moveTo(-0.84, 0.66);
  shape.quadraticCurveTo(0, 0.94, 0.84, 0.66);
  shape.quadraticCurveTo(0.96, -0.08, 0.48, -0.91);
  shape.quadraticCurveTo(0, -1.16, -0.48, -0.91);
  shape.quadraticCurveTo(-0.96, -0.08, -0.84, 0.66);
  return shape;
}

function makeGeometry(shape: THREE.Shape, depth: number, bevel = 0.008) {
  return new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelSegments: 2, bevelSize: bevel, bevelThickness: bevel });
}

function FilmObject({ exploded = false }: { exploded?: boolean }) {
  const shape = useMemo(() => filmProfile(), []);
  const lensGeometry = useMemo(() => makeGeometry(shape, 0.045), [shape]);
  const filmGeometry = useMemo(() => makeGeometry(shape, 0.009, 0.004), [shape]);
  const spacing = exploded ? 0.34 : 0.03;
  return <group rotation={[-0.35, 0.45, -0.13]}>
    <mesh geometry={lensGeometry} position={[0, 0, -0.05]} castShadow receiveShadow><meshPhysicalMaterial color="#bdc6cc" transparent opacity={0.2} transmission={0.74} roughness={0.15} thickness={0.12} ior={1.47} /></mesh>
    <mesh geometry={filmGeometry} position={[0, 0, spacing]} castShadow><meshPhysicalMaterial color="#7fc8ff" transparent opacity={0.34} transmission={0.9} roughness={0.08} thickness={0.035} ior={1.36} /></mesh>
    <mesh geometry={filmGeometry} position={[0, 0, spacing * 2 + 0.02]}><meshPhysicalMaterial color="#f2fbff" transparent opacity={0.16} transmission={0.94} roughness={0.05} thickness={0.01} ior={1.3} /></mesh>
  </group>;
}

export function LensFilmViewer({ exploded }: { exploded: boolean }) {
  return <Canvas shadows camera={{ position: [0, 0.05, 5.1], fov: 32 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
    <color attach="background" args={["#e7eaec"]} />
    <hemisphereLight intensity={1.5} color="#ffffff" groundColor="#a7b0b5" />
    <directionalLight castShadow position={[4, 5, 4]} intensity={2.2} color="#ffffff" />
    <pointLight position={[-4, -2, 3]} intensity={8} color="#36a7ff" distance={8} />
    <FilmObject exploded={exploded} />
    <ContactShadows position={[0, -1.75, 0]} opacity={0.28} scale={5.5} blur={2.5} far={4} color="#7d898f" />
    <OrbitControls enablePan={false} minDistance={3.9} maxDistance={6.5} autoRotate={!exploded} autoRotateSpeed={0.45} />
  </Canvas>;
}

function LensModule({ kind, version, side }: { kind: FrameKind; version: "v1" | "v2"; side: number }) {
  const shape = useMemo(() => frameProfile(kind), [kind]);
  const lensGeometry = useMemo(() => makeGeometry(shape, 0.042, 0.006), [shape]);
  const filmGeometry = useMemo(() => makeGeometry(shape, 0.008, 0.004), [shape]);
  const edges = useMemo(() => new THREE.EdgesGeometry(lensGeometry, 28), [lensGeometry]);
  const isRimless = kind === "rimless";
  return <group position={[side * 0.98, 0, 0]}>
    <mesh geometry={lensGeometry} position={[0, 0, -0.02]} castShadow><meshPhysicalMaterial color="#eaf4f7" transparent opacity={0.14} transmission={0.92} roughness={0.09} thickness={0.08} ior={1.49} /></mesh>
    {!isRimless && <lineSegments geometry={edges}><lineBasicMaterial color={kind === "aviator" ? "#27333b" : "#121b22"} transparent opacity={0.94} /></lineSegments>}
    {!isRimless && <lineSegments geometry={edges} position={[0, 0, 0.025]} scale={[1.03, 1.03, 1]}><lineBasicMaterial color="#1d2931" transparent opacity={0.72} /></lineSegments>}
    {version === "v2" && !isRimless && <lineSegments geometry={edges} position={[0, 0, 0.09]} scale={[1.075, 1.075, 1]}><lineBasicMaterial color="#56adf0" transparent opacity={0.88} /></lineSegments>}
    <mesh geometry={filmGeometry} position={[0, 0, 0.07]}><meshPhysicalMaterial color="#75c7ff" transparent opacity={0.23} transmission={0.98} roughness={0.05} thickness={0.01} ior={1.33} /></mesh>
    {version === "v1" && <mesh position={[side > 0 ? 0.62 : -0.62, -0.5, 0.075]} rotation={[0, 0, side > 0 ? 0.32 : -0.32]}><capsuleGeometry args={[0.055, 0.14, 5, 10]} /><meshPhysicalMaterial color="#b8e7ff" transparent opacity={0.45} transmission={0.94} roughness={0.08} /></mesh>}
  </group>;
}

function Rod({ position, rotation, length, radius = 0.05, color = "#15212a", metallic = false }: { position: [number, number, number]; rotation?: [number, number, number]; length: number; radius?: number; color?: string; metallic?: boolean }) {
  return <mesh position={position} rotation={rotation}><cylinderGeometry args={[radius, radius, length, 10]} /><meshStandardMaterial color={color} roughness={metallic ? 0.25 : 0.34} metalness={metallic ? 0.78 : 0.12} /></mesh>;
}

function EyewearObject({ kind, version }: { kind: FrameKind; version: "v1" | "v2" }) {
  const metal = kind === "aviator" || kind === "rimless";
  const structuralColor = metal ? "#27343d" : "#111a22";
  return <group rotation={[-0.1, 0.38, 0]} position={[0, 0.05, 0]}>
    <LensModule kind={kind} version={version} side={-1} />
    <LensModule kind={kind} version={version} side={1} />
    <Rod position={[0, kind === "aviator" ? 0.22 : 0.08, 0.025]} rotation={[0, 0, Math.PI / 2]} length={0.48} radius={0.052} color={structuralColor} metallic={metal} />
    {kind === "aviator" && <Rod position={[0, 0.92, 0]} rotation={[0, 0, Math.PI / 2]} length={2.05} radius={0.032} color="#34434d" metallic />}
    {kind === "rimless" && [-1, 1].map((side) => <group key={side}>
      <Rod position={[side * 1.74, 0.1, 0]} rotation={[0, Math.PI / 2, 0]} length={0.32} radius={0.025} color="#3d4d57" metallic />
      <mesh position={[side * 1.62, 0.1, 0.06]}><sphereGeometry args={[0.065, 12, 12]} /><meshStandardMaterial color="#24323b" metalness={0.85} roughness={0.2} /></mesh>
    </group>)}
    {[-1, 1].map((side) => <group key={side}>
      <Rod position={[side * 1.86, 0.1, -0.48]} rotation={[Math.PI / 2, side * 0.64, 0]} length={1.38} radius={kind === "aviator" || kind === "rimless" ? 0.035 : 0.055} color={structuralColor} metallic={metal} />
      <Rod position={[side * 2.1, -0.28, -0.95]} rotation={[Math.PI / 2 + 0.2, side * 0.5, 0]} length={0.58} radius={kind === "aviator" || kind === "rimless" ? 0.03 : 0.047} color={structuralColor} metallic={metal} />
    </group>)}
  </group>;
}

export function EyewearViewer({ kind, version, angle = "threeQuarter", autoRotate = true }: { kind: FrameKind; version: "v1" | "v2"; angle?: ViewerAngle; autoRotate?: boolean }) {
  const camera: Record<ViewerAngle, [number, number, number]> = { front: [0, 0, 5.8], threeQuarter: [3.3, 0.6, 5.1], side: [5.8, 0.2, 0.4] };
  return <Canvas shadows camera={{ position: camera[angle], fov: 34 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
    <color attach="background" args={["#dfe4e7"]} />
    <hemisphereLight intensity={1.6} color="#ffffff" groundColor="#9ea8ae" />
    <directionalLight castShadow position={[4.5, 5.5, 4]} intensity={2.8} color="#ffffff" />
    <directionalLight position={[-4, 1, 2]} intensity={1.2} color="#a7d8f8" />
    <pointLight position={[-3, -2, 3]} intensity={5.5} color="#36a7ff" distance={8} />
    <EyewearObject kind={kind} version={version} />
    <ContactShadows position={[0, -1.5, 0]} opacity={0.3} scale={6} blur={2.8} far={4} color="#758188" />
    <OrbitControls enablePan={false} minDistance={4.3} maxDistance={7.2} autoRotate={autoRotate} autoRotateSpeed={0.48} />
  </Canvas>;
}
