import * as THREE from "three";
import { ConfiguratorProduct, CanonicalConfiguration } from "@/lib/configurator/types";
import { getMaterialById } from "@/lib/configurator/materials";
import { getColorById } from "@/lib/configurator/colors";

export class ProceduralFurnitureBuilder {
  /**
   * Builds or updates the 3D hierarchy for the given product and configuration.
   */
  static buildModel(
    product: ConfiguratorProduct,
    config: {
      dimensions: { width: number; depth: number; height: number };
      modules: string[];
      materials: Record<string, string>;
      colors: Record<string, string>;
      finishes: Record<string, string>;
    }
  ): THREE.Group {
    const group = new THREE.Group();
    group.name = "furniture_root";

    // 1. Resolve Materials and Colors
    const primaryMatId = Object.values(config.materials)[0] || "boucle-alpaga";
    const primaryMaterial = getMaterialById(primaryMatId);
    const primaryColorId = Object.values(config.colors)[0] || "ivoire-craie";
    const primaryColor = getColorById(primaryColorId);

    const mainThreeMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(primaryColor ? primaryColor.hex : "#F5F2EB"),
      roughness: primaryMaterial ? primaryMaterial.pbr.roughness : 0.85,
      metalness: primaryMaterial ? primaryMaterial.pbr.metalness : 0.05,
      bumpScale: primaryMaterial?.pbr.bumpScale || 0.02,
    });

    const legThreeMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#C5A880"),
      roughness: 0.35,
      metalness: 0.9,
    });

    const woodThreeMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#4A3326"),
      roughness: 0.45,
      metalness: 0.02,
    });

    // Scale factors: 1 unit in Three.js = 100 cm (1 meter)
    const w = config.dimensions.width / 100;
    const d = config.dimensions.depth / 100;
    const h = config.dimensions.height / 100;

    // 2. Build geometry according to product category and model3DType
    switch (product.model3DType) {
      case "modular-sofa":
      case "linear-sofa":
      case "curved-sofa":
        this.buildSofa(group, w, d, h, config.modules, mainThreeMaterial, legThreeMaterial);
        break;

      case "sculptural-armchair":
      case "club-armchair":
        this.buildArmchair(group, w, d, h, mainThreeMaterial, legThreeMaterial);
        break;

      case "monolith-table":
      case "pedestal-table":
      case "dining-table":
        this.buildTable(group, w, d, h, product.model3DType, mainThreeMaterial, woodThreeMaterial);
        break;

      case "platform-bed":
      case "fluted-bed":
        this.buildBed(group, w, d, h, product.model3DType, mainThreeMaterial, woodThreeMaterial);
        break;

      default:
        this.buildSofa(group, w, d, h, config.modules, mainThreeMaterial, legThreeMaterial);
    }

    return group;
  }

  // --- SOFA GENERATOR ---
  private static buildSofa(
    group: THREE.Group,
    w: number,
    d: number,
    h: number,
    modules: string[],
    mainMat: THREE.Material,
    legMat: THREE.Material
  ) {
    const seatHeight = 0.42;
    const cushionThickness = 0.22;
    const backrestHeight = h - seatHeight;
    const backrestThickness = 0.24;
    const hasChaiseRight = modules.includes("mod-chaise-right");
    const hasChaiseLeft = modules.includes("mod-chaise-left");
    const hasCorner = modules.includes("mod-corner");

    // 1. Base Platform
    const baseGeo = new THREE.BoxGeometry(w, 0.12, d);
    const baseMesh = new THREE.Mesh(baseGeo, mainMat);
    baseMesh.position.y = 0.14;
    baseMesh.castShadow = true;
    baseMesh.receiveShadow = true;
    group.add(baseMesh);

    // 2. Main Seat Cushions
    const seatWidth = hasChaiseRight || hasChaiseLeft ? w * 0.65 : w - 0.1;
    const seatOffsetX = hasChaiseRight ? -w * 0.16 : hasChaiseLeft ? w * 0.16 : 0;
    const seatGeo = new THREE.BoxGeometry(seatWidth, cushionThickness, d - backrestThickness * 0.7);
    const seatMesh = new THREE.Mesh(seatGeo, mainMat);
    seatMesh.position.set(seatOffsetX, seatHeight, 0.05);
    seatMesh.castShadow = true;
    group.add(seatMesh);

    // 3. Chaise Extension if selected
    if (hasChaiseRight || hasChaiseLeft) {
      const chaiseWidth = w * 0.35;
      const chaiseDepth = d * 1.55;
      const chaiseX = hasChaiseRight ? (w / 2 - chaiseWidth / 2) : (-w / 2 + chaiseWidth / 2);
      const chaiseGeo = new THREE.BoxGeometry(chaiseWidth, cushionThickness, chaiseDepth);
      const chaiseMesh = new THREE.Mesh(chaiseGeo, mainMat);
      chaiseMesh.position.set(chaiseX, seatHeight, (chaiseDepth - d) / 2);
      chaiseMesh.castShadow = true;
      group.add(chaiseMesh);

      // Chaise base
      const chaiseBaseGeo = new THREE.BoxGeometry(chaiseWidth, 0.12, chaiseDepth);
      const chaiseBaseMesh = new THREE.Mesh(chaiseBaseGeo, mainMat);
      chaiseBaseMesh.position.set(chaiseX, 0.14, (chaiseDepth - d) / 2);
      chaiseBaseMesh.castShadow = true;
      group.add(chaiseBaseMesh);
    }

    // 4. Backrest
    const backrestWidth = w;
    const backrestGeo = new THREE.BoxGeometry(backrestWidth, backrestHeight, backrestThickness);
    const backrestMesh = new THREE.Mesh(backrestGeo, mainMat);
    backrestMesh.position.set(0, seatHeight + backrestHeight / 2, -d / 2 + backrestThickness / 2);
    backrestMesh.castShadow = true;
    group.add(backrestMesh);

    // 5. Corner L return if selected
    if (hasCorner) {
      const cornerSideGeo = new THREE.BoxGeometry(backrestThickness, backrestHeight, d * 0.8);
      const cornerSideMesh = new THREE.Mesh(cornerSideGeo, mainMat);
      cornerSideMesh.position.set(w / 2 - backrestThickness / 2, seatHeight + backrestHeight / 2, 0);
      cornerSideMesh.castShadow = true;
      group.add(cornerSideMesh);
    }

    // 6. Pillows / Accents
    const pillowCount = Math.max(2, Math.floor(w / 0.8));
    const pillowWidth = (seatWidth - 0.2) / pillowCount;
    for (let i = 0; i < pillowCount; i++) {
      const pillowGeo = new THREE.BoxGeometry(pillowWidth * 0.9, backrestHeight * 0.75, 0.14);
      const pillowMesh = new THREE.Mesh(pillowGeo, mainMat);
      const px = seatOffsetX - seatWidth / 2 + pillowWidth * (i + 0.5);
      pillowMesh.position.set(px, seatHeight + cushionThickness + 0.12, -d / 2 + backrestThickness + 0.05);
      pillowMesh.rotation.x = 0.1;
      pillowMesh.castShadow = true;
      group.add(pillowMesh);
    }

    // 7. Recessed Feet / Plinth
    const footGeo = new THREE.CylinderGeometry(0.04, 0.035, 0.08, 16);
    const legPositions = [
      [-w / 2 + 0.15, 0.04, -d / 2 + 0.15],
      [w / 2 - 0.15, 0.04, -d / 2 + 0.15],
      [-w / 2 + 0.15, 0.04, d / 2 - 0.15],
      [w / 2 - 0.15, 0.04, d / 2 - 0.15],
    ];
    legPositions.forEach(([lx, ly, lz]) => {
      const legMesh = new THREE.Mesh(footGeo, legMat);
      legMesh.position.set(lx, ly, lz);
      legMesh.castShadow = true;
      group.add(legMesh);
    });
  }

  // --- ARMCHAIR GENERATOR ---
  private static buildArmchair(
    group: THREE.Group,
    w: number,
    d: number,
    h: number,
    mainMat: THREE.Material,
    legMat: THREE.Material
  ) {
    const seatHeight = 0.40;

    // 1. Curved Seat Cushion
    const seatGeo = new THREE.CylinderGeometry(w * 0.45, w * 0.48, 0.2, 32);
    const seatMesh = new THREE.Mesh(seatGeo, mainMat);
    seatMesh.position.set(0, seatHeight, 0);
    seatMesh.castShadow = true;
    group.add(seatMesh);

    // 2. Wrap-around Sculptural Backrest (Half-Cylinder Shell)
    const curveRadius = w * 0.5;
    const backGeo = new THREE.CylinderGeometry(
      curveRadius,
      curveRadius,
      h - seatHeight,
      32,
      1,
      true,
      Math.PI * 0.75,
      Math.PI * 1.5
    );
    const backMesh = new THREE.Mesh(backGeo, mainMat);
    backMesh.position.set(0, seatHeight + (h - seatHeight) / 2, 0);
    backMesh.castShadow = true;
    group.add(backMesh);

    // 3. Thick Outer Pad
    const padGeo = new THREE.TorusGeometry(curveRadius, 0.09, 16, 32, Math.PI * 1.4);
    const padMesh = new THREE.Mesh(padGeo, mainMat);
    padMesh.rotation.x = Math.PI / 2;
    padMesh.position.set(0, h - 0.05, 0);
    padMesh.castShadow = true;
    group.add(padMesh);

    // 4. Base: Architectural Swivel or Brass Cinch
    const baseGeo = new THREE.CylinderGeometry(curveRadius * 0.65, curveRadius * 0.72, 0.15, 32);
    const baseMesh = new THREE.Mesh(baseGeo, legMat);
    baseMesh.position.set(0, 0.075, 0);
    baseMesh.castShadow = true;
    group.add(baseMesh);
  }

  // --- TABLE GENERATOR ---
  private static buildTable(
    group: THREE.Group,
    w: number,
    d: number,
    h: number,
    modelType: string,
    stoneMat: THREE.Material,
    woodMat: THREE.Material
  ) {
    if (modelType === "monolith-table") {
      // Monolithic Travertine Dual Slabs
      const topGeo = new THREE.BoxGeometry(w, 0.09, d);
      const topMesh = new THREE.Mesh(topGeo, stoneMat);
      topMesh.position.set(0, h - 0.045, 0);
      topMesh.castShadow = true;
      group.add(topMesh);

      // Two sculptural stone blocks as legs
      const legGeo1 = new THREE.BoxGeometry(0.35, h - 0.09, d * 0.75);
      const legMesh1 = new THREE.Mesh(legGeo1, stoneMat);
      legMesh1.position.set(-w * 0.28, (h - 0.09) / 2, 0);
      legMesh1.castShadow = true;
      group.add(legMesh1);

      const legGeo2 = new THREE.BoxGeometry(0.35, h - 0.09, d * 0.75);
      const legMesh2 = new THREE.Mesh(legGeo2, stoneMat);
      legMesh2.position.set(w * 0.28, (h - 0.09) / 2, 0);
      legMesh2.castShadow = true;
      group.add(legMesh2);
    } else if (modelType === "pedestal-table") {
      // Organic Marble Slab with 3 asymmetric cylindrical columns
      const topGeo = new THREE.CylinderGeometry(w * 0.48, w * 0.50, 0.07, 48);
      const topMesh = new THREE.Mesh(topGeo, stoneMat);
      topMesh.position.set(0, h - 0.035, 0);
      topMesh.castShadow = true;
      group.add(topMesh);

      const col1 = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, h - 0.07, 32), stoneMat);
      col1.position.set(-w * 0.22, (h - 0.07) / 2, -d * 0.15);
      col1.castShadow = true;
      group.add(col1);

      const col2 = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, h - 0.07, 32), stoneMat);
      col2.position.set(w * 0.2, (h - 0.07) / 2, -d * 0.1);
      col2.castShadow = true;
      group.add(col2);

      const col3 = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, h - 0.07, 32), stoneMat);
      col3.position.set(0, (h - 0.07) / 2, d * 0.22);
      col3.castShadow = true;
      group.add(col3);
    } else {
      // Dining Table in Solid Walnut
      const topGeo = new THREE.BoxGeometry(w, 0.05, d);
      const topMesh = new THREE.Mesh(topGeo, woodMat);
      topMesh.position.set(0, h - 0.025, 0);
      topMesh.castShadow = true;
      group.add(topMesh);

      // Fluted Legs
      const legRadius = 0.08;
      const legGeo = new THREE.CylinderGeometry(legRadius, legRadius, h - 0.05, 24);
      const legPositions = [
        [-w / 2 + 0.2, (h - 0.05) / 2, -d / 2 + 0.15],
        [w / 2 - 0.2, (h - 0.05) / 2, -d / 2 + 0.15],
        [-w / 2 + 0.2, (h - 0.05) / 2, d / 2 - 0.15],
        [w / 2 - 0.2, (h - 0.05) / 2, d / 2 - 0.15],
      ];
      legPositions.forEach(([lx, ly, lz]) => {
        const leg = new THREE.Mesh(legGeo, woodMat);
        leg.position.set(lx, ly, lz);
        leg.castShadow = true;
        group.add(leg);
      });
    }
  }

  // --- BED GENERATOR ---
  private static buildBed(
    group: THREE.Group,
    w: number,
    d: number,
    h: number,
    modelType: string,
    upholsteryMat: THREE.Material,
    woodMat: THREE.Material
  ) {
    const mattressHeight = 0.35;
    const baseHeight = 0.25;

    // 1. Floating Base Frame
    const baseGeo = new THREE.BoxGeometry(w, baseHeight, d);
    const baseMesh = new THREE.Mesh(baseGeo, upholsteryMat);
    baseMesh.position.set(0, baseHeight / 2 + 0.08, 0);
    baseMesh.castShadow = true;
    group.add(baseMesh);

    // 2. Mattress
    const matGeo = new THREE.BoxGeometry(w * 0.88, 0.25, d * 0.9);
    const whiteLinenMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#FDFBF7"),
      roughness: 0.9,
    });
    const mattressMesh = new THREE.Mesh(matGeo, whiteLinenMat);
    mattressMesh.position.set(0, baseHeight + 0.08 + 0.125, 0.05);
    mattressMesh.castShadow = true;
    group.add(mattressMesh);

    // 3. Headboard
    const headboardMat = modelType === "fluted-bed" ? woodMat : upholsteryMat;
    const headboardGeo = new THREE.BoxGeometry(w * 1.15, h, 0.15);
    const headboardMesh = new THREE.Mesh(headboardGeo, headboardMat);
    headboardMesh.position.set(0, h / 2, -d / 2 + 0.075);
    headboardMesh.castShadow = true;
    group.add(headboardMesh);

    // 4. Dual Pillows
    const pillowGeo = new THREE.BoxGeometry(0.65, 0.2, 0.35);
    const p1 = new THREE.Mesh(pillowGeo, whiteLinenMat);
    p1.position.set(-w * 0.22, baseHeight + 0.25 + 0.1, -d / 2 + 0.35);
    p1.rotation.x = -0.2;
    p1.castShadow = true;
    group.add(p1);

    const p2 = new THREE.Mesh(pillowGeo, whiteLinenMat);
    p2.position.set(w * 0.22, baseHeight + 0.25 + 0.1, -d / 2 + 0.35);
    p2.rotation.x = -0.2;
    p2.castShadow = true;
    group.add(p2);
  }
}
