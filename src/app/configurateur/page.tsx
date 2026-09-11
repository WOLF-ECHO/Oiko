"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  CONFIGURATOR_PRODUCTS,
  getProductBySlug,
  getProductsByCategory,
} from "@/lib/configurator/products";
import {
  ConfiguratorProduct,
  CanonicalConfiguration,
  FurnitureCategory,
  MaterialCategory,
} from "@/lib/configurator/types";
import { MATERIALS, getMaterialById } from "@/lib/configurator/materials";
import { COLORS, getColorById } from "@/lib/configurator/colors";
import { RulesEngine } from "@/lib/configurator/rulesEngine";
import { PricingEngine } from "@/lib/configurator/pricingEngine";
import { ConfiguratorStorage } from "@/lib/configurator/storage";
import ThreeStudio from "@/components/configurator/3d/ThreeStudio";
import ConfiguratorSummaryPanel from "@/components/configurator/ConfiguratorSummaryPanel";
import QuoteRequestModal from "@/components/configurator/QuoteRequestModal";
import ShareConfigModal from "@/components/configurator/ShareConfigModal";
import DesignAdvisorModal from "@/components/configurator/DesignAdvisorModal";
import {
  Sliders,
  Layers,
  Palette,
  Sparkles,
  Info,
  Check,
  ChevronRight,
  ArrowRight,
  Maximize,
  Box,
  RotateCcw,
} from "lucide-react";

