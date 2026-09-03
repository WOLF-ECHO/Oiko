export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  universe: "Living" | "Signature" | "Art" | "Éditions";
  category: "Canapés" | "Fauteuils" | "Tables basses" | "Consoles & Miroirs" | "Luminaires" | "Art mural";
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

export const PRODUCTS: Product[] = [
  {
    id: "vlm-001",
    slug: "canape-epure-modulaire",
    name: "Canapé Épure Modulaire",
    subtitle: "Chapitre 01 • Géométrie Douce",
    universe: "Living",
    category: "Canapés",
    price: 28000,
    formattedPrice: "28 000 DH",
    leadTime: "3 à 4 semaines • Confection sur mesure",
    dimensions: "L 280 x P 110 x H 72 cm (Hauteur d'assise 40 cm)",
    materials: ["Tissu bouclé italien d'alpaga", "Structure en noyer massif", "Mousse haute résilience multi-densité"],
    finishes: ["Bouclé Ivoire Naturel", "Bouclé Sable Chaud", "Lin Lavé Craie"],
    fabricOptions: [
      { name: "Bouclé Ivoire", hex: "#F5F2EB", desc: "Douceur texturée d'alpaga et coton" },
      { name: "Lin Sable", hex: "#D6CCA9", desc: "Lin lourd cultivé, weave dense" },
      { name: "Terre Cuite Minérale", hex: "#9E644D", desc: "Pigmentation artisanale naturelle" },
      { name: "Gris Cendre Foncé", hex: "#3A3835", desc: "Fibre texturée résistante" },
    ],
    materialOptions: [
      { name: "Noyer Massif Huilé", hex: "#4A3326", desc: "Toucher soyeux mat" },
      { name: "Chêne Blanchi Naturel", hex: "#C5B299", desc: "Finition scandinave épurée" },
      { name: "Chêne Ébénisé Noir", hex: "#1D1A18", desc: "Finition noire brossée" },
    ],
    description:
      "Pièce maîtresse du Salon VELMORA. Le Canapé Épure associe des proportions généreuses et des lignes basses sculpturales à une assise d'une profondeur enveloppante. Conçu pour ancrer l'espace avec une présence sereine.",
    story:
      "Inspiré des formes minérales adoucies par le vent de l'Atlas marocain, ce modèle a été pensé pour réconcilier l'architecture contemporaine avec l'art de recevoir marocain. Chaque module est assemblé à la main par nos artisans tapissiers.",
    details: [
      "Confection artisanale sur mesure dans notre atelier partenaire",
      "Déhoussable avec fermetures invisibles renforcées",
      "Pieds invisibles en retrait créant un effet de lévitation",
      "Traitement antitache haute performance écologique",
      "Garantie structurelle de 5 ans",
    ],
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: true,
    bestseller: true,
  },
  {
    id: "vlm-002",
    slug: "fauteuil-galbe-solaire",
    name: "Fauteuil Galbe Solaire",
    subtitle: "Édition Sculpturale • VELMORA Signature",
    universe: "Signature",
    category: "Fauteuils",
    price: 14500,
    formattedPrice: "14 500 DH",
    leadTime: "2 à 3 semaines",
    dimensions: "L 92 x P 88 x H 76 cm",
    materials: ["Laiton massif brossé", "Velours de mohair ou bouclé", "Bois courbé à chaud"],
    finishes: ["Laiton Brossé Satiné", "Bouclé Grège", "Cuir Tabac Patiné"],
    fabricOptions: [
      { name: "Bouclé Grège", hex: "#E3DDD2", desc: "Tissage texturé d'exception" },
      { name: "Velours Terre d'Ombre", hex: "#7B5945", desc: "Reflets profonds et soyeux" },
      { name: "Cuir Végétal Havane", hex: "#5C3826", desc: "Patinage à la main" },
    ],
    materialOptions: [
      { name: "Laiton Brossé Mat", hex: "#C5A880", desc: "Vernis de protection invisible" },
      { name: "Bronze Obscur", hex: "#2A2621", desc: "Oxydation manuelle" },
    ],
    description:
      "Une silhouette audacieuse entre sculpture et fauteuil d'apparat. Le dossier enveloppant dialogue avec un piétement en laiton brossé aux courbures sensuelles, captant la lumière méditerranéenne.",
    story:
      "Né de la volonté d'introduire des œuvres fonctionnelles dans l'habitat moderne. Le galbe parfait du dossier nécessite 18 heures de façonnage manuel par nos cintreurs et maîtres ferronniers.",
    details: [
      "Structure cintrée garantie 10 ans",
      "Plaque laiton numérotée sous l'assise",
      "Confort d'assise mi-ferme ergonomique",
      "Livraison avec gants blancs et certificat de conformité",
    ],
    images: [
      "https://images.unsplash.com/photo-1580481077195-c3a821a58875?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: true,
  },
  {
    id: "vlm-003",
    slug: "table-basse-monolithe-travertin",
    name: "Table Basse Monolithe",
    subtitle: "Pierre Minérale & Noblesse Naturelle",
    universe: "Living",
    category: "Tables basses",
    price: 16000,
    formattedPrice: "16 000 DH",
    leadTime: "3 semaines • Pièce taillée à la main",
    dimensions: "L 140 x L 80 x H 34 cm • Poids env. 85 kg",
    materials: ["Travertin romain brut veiné", "Sous-structure acier renforcé"],
    finishes: ["Travertin Pores Ouverts Mat", "Travertin Résiné Poli Satiné"],
    materialOptions: [
      { name: "Travertin Navona Beige", hex: "#D8CCB9", desc: "Teinte douce lumineuse" },
      { name: "Travertin Noce Chocolat", hex: "#7A6855", desc: "Veinage prononcé et chaleureux" },
      { name: "Marbre Noir Marquina", hex: "#1C1C1D", desc: "Veines blanches dynamiques" },
    ],
    description:
      "Deux blocs massifs en travertin romain aux arêtes adoucies composent cette table basse iconique. La matière minérale brute s'exprime avec majesté, célébrant les irrégularités naturelles de la pierre millénaire.",
    story:
      "Chaque dalle de pierre est rigoureusement sélectionnée en carrière pour la poésie de son veinage. La découpe et le chanfrein sont réalisés manuellement, rendant chaque exemplaire absolument unique.",
    details: [
      "Pierre traitée hydrofuge et oléofuge pour une utilisation quotidienne sans crainte",
      "Patin feutre haute densité pour protéger les parquets et marbres au sol",
      "Poids assurant une stabilité absolue",
      "Installation par deux livreurs spécialisés offerte",
    ],
    images: [
      "https://images.unsplash.com/photo-1533779283484-84e14c8cbcf0?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: true,
    bestseller: true,
  },
  {
    id: "vlm-004",
    slug: "bas-relief-mineral-n4",
    name: "Bas-Relief Minéral N°04",
    subtitle: "VELMORA Art • Édition Signée",
    universe: "Art",
    category: "Art mural",
    price: 18500,
    formattedPrice: "18 500 DH",
    leadTime: "Disponible ou 2 semaines sur mesure",
    dimensions: "160 x 120 cm (Encadrement chêne massif inclus)",
    materials: ["Enduit à la chaux marocaine", "Sables de l'Ourika", "Châssis lin renforcé", "Cadre chêne"],
    finishes: ["Pigments Ocre & Blanc Craie", "Monochrome Ivoire Minéral"],
    description:
      "Une œuvre murale en relief où la matière prend vie sous les ombres portées. Inspirée des strates géologiques marocaines, cette composition abstraite structure un mur avec une présence artistique souveraine.",
    story:
      "Créée en collaboration avec notre atelier d'artistes plasticiens à Marrakech. Les textures en empâtements de chaux et sables naturels vibrent au fil de la journée selon la trajectoire du soleil.",
    details: [
      "Pièce unique signée et délivrée avec certificat d'authenticité",
      "Système de fixation invisible haute sécurité pour charges lourdes fourni",
      "Accompagnement de pose et orientation lumineuse par notre décorateur",
    ],
    images: [
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: true,
    limitedEdition: true,
    editionCount: 8,
  },
  {
    id: "vlm-005",
    slug: "fauteuil-dune-organique",
    name: "Fauteuil Dune Organique",
    subtitle: "Confort Absolu & Formes Cocon",
    universe: "Living",
    category: "Fauteuils",
    price: 11800,
    formattedPrice: "11 800 DH",
    leadTime: "2 à 3 semaines",
    dimensions: "L 95 x P 92 x H 74 cm",
    materials: ["Bouclé de laine texturé", "Structure hêtre massif", "Garnissage plume et mousse HR 45"],
    finishes: ["Blanc Coton", "Sable Dunaire", "Vert Eucalyptus Poudré"],
    fabricOptions: [
      { name: "Bouclé Blanc Lait", hex: "#FAF8F5", desc: "Texture riche très douce" },
      { name: "Tweed Beige Doré", hex: "#C7B299", desc: "Tissage deux tons" },
      { name: "Terre Cuite Minérale", hex: "#A8624E", desc: "Chaleur organique" },
    ],
    description:
      "Des courbes douces et rassurantes inspirées par l'ondulation des dunes de Merzouga. Ce fauteuil pivotant ou fixe offre une assise généreuse propice à la lecture et à la contemplation.",
    story:
      "Conçu pour créer un point focal apaisant dans les salons décloisonnés des appartements et villas d'Anfa et du Souissi. Un équilibre parfait entre modernisme et volupté tactile.",
    details: [
      "Option socle pivotant invisible à 360°",
      "Double nappe de fibres anallergiques",
      "Densité d'assise calibrée pour un maintien durable sans affaissement",
    ],
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1200&auto=format&fit=crop",
    ],
    bestseller: true,
  },
  {
    id: "vlm-006",
    slug: "console-horizon-sable",
    name: "Console Horizon Sable",
    subtitle: "Finesse Architecturale & Lignes Pures",
    universe: "Living",
    category: "Consoles & Miroirs",
    price: 12500,
    formattedPrice: "12 500 DH",
    leadTime: "3 semaines",
    dimensions: "L 160 x P 38 x H 85 cm",
    materials: ["Chêne massif brûlé à la flamme (Shou Sugi Ban)", "Plateau travertin ou quartzite"],
    finishes: ["Chêne Noirci & Travertin", "Noyer Clair & Marbre Calacatta"],
    description:
      "Une console sculpturale aux pieds cannelés en bois massif, surmontée d'un plateau minéral en porte-à-faux. L'élément idéal pour habiller une entrée magistrale ou l'arrière d'un canapé d'îlot.",
    story:
      "La rigueur du dessin s'efface devant la richesse des textures : le bois travaillé à la flamme dialogue avec la douceur crayeuse du travertin.",
    details: [
      "Pieds cannelés taillés au tour à bois artisanal",
      "Plateau amovible pour une manipulation et un déménagement aisés",
      "Dispositif de fixation murale invisible anti-basculement fourni",
    ],
    images: [
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "vlm-007",
    slug: "table-sculpture-atlas",
    name: "Table Sculpture Atlas",
    subtitle: "Pièce Monumentale • VELMORA Signature",
    universe: "Signature",
    category: "Tables basses",
    price: 34000,
    formattedPrice: "34 000 DH",
    leadTime: "4 semaines • Réalisation sur commande",
    dimensions: "L 160 x L 100 x H 32 cm • Poids 120 kg",
    materials: ["Marbre noir Marquina sélectionné", "Pieds cylindriques asymétriques"],
    finishes: ["Poli Miroir", "Finition Cuir Adoucie"],
    description:
      "Une œuvre architecturale fonctionnelle. Le plateau organique repose en équilibre sur trois colonnes de diamètres distincts, créant une tension visuelle d'une élégance rare.",
    story:
      "Chaque bloc de marbre est taillé dans la masse avant d'être adouci à l'eau par nos maîtres marbriers. Une signature intemporelle pour les intérieurs les plus exigeants de Casablanca et Marrakech.",
    details: [
      "Marbre sélectionné pour l'harmonie de son veinage blanc contrasté",
      "Plaque de signature incrustée en laiton",
      "Traitement de scellement oléofuge de niveau muséal",
    ],
    images: [
      "https://images.unsplash.com/photo-1577140917170-285929fb55b7?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    ],
    isNew: true,
  },
  {
    id: "vlm-008",
    slug: "miroir-celeste-ovale",
    name: "Miroir Céleste Ovale",
    subtitle: "Cadre en Laiton Martelé & Réflecteur Minéral",
    universe: "Living",
    category: "Consoles & Miroirs",
    price: 7900,
    formattedPrice: "7 900 DH",
    leadTime: "10 jours",
    dimensions: "180 x 80 cm • Épaisseur cadre 4 cm",
    materials: ["Miroir extra-clair sans cuivre", "Laiton brossé et oxydé à la main"],
    finishes: ["Laiton Vieilli", "Bronze Noir", "Or Brossé Doux"],
    description:
      "Un miroir de pied ou mural aux proportions élancées. Le cadre en laiton épais présente de légères irrégularités artisanales qui lui confèrent une patine noble et vivante.",
    story:
      "Façonné par les artisans dinandiers de Fès selon un dessin contemporain épuré dessiné par le studio VELMORA. Il agrandit l'espace tout en diffusant une lumière chaude.",
    details: [
      "Miroir haute définition sans distorsion avec film de sécurité au dos",
      "Pose au sol adossée ou suspension horizontale / verticale",
      "Poids 24 kg",
    ],
    images: [
      "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "vlm-009",
    slug: "lampe-totem-archaique",
    name: "Lampe Totem Archaïque",
    subtitle: "Céramique Grès Chamotté & Abat-Jour Lin",
    universe: "Living",
    category: "Luminaires",
    price: 6200,
    formattedPrice: "6 200 DH",
    leadTime: "Disponible en stock",
    dimensions: "H 78 cm • Diamètre abat-jour 42 cm",
    materials: ["Grès chamotté tourné main", "Abat-jour lin naturel d'Égypte", "Variateur laiton intégré"],
    finishes: ["Terre Écru Brute", "Noir Fumé d'Enfumage"],
    description:
      "Sculpture lumineuse à l'allure totémique. Le pied en terre cuite chamottée arbore une texture brute tactile, contrastant avec la translucidité délicate du lin tissé.",
    story:
      "Chaque pied est façonné sur tour lent avant cuisson haute température. La lumière tamisée qu'elle diffuse recrée l'atmosphère feutrée des soirées d'Essaouira.",
    details: [
      "Douille E27 laiton avec ampoule LED chaude 2400K fournie",
      "Câble d'alimentation gainé de tissu torsadé doré (longueur 2,5 m)",
      "Variateur rotatif en laiton massif sur le socle",
    ],
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "vlm-010",
    slug: "paravent-sculptural-ombre",
    name: "Paravent Sculptural Ombre",
    subtitle: "Édition Limitée numérotée • 12 Exemplaires",
    universe: "Éditions",
    category: "Consoles & Miroirs",
    price: 22000,
    formattedPrice: "22 000 DH",
    leadTime: "3 à 4 semaines",
    dimensions: "Trois vantaux de L 55 x H 185 cm chacun",
    materials: ["Frêne massif teinté", "Cannage végétal contemporain ajouré", "Charnières laiton sur mesure"],
    finishes: ["Noir Carbone Mat", "Noyer Naturel"],
    description:
      "Un jeu d'ombres et de lumière qui rythme les grands espaces avec légèreté. Le cannage artisanal ajouré filtre les perspectives sans cloisonner la pièce.",
    story:
      "Fruit d'une résidence de design associant modernisme géométrique et tressage traditionnel. Une pièce collectionnable et polyvalente pour moduler salons et suites parentales.",
    details: [
      "Édition limitée à 12 pièces seulement avec plaque gravée",
      "Charnières articulées à double rotation à 360°",
      "Stabilité remarquable sans fixations au sol",
    ],
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop",
    ],
    limitedEdition: true,
    editionCount: 12,
  },
  {
    id: "vlm-011",
    slug: "toile-texturee-ocre-cendre",
    name: "Toile Texturée « Ocre & Cendre »",
    subtitle: "Art Contemporain • Grand Format",
    universe: "Art",
    category: "Art mural",
    price: 14000,
    formattedPrice: "14 000 DH",
    leadTime: "Pièce unique prête à livrer",
    dimensions: "180 x 140 cm",
    materials: ["Pigments minéraux", "Cire d'abeille et liant naturel", "Toile de lin belge pur"],
    finishes: ["Palette Ocre d'Ourika et Noir Carbone"],
    description:
      "Un champ de forces minéral où se superposent textures épaisses et lavis évanescents. Cette pièce confère immédiatement à l'espace une profondeur muséale.",
    story:
      "Réalisée par l'artiste peintre associé au studio VELMORA pour le Chapitre 01. Une méditation visuelle sur les contrastes d'ombre et de lumière propre au sud marocain.",
    details: [
      "Certificat d'authenticité et biographie de l'artiste inclus",
      "Caisse américaine en chêne teinté noir mat",
      "Système d'accrochage sécurisé et niveau à bulle intégrés",
    ],
    images: [
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1200&auto=format&fit=crop",
    ],
    limitedEdition: true,
    editionCount: 1,
  },
  {
    id: "vlm-012",
    slug: "banc-lineaire-medina",
    name: "Banc Linéaire Médina",
    subtitle: "Lignes Tendues & Cuir Sellier",
    universe: "Signature",
    category: "Fauteuils",
    price: 13500,
    formattedPrice: "13 500 DH",
    leadTime: "3 semaines",
    dimensions: "L 180 x P 50 x H 42 cm",
    materials: ["Noyer d'Atlas massif", "Cuir sellier pleine fleur tannage végétal", "Laiton brossé"],
    finishes: ["Noyer Naturel & Cuir Noir", "Noyer Chocolat & Cuir Cognac"],
    description:
      "Une pièce basse d'une pureté géométrique absolue. Les sangles en cuir sellier patiné à la main soutiennent un matelas d'assise capitonné de lin épais.",
    story:
      "Dessiné pour ponctuer le pied d'un lit, structurer une entrée ou servir d'assise conviviale dans un salon de réception.",
    details: [
      "Cuir pleine fleur sélectionné qui s'embellit avec les années",
      "Assemblages traditionnels à queues d'aronde apparentes",
      "Finition huile naturelle biologique sans solvant",
    ],
    images: [
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580481077195-c3a821a58875?q=80&w=1200&auto=format&fit=crop",
    ],
  },
];

export const SHOWROOM_ZONES = [
  {
    id: "galerie",
    name: "La Galerie",
    tagline: "L'art mural et les pièces sculpturales",
    description:
      "L'espace d'accueil où les œuvres grand format, les bas-reliefs et les pièces iconiques Signature dialoguent sous un éclairage scénographique précis.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    highlights: ["Bas-reliefs en chaux", "Sculptures marbre et laiton", "Luminaires monumentaux"],
  },
  {
    id: "salon",
    name: "Le Salon VELMORA",
    tagline: "L'expérience living grandeur nature",
    description:
      "Une véritable pièce à vivre reconstituée où tester le confort réel des canapés modulaires, des tables en travertin et apprécier l'harmonie des proportions.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
    highlights: ["Assises bouclé d'alpaga", "Tables basses en travertin", "Acoustique apaisante"],
  },
  {
    id: "matiere",
    name: "La Matière",
    tagline: "Matériauthèque tactile et sensorielle",
    description:
      "Plus de 120 échantillons physiques à toucher : travertins, marbres de l'Atlas, noyers huilés, bouclés italiens, lins lavés et finitions laiton.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop",
    highlights: ["Échantillons nomades", "Nuanciers tissus exclusifs", "Tests de résistance"],
  },
  {
    id: "studio",
    name: "Le Studio",
    tagline: "Rendez-vous privés & conception sur mesure",
    description:
      "Une table de travail dédiée aux échanges entre nos clients, leurs architectes d'intérieur et nos conseillers pour dessiner des intérieurs sur mesure.",
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1200&auto=format&fit=crop",
    highlights: ["Planches d'ambiance", "Plans 2D/3D & calepinage", "Devis instantané"],
  },
  {
    id: "edition",
    name: "L'Édition du Moment",
    tagline: "La scène tournante des créateurs",
    description:
      "Un espace renouvelé tous les trimestres mettant en lumière un artiste plasticien marocain ou international invité à réinventer l'art d'habiter.",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1200&auto=format&fit=crop",
    highlights: ["Séries numérotées", "Vernissages privés", "Rencontres collectionneurs"],
  },
];
