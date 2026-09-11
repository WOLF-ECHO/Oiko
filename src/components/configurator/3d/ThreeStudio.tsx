"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { ConfiguratorProduct } from "@/lib/configurator/types";
import { ProceduralFurnitureBuilder } from "./ProceduralFurniture";
import { Maximize2, Minimize2, RotateCcw, Sun, Eye, Sparkles } from "lucide-react";

interface ThreeStudioProps {
  product: ConfiguratorProduct;
  configuration: {
    dimensions: { width: number; depth: number; height: number };
    modules: string[];
    materials: Record<string, string>;
    colors: Record<string, string>;
    finishes: Record<string, string>;
  };
  className?: string;
}

export default function ThreeStudio({
  product,
  configuration,
  className = "",
}: ThreeStudioProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const cameraTargetRef = useRef(new THREE.Vector3(0, 0.45, 0));
  const cameraSphericalRef = useRef({ radius: 3.2, theta: Math.PI / 4, phi: Math.PI / 3 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [lightingPreset, setLightingPreset] = useState<"showroom" | "epure" | "sunset">("showroom");
  const [isLoaded, setIsLoaded] = useState(false);
  const [webglError, setWebglError] = useState(false);

  // Update Camera from spherical coordinates
  const updateCameraPosition = useCallback(() => {
    if (!cameraRef.current) return;
    const { radius, theta, phi } = cameraSphericalRef.current;
    const x = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.cos(theta);

    cameraRef.current.position.set(x, y + 0.35, z);
    cameraRef.current.lookAt(cameraTargetRef.current);
  }, []);

  // Set Preset View Angle
  const setCameraAngle = (view: "front" | "persp" | "top" | "side") => {
    switch (view) {
      case "persp":
        cameraSphericalRef.current = { radius: 3.2, theta: Math.PI / 4, phi: Math.PI / 3 };
        break;
      case "front":
        cameraSphericalRef.current = { radius: 3.2, theta: 0, phi: Math.PI / 2.3 };
        break;
      case "side":
        cameraSphericalRef.current = { radius: 3.2, theta: Math.PI / 2, phi: Math.PI / 2.3 };
        break;
      case "top":
        cameraSphericalRef.current = { radius: 3.4, theta: 0, phi: 0.15 };
        break;
    }
    updateCameraPosition();
  };

  // Init Three.js Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    try {
      // 1. Scene
      const scene = new THREE.Scene();
      scene.background = new THREE.Color("#0C0B0A");
      sceneRef.current = scene;

      // Subtle fog for depth
      scene.fog = new THREE.FogExp2("#0C0B0A", 0.08);

      // 2. Camera
      const width = container.clientWidth || 800;
      const height = container.clientHeight || 550;
      const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
      cameraRef.current = camera;
      updateCameraPosition();

      // 3. Renderer with soft shadows
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      rendererRef.current = renderer;

      container.innerHTML = "";
      container.appendChild(renderer.domElement);

      // 4. Ground Shadow Plane
      const planeGeo = new THREE.PlaneGeometry(14, 14);
      const planeMat = new THREE.ShadowMaterial({ opacity: 0.45 });
      const planeMesh = new THREE.Mesh(planeGeo, planeMat);
      planeMesh.rotation.x = -Math.PI / 2;
      planeMesh.position.y = 0;
      planeMesh.receiveShadow = true;
      scene.add(planeMesh);

      // Studio Circular Pedestal Ring
      const ringGeo = new THREE.RingGeometry(2.4, 2.42, 64);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x282622, side: THREE.DoubleSide });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = -Math.PI / 2;
      ringMesh.position.y = 0.001;
      scene.add(ringMesh);

      // 5. Lighting Setup
      const ambientLight = new THREE.AmbientLight(0xfff8f0, 1.2);
      ambientLight.name = "ambient";
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xffeedd, 2.2);
      keyLight.position.set(4, 5, 4);
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.camera.near = 0.5;
      keyLight.shadow.camera.far = 15;
      keyLight.shadow.bias = -0.001;
      keyLight.name = "keyLight";
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0xddeeff, 1.0);
      fillLight.position.set(-4, 3, -2);
      fillLight.name = "fillLight";
      scene.add(fillLight);

      const rimLight = new THREE.DirectionalLight(0xc5a880, 1.4);
      rimLight.position.set(0, 4, -4);
      rimLight.name = "rimLight";
      scene.add(rimLight);

      // 6. Animation Loop
      let animationFrameId: number;
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };
      animate();

      setIsLoaded(true);

      // Resize observer
      const resizeObserver = new ResizeObserver(() => {
        if (!container || !camera || !renderer) return;
        const newW = container.clientWidth;
        const newH = container.clientHeight;
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
      });
      resizeObserver.observe(container);

      return () => {
        cancelAnimationFrame(animationFrameId);
        resizeObserver.disconnect();
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    } catch (err) {
      console.error("WebGL initialization failed", err);
      setWebglError(true);
    }
  }, [updateCameraPosition]);

  // Update Procedural 3D Model when configuration changes
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    // Remove existing furniture model
    if (modelGroupRef.current) {
      scene.remove(modelGroupRef.current);
    }

    // Build fresh model
    const newModel = ProceduralFurnitureBuilder.buildModel(product, configuration);
    modelGroupRef.current = newModel;
    scene.add(newModel);
  }, [product, configuration]);

  // Update Lighting Preset
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const ambient = scene.getObjectByName("ambient") as THREE.AmbientLight | undefined;
    const key = scene.getObjectByName("keyLight") as THREE.DirectionalLight | undefined;
    const fill = scene.getObjectByName("fillLight") as THREE.DirectionalLight | undefined;
    const rim = scene.getObjectByName("rimLight") as THREE.DirectionalLight | undefined;

    if (!ambient || !key || !fill || !rim) return;

    if (lightingPreset === "showroom") {
      scene.background = new THREE.Color("#0C0B0A");
      ambient.color.setHex(0xfff5ea);
      ambient.intensity = 1.3;
      key.color.setHex(0xffeedd);
      key.intensity = 2.4;
      fill.color.setHex(0xdde8f5);
      fill.intensity = 0.9;
      rim.color.setHex(0xc5a880);
      rim.intensity = 1.6;
    } else if (lightingPreset === "sunset") {
      scene.background = new THREE.Color("#110D0A");
      ambient.color.setHex(0xffd5b0);
      ambient.intensity = 1.1;
      key.color.setHex(0xffaa66);
      key.intensity = 2.8;
      fill.color.setHex(0xaa7799);
      fill.intensity = 0.8;
      rim.color.setHex(0xffdd99);
      rim.intensity = 2.0;
    } else {
      // Épuré / Neutral Architectural Studio
      scene.background = new THREE.Color("#0E0E0D");
      ambient.color.setHex(0xffffff);
      ambient.intensity = 1.5;
      key.color.setHex(0xffffff);
      key.intensity = 2.0;
      fill.color.setHex(0xeeeeee);
      fill.intensity = 1.2;
      rim.color.setHex(0xdddddd);
      rim.intensity = 1.0;
    }
  }, [lightingPreset]);

  // Orbit controls via pointer events
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - previousMousePositionRef.current.x;
    const deltaY = e.clientY - previousMousePositionRef.current.y;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };

    const speed = 0.006;
    cameraSphericalRef.current.theta -= deltaX * speed;
    cameraSphericalRef.current.phi = Math.max(
      0.1,
      Math.min(Math.PI / 2 - 0.05, cameraSphericalRef.current.phi - deltaY * speed)
    );

    updateCameraPosition();
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomSpeed = 0.0018;
    cameraSphericalRef.current.radius = Math.max(
      1.8,
      Math.min(5.5, cameraSphericalRef.current.radius + e.deltaY * zoomSpeed)
    );
    updateCameraPosition();
  };

  if (webglError) {
    return (
      <div className="w-full h-full min-h-[420px] bg-[#161513] rounded-2xl flex flex-col items-center justify-center p-8 text-center text-[#C4BEB4]">
        <Sparkles className="w-8 h-8 text-[#C5A880] mb-3" />
        <h4 className="font-serif text-xl text-[#F9F6F0]">Aperçu Haute Définition</h4>
        <p className="text-xs text-[#8E877D] max-w-sm mt-1">
          Votre navigateur utilise le mode de rendu photographique optimisé.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full h-full min-h-[440px] lg:min-h-[580px] bg-[#0C0B0A] rounded-2xl overflow-hidden border border-[#282622] select-none ${
        isFullscreen ? "fixed inset-0 z-50 rounded-none border-none" : ""
      } ${className}`}
    >
      {/* Three.js Interactive Canvas Container */}
      <div
        ref={mountRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onWheel={handleWheel}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
      />

      {/* Top Floating Controls */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        {/* Model Badge */}
        <div className="pointer-events-auto bg-[#161513]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#282622] flex items-center gap-2 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[#C5A880] animate-pulse" />
          <span className="text-[10.5px] uppercase tracking-widest text-[#F9F6F0] font-medium">
            3D Studio Interactif &bull; 360°
          </span>
        </div>

        {/* Action icons */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Lighting Presets */}
          <div className="bg-[#161513]/85 backdrop-blur-md p-1 rounded-full border border-[#282622] flex items-center gap-1 shadow-lg">
            <button
              onClick={() => setLightingPreset("showroom")}
              className={`px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider transition-colors ${
                lightingPreset === "showroom" ? "bg-[#C5A880] text-[#0C0B0A] font-bold" : "text-[#8E877D] hover:text-[#F9F6F0]"
              }`}
              title="Éclairage Showroom Casablanca"
            >
              Showroom
            </button>
            <button
              onClick={() => setLightingPreset("sunset")}
              className={`px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider transition-colors ${
                lightingPreset === "sunset" ? "bg-[#C5A880] text-[#0C0B0A] font-bold" : "text-[#8E877D] hover:text-[#F9F6F0]"
              }`}
              title="Lumière Dorée Sunset"
            >
              Sunset
            </button>
            <button
              onClick={() => setLightingPreset("epure")}
              className={`px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider transition-colors ${
                lightingPreset === "epure" ? "bg-[#C5A880] text-[#0C0B0A] font-bold" : "text-[#8E877D] hover:text-[#F9F6F0]"
              }`}
              title="Studio Neutre"
            >
              Épure
            </button>
          </div>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2.5 rounded-full bg-[#161513]/85 backdrop-blur-md border border-[#282622] text-[#C4BEB4] hover:text-[#C5A880] hover:border-[#C5A880] transition-all shadow-lg"
            title={isFullscreen ? "Quitter le plein écran" : "Plein écran"}
            aria-label="Plein écran"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Bottom Camera Angle Presets */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-[#161513]/85 backdrop-blur-md p-1.5 rounded-full border border-[#282622] shadow-xl">
        <button
          onClick={() => setCameraAngle("persp")}
          className="px-3 py-1 rounded-full text-[10px] uppercase tracking-wider text-[#C4BEB4] hover:text-[#F9F6F0] hover:bg-[#1E1D1A] transition-colors"
        >
          Perspective
        </button>
        <button
          onClick={() => setCameraAngle("front")}
          className="px-3 py-1 rounded-full text-[10px] uppercase tracking-wider text-[#C4BEB4] hover:text-[#F9F6F0] hover:bg-[#1E1D1A] transition-colors"
        >
          Face
        </button>
        <button
          onClick={() => setCameraAngle("side")}
          className="px-3 py-1 rounded-full text-[10px] uppercase tracking-wider text-[#C4BEB4] hover:text-[#F9F6F0] hover:bg-[#1E1D1A] transition-colors"
        >
          Profil
        </button>
        <button
          onClick={() => setCameraAngle("top")}
          className="px-3 py-1 rounded-full text-[10px] uppercase tracking-wider text-[#C4BEB4] hover:text-[#F9F6F0] hover:bg-[#1E1D1A] transition-colors"
        >
          Dessus
        </button>
        <button
          onClick={() => setCameraAngle("persp")}
          className="p-1 rounded-full text-[#8E877D] hover:text-[#C5A880] transition-colors ml-1"
          title="Réinitialiser la vue"
          aria-label="Réinitialiser"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Interactive Drag Hint */}
      <div className="absolute bottom-4 left-4 hidden sm:flex items-center gap-1.5 text-[9.5px] uppercase tracking-widest text-[#6E675E] pointer-events-none">
        <Eye className="w-3 h-3 text-[#C5A880]" />
        <span>Glisser pour tourner &bull; Molette pour zoomer</span>
      </div>
    </div>
  );
}