function ConfiguratorContent() {
  const searchParams = useSearchParams();

  // 1. Initial category & model from URL
  const categoryParam = searchParams.get("category");
  const modelParam = searchParams.get("model");

  const [activeCategory, setActiveCategory] = useState<string>(() => categoryParam || "all");

  const [selectedProduct, setSelectedProduct] = useState<ConfiguratorProduct>(() => {
    if (modelParam) {
      const found = getProductBySlug(modelParam);
      if (found) return found;
    }
    if (categoryParam) {
      const inCat = getProductsByCategory(categoryParam as FurnitureCategory);
      if (inCat.length > 0) return inCat[0];
    }
    return CONFIGURATOR_PRODUCTS[0];
  });

  // 3. Navigation step tabs on left panel
  const [activeTab, setActiveTab] = useState<"models" | "dimensions" | "materials" | "finishes">("dimensions");

  // 4. Active Configuration State
  const [configId, setConfigId] = useState<string>(() =>
    ConfiguratorStorage.generateId(selectedProduct.slug)
  );

  const [dimensions, setDimensions] = useState({
    width: selectedProduct.dimensions.width.default,
    depth: selectedProduct.dimensions.depth.default,
    height: selectedProduct.dimensions.height.default,
  });

  const [selectedModules, setSelectedModules] = useState<string[]>(
    selectedProduct.defaultConfiguration.modules
  );

  const [selectedMaterials, setSelectedMaterials] = useState<Record<string, string>>(
    selectedProduct.defaultConfiguration.materials
  );

  const [selectedColors, setSelectedColors] = useState<Record<string, string>>(
    selectedProduct.defaultConfiguration.colors
  );

  const [selectedFinishes, setSelectedFinishes] = useState<Record<string, string>>(
    selectedProduct.defaultConfiguration.finishes
  );

  const [selectedMaterialCategory, setSelectedMaterialCategory] = useState<MaterialCategory>(
    selectedProduct.supportedMaterialCategories[0] || "fabrics"
  );

  // Modals state
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [advisorModalOpen, setAdvisorModalOpen] = useState(false);

  // Restore configuration from shared URL payload if present
  useEffect(() => {
    const payload = searchParams.get("payload");
    const cfgParam = searchParams.get("cfg");
    if (payload) {
      const decoded = ConfiguratorStorage.decodeConfigFromUrl(payload);
      if (decoded && decoded.productId) {
        const prod = getProductBySlug(decoded.productId);
        if (prod) {
          setSelectedProduct(prod);
          setDimensions(decoded.dimensions);
          setSelectedModules(decoded.modules);
          setSelectedMaterials(decoded.materials);
          setSelectedColors(decoded.colors);
          setSelectedFinishes(decoded.finishes);
          if (cfgParam) setConfigId(cfgParam);
        }
      }
    }
  }, [searchParams]);

  // When switching product
  const handleSelectProduct = (prod: ConfiguratorProduct) => {
    setSelectedProduct(prod);
    setConfigId(ConfiguratorStorage.generateId(prod.slug));
    setDimensions({
      width: prod.dimensions.width.default,
      depth: prod.dimensions.depth.default,
      height: prod.dimensions.height.default,
    });
    setSelectedModules(prod.defaultConfiguration.modules);
    setSelectedMaterials(prod.defaultConfiguration.materials);
    setSelectedColors(prod.defaultConfiguration.colors);
    setSelectedFinishes(prod.defaultConfiguration.finishes);
    setSelectedMaterialCategory(prod.supportedMaterialCategories[0] || "fabrics");
    setActiveTab("dimensions");
  };

  // Evaluate Rules Engine
  const ruleValidation = useMemo(() => {
    return RulesEngine.evaluate(selectedProduct, {
      dimensions,
      modules: selectedModules,
      materials: selectedMaterials,
      colors: selectedColors,
      finishes: selectedFinishes,
    });
  }, [selectedProduct, dimensions, selectedModules, selectedMaterials, selectedColors, selectedFinishes]);

  // Calculate Pricing
  const pricing = useMemo(() => {
    return PricingEngine.calculate(selectedProduct, {
      dimensions,
      modules: selectedModules,
      materials: selectedMaterials,
      colors: selectedColors,
      finishes: selectedFinishes,
    });
  }, [selectedProduct, dimensions, selectedModules, selectedMaterials, selectedColors, selectedFinishes]);

  // Canonical Configuration Snapshot
  const canonicalConfig: CanonicalConfiguration = useMemo(() => {
    return {
      configurationId: configId,
      productId: selectedProduct.id,
      variantSlug: selectedProduct.slug,
      productName: selectedProduct.name,
      category: selectedProduct.category,
      dimensions,
      modules: selectedModules,
      materials: selectedMaterials,
      colors: selectedColors,
      finishes: selectedFinishes,
      options: {},
      quantity: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      pricing,
    };
  }, [configId, selectedProduct, dimensions, selectedModules, selectedMaterials, selectedColors, selectedFinishes, pricing]);

  // Available Materials for current selected category
  const availableMaterials = useMemo(() => {
    return MATERIALS.filter((m) => m.category === selectedMaterialCategory);
  }, [selectedMaterialCategory]);

  // Active Material & its colors
  const activePartKey = Object.keys(selectedMaterials)[0] || "upholstery";
  const currentMaterialId = selectedMaterials[activePartKey];
  const currentMaterial = getMaterialById(currentMaterialId);

  const availableColorsForMaterial = useMemo(() => {
    if (!currentMaterial) return [];
    return COLORS.filter((c) => currentMaterial.availableColors.includes(c.id));
  }, [currentMaterial]);

  // Handler for material pick
  const handlePickMaterial = (matId: string) => {
    const mat = getMaterialById(matId);
    if (!mat) return;
    const defaultColor = mat.availableColors[0] || "ivoire-craie";

    setSelectedMaterials((prev) => ({ ...prev, [activePartKey]: matId }));
    setSelectedColors((prev) => ({ ...prev, [activePartKey]: defaultColor }));
  };

  // Handler for color pick
  const handlePickColor = (colorId: string) => {
    setSelectedColors((prev) => ({ ...prev, [activePartKey]: colorId }));
  };

  // Filtered product catalog for the model switcher
  const filteredProducts = useMemo(() => {
    return getProductsByCategory(activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-[#0C0B0A] py-8 px-4 sm:px-6 lg:px-8 text-[#EFECE6]">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Top Header & Breadcrumb */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#282622] pb-5">
          <div>
            <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.25em] text-[#C5A880] mb-1 font-medium">
              <span>Studio 3D &bull; Sur-Mesure</span>
              <span>/</span>
              <span>{selectedProduct.categoryLabel}</span>
              <span>/</span>
              <span className="text-[#8E877D] font-mono">{configId}</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F9F6F0] font-light">
              Configurateur OÏKOS &bull; {selectedProduct.name}
            </h1>
          </div>

          {/* Quick Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {[
              { id: "all", label: "Tous (12)" },
              { id: "sofas", label: "Canapés" },
              { id: "armchairs", label: "Fauteuils" },
              { id: "tables", label: "Tables" },
              { id: "beds", label: "Lits" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setActiveTab("models");
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-colors shrink-0 ${
                  activeCategory === cat.id && activeTab === "models"
                    ? "bg-[#C5A880] text-[#0C0B0A] font-bold"
                    : "bg-[#161513] text-[#8E877D] hover:text-[#F9F6F0] border border-[#282622]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* MAIN STUDIO GRID: 3 Columns Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ============================================================ */}
          {/* LEFT: STEP-BY-STEP CUSTOMIZATION CONTROLS (Col 4)           */}
          {/* ============================================================ */}
          <div className="lg:col-span-4 bg-[#161513] border border-[#282622] rounded-3xl p-5 sm:p-6 flex flex-col space-y-6 shadow-xl">
            {/* Step Selection Tabs */}
            <div className="grid grid-cols-4 gap-1 p-1 bg-[#0C0B0A] rounded-2xl border border-[#282622]">
              <button
                onClick={() => setActiveTab("models")}
                className={`py-2 text-[10.5px] uppercase tracking-wider rounded-xl font-medium transition-all ${
                  activeTab === "models"
                    ? "bg-[#C5A880] text-[#0C0B0A] font-bold shadow-md"
                    : "text-[#8E877D] hover:text-[#F9F6F0]"
                }`}
              >
                Modèle
              </button>
              <button
                onClick={() => setActiveTab("dimensions")}
                className={`py-2 text-[10.5px] uppercase tracking-wider rounded-xl font-medium transition-all ${
                  activeTab === "dimensions"
                    ? "bg-[#C5A880] text-[#0C0B0A] font-bold shadow-md"
                    : "text-[#8E877D] hover:text-[#F9F6F0]"
                }`}
              >
                Format
              </button>
              <button
                onClick={() => setActiveTab("materials")}
                className={`py-2 text-[10.5px] uppercase tracking-wider rounded-xl font-medium transition-all ${
                  activeTab === "materials"
                    ? "bg-[#C5A880] text-[#0C0B0A] font-bold shadow-md"
                    : "text-[#8E877D] hover:text-[#F9F6F0]"
                }`}
              >
                Matières
              </button>
              <button
                onClick={() => setActiveTab("finishes")}
                className={`py-2 text-[10.5px] uppercase tracking-wider rounded-xl font-medium transition-all ${
                  activeTab === "finishes"
                    ? "bg-[#C5A880] text-[#0C0B0A] font-bold shadow-md"
                    : "text-[#8E877D] hover:text-[#F9F6F0]"
                }`}
              >
                Détails
              </button>
            </div>

            {/* TAB 1: MODEL SELECTOR */}
            {activeTab === "models" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-[#C5A880] font-medium">
                    Sélectionner une Pièce OÏKOS
                  </span>
                  <span className="text-[11px] text-[#8E877D]">
                    {filteredProducts.length} modèles
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[520px] overflow-y-auto pr-1">
                  {filteredProducts.map((prod) => (
                    <button
                      key={prod.id}
                      onClick={() => handleSelectProduct(prod)}
                      className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between group ${
                        selectedProduct.id === prod.id
                          ? "border-[#C5A880] bg-[#1E1D1A] ring-1 ring-[#C5A880]"
                          : "border-[#282622] bg-[#0C0B0A] hover:border-[#6E675E]"
                      }`}
                    >
                      <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-2.5 bg-[#161513]">
                        <Image
                          src={prod.previewImages[0]}
                          alt={prod.name}
                          fill
                          unoptimized
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-[9px] uppercase tracking-wider text-[#C5A880]">
                          {prod.categoryLabel}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-serif text-sm text-[#F9F6F0] line-clamp-1 group-hover:text-[#C5A880] transition-colors">
                          {prod.name.split("•")[0]}
                        </h4>
                        <span className="text-xs font-semibold text-[#C5A880] block mt-0.5">
                          Dès {prod.basePrice.toLocaleString("fr-MA")} DH
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: DIMENSIONS & MODULES */}
            {activeTab === "dimensions" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                {/* Modules Selection (if supported) */}
                {selectedProduct.supportedModules && selectedProduct.supportedModules.length > 0 && (
                  <div className="space-y-3">
                    <span className="text-xs uppercase tracking-wider text-[#C5A880] font-medium block">
                      Configuration Modulaire
                    </span>
                    <div className="grid grid-cols-1 gap-2.5">
                      {selectedProduct.supportedModules.map((mod) => {
                        const isSelected = selectedModules.includes(mod.id);
                        return (
                          <button
                            key={mod.id}
                            onClick={() => setSelectedModules([mod.id])}
                            className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                              isSelected
                                ? "border-[#C5A880] bg-[#1E1D1A] shadow-md"
                                : "border-[#282622] bg-[#0C0B0A] hover:border-[#6E675E]"
                            }`}
                          >
                            <div className="space-y-0.5">
                              <span className="text-xs font-semibold text-[#F9F6F0] block">
                                {mod.name}
                              </span>
                              <span className="text-[11px] text-[#8E877D] block">
                                {mod.description}
                              </span>
                            </div>

                            <span className="text-xs font-medium text-[#C5A880] shrink-0 ml-3">
                              {mod.priceModifier > 0 ? `+${mod.priceModifier.toLocaleString("fr-MA")} DH` : "Inclus"}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Dimension Sliders */}
                <div className="space-y-5 border-t border-[#282622] pt-5">
                  <span className="text-xs uppercase tracking-wider text-[#C5A880] font-medium block">
                    Dimensions Sur Mesure (au centimètre)
                  </span>

                  {/* Width */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#8E877D]">Largeur Totale :</span>
                      <span className="font-semibold text-[#F9F6F0] bg-[#0C0B0A] px-2.5 py-1 rounded-md border border-[#282622]">
                        {dimensions.width} cm
                      </span>
                    </div>
                    <input
                      type="range"
                      min={selectedProduct.dimensions.width.min}
                      max={selectedProduct.dimensions.width.max}
                      step={selectedProduct.dimensions.width.step}
                      value={dimensions.width}
                      onChange={(e) =>
                        setDimensions((prev) => ({ ...prev, width: Number(e.target.value) }))
                      }
                      className="w-full accent-[#C5A880] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-[#6E675E]">
                      <span>Min: {selectedProduct.dimensions.width.min} cm</span>
                      <span>Défaut: {selectedProduct.dimensions.width.default} cm</span>
                      <span>Max: {selectedProduct.dimensions.width.max} cm</span>
                    </div>
                  </div>

                  {/* Depth */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#8E877D]">Profondeur d&apos;Assise :</span>
                      <span className="font-semibold text-[#F9F6F0] bg-[#0C0B0A] px-2.5 py-1 rounded-md border border-[#282622]">
                        {dimensions.depth} cm
                      </span>
                    </div>
                    <input
                      type="range"
                      min={selectedProduct.dimensions.depth.min}
                      max={selectedProduct.dimensions.depth.max}
                      step={selectedProduct.dimensions.depth.step}
                      value={dimensions.depth}
                      onChange={(e) =>
                        setDimensions((prev) => ({ ...prev, depth: Number(e.target.value) }))
                      }
                      className="w-full accent-[#C5A880] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-[#6E675E]">
                      <span>Min: {selectedProduct.dimensions.depth.min} cm</span>
                      <span>Max: {selectedProduct.dimensions.depth.max} cm</span>
                    </div>
                  </div>

                  {/* Rule Feedback Alert */}
                  {!ruleValidation.isValid && (
                    <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-xs text-amber-300 space-y-1">
                      <div className="flex items-center gap-1.5 font-semibold">
                        <Info className="w-3.5 h-3.5 shrink-0" />
                        <span>Recommandation d&apos;Atelier OÏKOS :</span>
                      </div>
                      {ruleValidation.errors.map((err, i) => (
                        <p key={i} className="text-[11px] leading-relaxed pl-5">
                          &bull; {err}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: MATERIALS & COLORS */}
            {activeTab === "materials" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                {/* Material Category Switcher */}
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-wider text-[#C5A880] font-medium block">
                    Famille de Matières
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProduct.supportedMaterialCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedMaterialCategory(cat)}
                        className={`px-3 py-1.5 rounded-xl text-xs uppercase tracking-wider transition-colors ${
                          selectedMaterialCategory === cat
                            ? "bg-[#C5A880] text-[#0C0B0A] font-bold"
                            : "bg-[#0C0B0A] text-[#8E877D] hover:text-[#F9F6F0] border border-[#282622]"
                        }`}
                      >
                        {cat === "fabrics" ? "Tissus d'Exception" : cat === "leathers" ? "Cuirs Pleine Fleur" : cat === "woods" ? "Bois Massifs" : cat === "stones" ? "Pierres & Marbres" : "Métaux Brossés"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Material Cards */}
                <div className="space-y-3">
                  <span className="text-xs uppercase tracking-wider text-[#8E877D] font-medium block">
                    Échantillons de Matières ({availableMaterials.length})
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
                    {availableMaterials.map((mat) => {
                      const isSelected = currentMaterialId === mat.id;
                      return (
                        <button
                          key={mat.id}
                          onClick={() => handlePickMaterial(mat.id)}
                          className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                            isSelected
                              ? "border-[#C5A880] bg-[#1E1D1A] ring-1 ring-[#C5A880]"
                              : "border-[#282622] bg-[#0C0B0A] hover:border-[#6E675E]"
                          }`}
                        >
                          <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-2 bg-[#161513]">
                            <Image
                              src={mat.thumbnailUrl}
                              alt={mat.name}
                              fill
                              unoptimized
                              className="object-cover"
                            />
                            <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md text-[8.5px] uppercase tracking-wider text-[#C5A880] font-bold">
                              {mat.tier}
                            </div>
                          </div>

                          <div>
                            <span className="text-xs font-semibold text-[#F9F6F0] block line-clamp-1">
                              {mat.name}
                            </span>
                            <span className="text-[11px] text-[#C5A880] font-medium block mt-0.5">
                              {mat.priceModifier > 0 ? `+${mat.priceModifier.toLocaleString("fr-MA")} DH` : "Inclus"}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Color Swatches for Current Material */}
                {availableColorsForMaterial.length > 0 && (
                  <div className="space-y-3 border-t border-[#282622] pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider text-[#C5A880] font-medium">
                        Nuances &amp; Teintes Disponibles
                      </span>
                      <span className="text-xs text-[#F9F6F0] font-medium">
                        {getColorById(selectedColors[activePartKey])?.name}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {availableColorsForMaterial.map((col) => {
                        const isSelected = selectedColors[activePartKey] === col.id;
                        return (
                          <button
                            key={col.id}
                            onClick={() => handlePickColor(col.id)}
                            className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                              isSelected
                                ? "border-[#C5A880] bg-[#1E1D1A] ring-1 ring-[#C5A880]"
                                : "border-[#282622] bg-[#0C0B0A] hover:border-[#6E675E]"
                            }`}
                          >
                            <span
                              className="w-7 h-7 rounded-full border border-black/40 shadow-inner block"
                              style={{ backgroundColor: col.hex }}
                            />
                            <span className="text-[10px] text-[#C4BEB4] line-clamp-1">
                              {col.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: BASES & FINISHES */}
            {activeTab === "finishes" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="space-y-3">
                  <span className="text-xs uppercase tracking-wider text-[#C5A880] font-medium block">
                    Piétements &amp; Détails d&apos;Apparat
                  </span>

                  {selectedProduct.supportedBases && selectedProduct.supportedBases.length > 0 ? (
                    <div className="grid grid-cols-1 gap-2.5">
                      {selectedProduct.supportedBases.map((base) => {
                        const isSelected = Object.values(selectedFinishes).includes(base.id);
                        return (
                          <button
                            key={base.id}
                            onClick={() => setSelectedFinishes({ legs: base.id })}
                            className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                              isSelected
                                ? "border-[#C5A880] bg-[#1E1D1A] ring-1 ring-[#C5A880]"
                                : "border-[#282622] bg-[#0C0B0A] hover:border-[#6E675E]"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {base.hex && (
                                <span
                                  className="w-4 h-4 rounded-full border border-black/40 shrink-0"
                                  style={{ backgroundColor: base.hex }}
                                />
                              )}
                              <div>
                                <span className="text-xs font-semibold text-[#F9F6F0] block">
                                  {base.name}
                                </span>
                                {base.description && (
                                  <span className="text-[11px] text-[#8E877D] block">
                                    {base.description}
                                  </span>
                                )}
                              </div>
                            </div>

                            <span className="text-xs font-medium text-[#C5A880] shrink-0 ml-2">
                              {base.priceModifier > 0 ? `+${base.priceModifier.toLocaleString("fr-MA")} DH` : "Inclus"}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-xs text-[#8E877D]">
                      Ce modèle utilise des piètements monolithiques taillés dans la masse du matériau principal.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ============================================================ */}
          {/* CENTER: 3D THREE.JS CANVAS VIEWPORT (Col 5)                  */}
          {/* ============================================================ */}
          <div className="lg:col-span-5 h-full flex flex-col space-y-4">
            <ThreeStudio
              product={selectedProduct}
              configuration={{
                dimensions,
                modules: selectedModules,
                materials: selectedMaterials,
                colors: selectedColors,
                finishes: selectedFinishes,
              }}
              className="h-[520px] lg:h-[680px]"
            />
          </div>

          {/* ============================================================ */}
          {/* RIGHT: LIVE SUMMARY & PRICING PANEL (Col 3)                  */}
          {/* ============================================================ */}
          <div className="lg:col-span-3">
            <ConfiguratorSummaryPanel
              product={selectedProduct}
              configuration={canonicalConfig}
              pricing={pricing}
              onRequestQuote={() => setQuoteModalOpen(true)}
              onOpenAdvisor={() => setAdvisorModalOpen(true)}
              onOpenShare={() => setShareModalOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* MODALS */}
      {quoteModalOpen && (
        <QuoteRequestModal
          configuration={canonicalConfig}
          onClose={() => setQuoteModalOpen(false)}
        />
      )}

      {shareModalOpen && (
        <ShareConfigModal
          configuration={canonicalConfig}
          onClose={() => setShareModalOpen(false)}
        />
      )}

      {advisorModalOpen && (
        <DesignAdvisorModal
          configuration={canonicalConfig}
          onClose={() => setAdvisorModalOpen(false)}
        />
      )}
    </div>
  );
}

export default function ConfiguratorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0C0B0A] flex items-center justify-center text-[#C5A880]">
          <span className="text-xs uppercase tracking-widest animate-pulse font-medium">
            Chargement du Studio 3D OÏKOS...
          </span>
        </div>
      }
    >
      <ConfiguratorContent />
    </Suspense>
  );
}
