const fs = require('fs');
const path = require('path');

const stepContent = fs.readFileSync(path.join(__dirname, 'step949.txt'), 'utf-8');
const match = stepContent.match(/const items = (\[[\s\S]*?\]);/);
if (!match) {
  console.error("Could not find items in step949.txt");
  process.exit(1);
}

const rawItems = eval(match[1]);

console.log(`Loaded ${rawItems.length} items from raw data.`);

// Standard luxury fabric & material options for OIKOS chairs
const standardFabricOptions = [
  { name: "Bouclé Craie", hex: "#F3EFE6", desc: "Texturé doux, haute résistance" },
  { name: "Lin Naturel Lourd", hex: "#D4C7B0", desc: "Fibre naturelle tissée dense" },
  { name: "Velours Noyer", hex: "#614D42", desc: "Toucher soyeux mat" },
  { name: "Terracotta Minéral", hex: "#A75D43", desc: "Pigment chaud artisanal" },
  { name: "Gris Cendre", hex: "#4B4845", desc: "Fibre résistante antitache" },
];

const standardMaterialOptions = [
  { name: "Noyer Massif Naturel", hex: "#4A3326", desc: "Bois noble vernis mat" },
  { name: "Chêne Blanchi", hex: "#C5B299", desc: "Finition scandinave satinée" },
  { name: "Chêne Teinté Noir", hex: "#1D1A18", desc: "Ébénisterie sombre brossée" },
  { name: "Laiton Brossé", hex: "#D4AF37", desc: "Accents métalliques dorés" },
];

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

const chairs = rawItems.map((item, idx) => {
  const refNum = parseInt(item.ref.replace('CH', ''), 10);
  const fullName = `${item.type} ${item.name}`;
  const slug = `${slugify(item.type)}-${slugify(item.name)}-${item.ref.toLowerCase()}`;
  
  // High-end luxury description tailored to the chair
  const desc = item.desc || "Assise contemporaine confectionnée artisanalement.";
  const longDesc = `La pièce ${fullName} (Réf. ${item.ref}) incarne l'élégance architecturale de la Maison OÏKOS. Caractérisée par ${desc.toLowerCase()}, elle allie équilibre des proportions, ergonomie étudiée et noblesse des matériaux pour sublimer les intérieurs les plus raffinés.`;
  
  const story = `Dessinée et façonnée par les maîtres ébénistes et tapissiers de l'atelier OÏKOS à Casablanca. Chaque exemplaire est réalisé sur mesure, garantissant une finition irréprochable et un confort durable dans le temps.`;

  return {
    id: `oik-ch-${refNum}`,
    slug: slug,
    name: fullName,
    subtitle: `Collection Sièges • Réf. ${item.ref} • ${item.type}`,
    universe: (refNum <= 15 ? "Signature" : (refNum <= 35 ? "Living" : "Éditions")),
    category: "Chaises",
    price: 0,
    formattedPrice: "Sur devis",
    leadTime: "2 à 3 semaines • Confection sur mesure",
    dimensions: "Dimensions sur mesure • Hauteur d'assise et dossier ajustables à la demande",
    materials: [
      "Structure en bois noble massif sélectionné",
      "Garnissage mousse haute résilience multi-densités",
      "Tissu ou cuir sélection haute manufacture",
      "Pieds et piètement renforcés"
    ],
    finishes: [
      "Bouclette Crème Haute Couture",
      "Velours Ras Doux",
      "Lin Lourd Naturel",
      "Cuir Pleine Fleur sur demande"
    ],
    fabricOptions: standardFabricOptions,
    materialOptions: standardMaterialOptions,
    description: longDesc,
    story: story,
    details: [
      `Référence officielle : ${item.ref}`,
      `Confection artisanale sur mesure dans notre atelier de Casablanca`,
      `Structure interne en bois massif haute durabilité`,
      `Garnissage ergonomique confort longue durée`,
      `Traitement antitache protecteur appliqué en atelier`,
      `Garantie atelier de 6 mois`
    ],
    images: [
      `/images/chairs/${item.file}`
    ],
    featured: (refNum === 1 || refNum === 4 || refNum === 15 || refNum === 26 || refNum === 31 || refNum === 50),
    bestseller: (refNum === 2 || refNum === 11 || refNum === 20 || refNum === 34 || refNum === 48),
    isNew: (refNum >= 40)
  };
});

const tsCode = `import { Product } from "./products";

export const CHAIR_PRODUCTS: Product[] = ${JSON.stringify(chairs, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '..', 'src', 'data', 'chairs.ts'), tsCode);
console.log(`Successfully generated src/data/chairs.ts with ${chairs.length} chair products.`);
