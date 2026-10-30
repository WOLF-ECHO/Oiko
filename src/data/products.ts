import { CHAIR_PRODUCTS } from "./chairs";

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  universe: "Living" | "Signature" | "Art" | "Éditions";
  category: "Chaises" | "Fauteuils" | "Canapés" | "Tables basses" | "Consoles & Miroirs" | "Luminaires" | "Art mural";
  price: number; // in MAD (DH)
  formattedPrice: string;
  leadTime: string;
  dimensions: string;
  materials: string[];
  finishes: string[];
  fabricOptions?: { name: string; hex: string; desc: string }[];
  materialOptions?: { name: string; hex: string; desc: string }[];
  description: string;
  story: string;
  details: string[];
  images: string[];
  featured?: boolean;
  bestseller?: boolean;
  isNew?: boolean;
  limitedEdition?: boolean;
  editionCount?: number;
}

/**
 * Catalogue officiel OÏKOS — Uniquement les produits réels de la Maison
 * (Chaises & Fauteuils — Références CH1 à CH55).
 * Les autres catégories (Canapés, Tables basses, Consoles, Luminaires, Art mural)
 * sont vidées des produits génériques en attendant l'intégration de leurs catalogues réels.
 */
export const PRODUCTS: Product[] = CHAIR_PRODUCTS;

export const SHOWROOM_ZONES = [
  {
    id: "galerie",
    name: "La Galerie",
    tagline: "L'art mural et les pièces sculpturales",
    description:
      "L'espace d'accueil de notre showroom à Dar Bouazza (Casablanca) où les œuvres grand format, les bas-reliefs et les pièces iconiques Signature dialoguent sous un éclairage scénographique précis.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    highlights: ["Bas-reliefs en chaux", "Sculptures marbre et laiton", "Luminaires monumentaux"],
  },
  {
    id: "salon",
    name: "Le Salon OÏKOS",
    tagline: "L'expérience living grandeur nature",
    description:
      "Une véritable pièce à vivre reconstituée où tester le confort réel de nos fauteuils sculpturaux, chaises d'apparat et ensembles sur mesure tout en appréciant l'harmonie des proportions.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
    highlights: ["Assises bouclé d'alpaga", "Fauteuils & Chaises Signature", "Acoustique apaisante"],
  },
  {
    id: "matiere",
    name: "La Matière",
    tagline: "Matériauthèque tactile et sensorielle",
    description:
      "Plus de 120 échantillons physiques à toucher dans notre showroom de Dar Bouazza : travertins, marbres de l'Atlas, noyers huilés, bouclés italiens, lins lavés et finitions laiton.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop",
    highlights: ["Échantillons nomades", "Nuanciers tissus exclusifs", "Tests de résistance"],
  },
  {
    id: "studio",
    name: "Le Studio",
    tagline: "Rendez-vous privés & Conception Globale",
    description:
      "Une table de travail dédiée aux échanges entre nos clients, leurs architectes d'intérieur et nos conseillers pour dessiner des intérieurs clés en main sur mesure.",
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1200&auto=format&fit=crop",
    highlights: ["Planches d'ambiance", "Plans 2D/3D & calepinage", "Étude sur mesure"],
  },
  {
    id: "edition",
    name: "L'Édition du Moment",
    tagline: "La scène tournante des créateurs",
    description:
      "Un espace renouvelé mettant en lumière nos séries limitées et créations exclusives façonnées dans notre atelier de Casablanca.",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop",
    highlights: ["Séries numérotées", "Présentations privées", "Savoir-faire d'atelier"],
  },
];
