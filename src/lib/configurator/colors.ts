import { ColorItem } from "./types";

export const COLORS: ColorItem[] = [
  // Fabrics & Leathers Neutrals
  {
    id: "ivoire-craie",
    name: "Ivoire Craie",
    hex: "#F5F2EB",
    materialCategories: ["fabrics", "leathers"],
    priceModifier: 0,
    sku: "CLR-IVR-01",
  },
  {
    id: "sable-chaud",
    name: "Sable Chaud",
    hex: "#D8CCA9",
    materialCategories: ["fabrics", "leathers"],
    priceModifier: 0,
    sku: "CLR-SBL-02",
  },
  {
    id: "grege-mineral",
    name: "Grège Minéral",
    hex: "#C4BEB4",
    materialCategories: ["fabrics", "leathers"],
    priceModifier: 0,
    sku: "CLR-GRG-03",
  },
  {
    id: "terre-cuite-ourika",
    name: "Terre d'Ourika",
    hex: "#A8624E",
    materialCategories: ["fabrics", "leathers"],
    priceModifier: 800,
    sku: "CLR-ORK-04",
  },
  {
    id: "vert-atlas-poudre",
    name: "Vert Cèdre Poudré",
    hex: "#4E584D",
    materialCategories: ["fabrics", "leathers"],
    priceModifier: 800,
    sku: "CLR-CDR-05",
  },
  {
    id: "noir-carbone",
    name: "Noir Carbone",
    hex: "#161513",
    materialCategories: ["fabrics", "leathers"],
    priceModifier: 0,
    sku: "CLR-CRB-06",
  },
  {
    id: "taupe-profond",
    name: "Taupe Profond",
    hex: "#584D44",
    materialCategories: ["fabrics", "leathers"],
    priceModifier: 600,
    sku: "CLR-TPE-07",
  },
  {
    id: "cuir-havane-patine",
    name: "Cuir Cognac Patiné",
    hex: "#7B4D2F",
    materialCategories: ["leathers"],
    priceModifier: 1200,
    sku: "CLR-CGN-08",
  },
  {
    id: "cuir-ebene-mat",
    name: "Cuir Ébène Mat",
    hex: "#201D1A",
    materialCategories: ["leathers"],
    priceModifier: 1200,
    sku: "CLR-EBN-09",
  },

  // Woods Colors / Finishes
  {
    id: "noyer-naturel-huile",
    name: "Noyer d'Atlas Naturel",
    hex: "#4A3326",
    materialCategories: ["woods"],
    priceModifier: 0,
    sku: "CLR-NYR-10",
  },
  {
    id: "chene-blanchi-nordique",
    name: "Chêne Blanchi Épuré",
    hex: "#C5B299",
    materialCategories: ["woods"],
    priceModifier: 0,
    sku: "CLR-CHN-11",
  },
  {
    id: "chene-ebene-brosse",
    name: "Chêne Noirci Brossé",
    hex: "#1E1A17",
    materialCategories: ["woods"],
    priceModifier: 800,
    sku: "CLR-EBN-12",
  },

  // Stones Natural Shades
  {
    id: "travertin-navona-creme",
    name: "Travertin Navona Minéral",
    hex: "#D6CABA",
    materialCategories: ["stones"],
    priceModifier: 0,
    sku: "CLR-TRV-13",
  },
  {
    id: "marbre-marquina-noir",
    name: "Marbre Noir Marquina Intense",
    hex: "#1A1A1B",
    materialCategories: ["stones"],
    priceModifier: 2500,
    sku: "CLR-MRQ-14",
  },
  {
    id: "marbre-calacatta-or",
    name: "Marbre Calacatta Gold",
    hex: "#EFECE6",
    materialCategories: ["stones"],
    priceModifier: 3800,
    sku: "CLR-CLC-15",
  },

  // Metals
  {
    id: "laiton-brosse-satine",
    name: "Laiton Doré Brossé",
    hex: "#C5A880",
    materialCategories: ["metals"],
    priceModifier: 1000,
    sku: "CLR-LTN-16",
  },
  {
    id: "bronze-obscur-patine",
    name: "Bronze Obscur Médaille",
    hex: "#3D3428",
    materialCategories: ["metals"],
    priceModifier: 1200,
    sku: "CLR-BRZ-17",
  },
  {
    id: "acier-gunmetal-mat",
    name: "Acier Gunmetal Micro-billé",
    hex: "#2B2A29",
    materialCategories: ["metals"],
    priceModifier: 500,
    sku: "CLR-GNM-18",
  },
];

export function getColorById(id: string): ColorItem | undefined {
  return COLORS.find((c) => c.id === id);
}
