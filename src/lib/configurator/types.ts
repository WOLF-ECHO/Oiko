export type FurnitureCategory =
  | "sofas"
  | "armchairs"
  | "tables"
  | "beds"
  | "consoles";

export interface DimensionConfig {
  min: number;
  max: number;
  step: number;
  default: number;
  unit: "cm";
  pricePerStep?: number; // Price per step above minimum
}

export interface ProductDimensions {
  width: DimensionConfig;
  depth: DimensionConfig;
  height: DimensionConfig;
}

export interface ModuleOption {
  id: string;
  name: string;
  description: string;
  type: "standard" | "chaise-left" | "chaise-right" | "corner" | "modular-central" | "ottoman";
  priceModifier: number;
  icon?: string;
}

export interface ComponentOption {
  id: string;
  name: string;
  category: "legs" | "base" | "headboard" | "cushions" | "armrests" | "tabletop";
  priceModifier: number;
  materialCategoryId?: MaterialCategory;
  hex?: string;
  description?: string;
}

export type MaterialCategory = "fabrics" | "leathers" | "woods" | "stones" | "metals";

export interface PBRProperties {
  roughness: number;
  metalness: number;
  clearcoat?: number;
  bumpScale?: number;
}

export interface MaterialItem {
  id: string;
  name: string;
  category: MaterialCategory;
  tier: "standard" | "premium" | "couture";
  description: string;
  priceModifier: number;
  sku: string;
  pbr: PBRProperties;
  thumbnailUrl: string;
  availableColors: string[]; // references ColorItem.id
}

export interface ColorItem {
  id: string;
  name: string;
  hex: string;
  materialCategories: MaterialCategory[];
  priceModifier: number;
  sku: string;
}

export interface FinishItem {
  id: string;
  name: string;
  category: "metal" | "wood" | "stone";
  hex: string;
  priceModifier: number;
  description: string;
}

export interface ConfigurationRule {
  id: string;
  name: string;
  description: string;
  condition: {
    property: "material" | "module" | "color" | "dimension" | "component";
    part?: string;
    operator: "equals" | "includes" | "greater_than" | "less_than";
    value: string | number;
  };
  consequence: {
    type: "disable_option" | "disable_material" | "disable_color" | "enforce_min_dimension" | "enforce_max_dimension";
    targetPart?: string;
    targetValue: string | number;
    message: string;
  };
}

export interface ConfiguratorProduct {
  id: string;
  slug: string;
  name: string;
  category: FurnitureCategory;
  categoryLabel: string;
  tagline: string;
  description: string;
  story: string;
  basePrice: number;
  currency: string;
  leadTime: string;
  has3D: boolean;
  model3DType: "modular-sofa" | "linear-sofa" | "curved-sofa" | "sculptural-armchair" | "club-armchair" | "monolith-table" | "pedestal-table" | "dining-table" | "platform-bed" | "fluted-bed" | "console";
  previewImages: string[];
  dimensions: ProductDimensions;
  supportedModules?: ModuleOption[];
  supportedBases?: ComponentOption[];
  supportedArmrests?: ComponentOption[];
  supportedHeadboards?: ComponentOption[];
  supportedTabletops?: ComponentOption[];
  supportedMaterialCategories: MaterialCategory[];
  defaultConfiguration: {
    dimensions: { width: number; depth: number; height: number };
    modules: string[];
    materials: Record<string, string>; // part -> materialId
    colors: Record<string, string>; // part -> colorId
    finishes: Record<string, string>; // part -> finishId
    options: Record<string, any>;
  };
  rules: ConfigurationRule[];
}

export interface CanonicalConfiguration {
  configurationId: string;
  productId: string;
  variantSlug: string;
  productName: string;
  category: FurnitureCategory;
  dimensions: {
    width: number;
    depth: number;
    height: number;
  };
  modules: string[];
  materials: Record<string, string>; // e.g. { upholstery: "boucle-alpaga" }
  colors: Record<string, string>; // e.g. { upholstery: "ivoire-craie" }
  finishes: Record<string, string>; // e.g. { legs: "laiton-brosse" }
  options: Record<string, any>;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  pricing: PriceBreakdown;
  customer?: {
    name?: string;
    email?: string;
    phone?: string;
    city?: string;
  };
}

export interface PriceBreakdown {
  basePrice: number;
  dimensionSurcharge: number;
  modulesSurcharge: number;
  materialSurcharge: number;
  finishSurcharge: number;
  totalPrice: number;
  currency: string;
  formattedTotal: string;
  itemized: { label: string; amount: number; description?: string }[];
}

export interface QuoteRequest {
  id: string;
  configurationId: string;
  configuration: CanonicalConfiguration;
  client: {
    fullName: string;
    phone: string;
    email: string;
    city: string;
    projectType: string;
    budgetRange: string;
    notes?: string;
  };
  status: "pending" | "reviewed" | "contacted" | "completed";
  createdAt: string;
}

export interface DesignAdvisorLead {
  id: string;
  configurationId?: string;
  fullName: string;
  phone: string;
  email: string;
  city: string;
  roomType: string;
  preferredContact: "whatsapp" | "phone" | "email" | "showroom";
  notes?: string;
  createdAt: string;
}
