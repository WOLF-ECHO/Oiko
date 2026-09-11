import { ConfiguratorProduct, PriceBreakdown } from "./types";
import { getMaterialById } from "./materials";
import { getColorById } from "./colors";

export class PricingEngine {
  /**
   * Calculates deterministic and verifiable pricing for a configuration.
   */
  static calculate(
    product: ConfiguratorProduct,
    config: {
      dimensions: { width: number; depth: number; height: number };
      modules: string[];
      materials: Record<string, string>;
      colors: Record<string, string>;
      finishes: Record<string, string>;
      quantity?: number;
    }
  ): PriceBreakdown {
    const qty = Math.max(1, config.quantity || 1);
    const itemized: { label: string; amount: number; description?: string }[] = [];

    // 1. Base Price
    const basePrice = product.basePrice;
    itemized.push({
      label: `${product.name} (Modèle de base)`,
      amount: basePrice,
      description: `Format de départ (${product.dimensions.width.default} × ${product.dimensions.depth.default} cm)`,
    });

    // 2. Dimension adjustments above default
    let dimensionSurcharge = 0;
    const widthExcess = Math.max(0, config.dimensions.width - product.dimensions.width.default);
    if (widthExcess > 0 && product.dimensions.width.pricePerStep && product.dimensions.width.step) {
      const steps = Math.ceil(widthExcess / product.dimensions.width.step);
      const widthCost = steps * product.dimensions.width.pricePerStep;
      dimensionSurcharge += widthCost;
      itemized.push({
        label: `Dimension sur-mesure (+${widthExcess} cm largeur)`,
        amount: widthCost,
        description: `${steps} palier(s) de ${product.dimensions.width.step} cm`,
      });
    }

    const depthExcess = Math.max(0, config.dimensions.depth - product.dimensions.depth.default);
    if (depthExcess > 0 && product.dimensions.depth.pricePerStep && product.dimensions.depth.step) {
      const steps = Math.ceil(depthExcess / product.dimensions.depth.step);
      const depthCost = steps * product.dimensions.depth.pricePerStep;
      dimensionSurcharge += depthCost;
      itemized.push({
        label: `Profondeur confort (+${depthExcess} cm)`,
        amount: depthCost,
        description: `${steps} palier(s) d'assise`,
      });
    }

    // 3. Modules additions
    let modulesSurcharge = 0;
    if (product.supportedModules) {
      for (const modId of config.modules) {
        const mod = product.supportedModules.find((m) => m.id === modId);
        if (mod && mod.priceModifier > 0) {
          modulesSurcharge += mod.priceModifier;
          itemized.push({
            label: mod.name,
            amount: mod.priceModifier,
            description: mod.description,
          });
        }
      }
    }

    // 4. Materials additions
    let materialSurcharge = 0;
    for (const [part, matId] of Object.entries(config.materials)) {
      const material = getMaterialById(matId);
      if (material && material.priceModifier > 0) {
        materialSurcharge += material.priceModifier;
        itemized.push({
          label: `${material.name} (${part})`,
          amount: material.priceModifier,
          description: `Gamme ${material.tier.toUpperCase()}`,
        });
      }
    }

    // 5. Colors additions
    for (const [part, colId] of Object.entries(config.colors)) {
      const color = getColorById(colId);
      if (color && color.priceModifier > 0) {
        materialSurcharge += color.priceModifier;
        itemized.push({
          label: `Teinte spéciale : ${color.name}`,
          amount: color.priceModifier,
        });
      }
    }

    // 6. Base / Leg / Finish additions
    let finishSurcharge = 0;
    if (product.supportedBases) {
      for (const [part, finishId] of Object.entries(config.finishes)) {
        const baseOpt = product.supportedBases.find((b) => b.id === finishId);
        if (baseOpt && baseOpt.priceModifier > 0) {
          finishSurcharge += baseOpt.priceModifier;
          itemized.push({
            label: baseOpt.name,
            amount: baseOpt.priceModifier,
            description: baseOpt.description,
          });
        }
      }
    }

    // Total computation
    const unitTotal = basePrice + dimensionSurcharge + modulesSurcharge + materialSurcharge + finishSurcharge;
    const totalPrice = unitTotal * qty;

    const formattedTotal = `${totalPrice.toLocaleString("fr-MA")} DH`;

    return {
      basePrice,
      dimensionSurcharge,
      modulesSurcharge,
      materialSurcharge,
      finishSurcharge,
      totalPrice,
      currency: "MAD",
      formattedTotal,
      itemized,
    };
  }

  /**
   * Helper to format any currency value in MAD.
   */
  static formatPrice(amount: number): string {
    return `${amount.toLocaleString("fr-MA")} DH`;
  }
}
