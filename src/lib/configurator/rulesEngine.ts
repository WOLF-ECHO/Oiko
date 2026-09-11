import { ConfiguratorProduct, CanonicalConfiguration, ConfigurationRule } from "./types";
import { getMaterialById } from "./materials";
import { getColorById } from "./colors";

export interface RuleValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  enforcedDimensions?: {
    minWidth?: number;
    maxWidth?: number;
    minDepth?: number;
    maxDepth?: number;
  };
  disabledMaterialIds: string[];
  disabledColorIds: string[];
  disabledModuleIds: string[];
}

export class RulesEngine {
  /**
   * Evaluates active rules for a product against a draft configuration.
   */
  static evaluate(
    product: ConfiguratorProduct,
    config: {
      dimensions: { width: number; depth: number; height: number };
      modules: string[];
      materials: Record<string, string>;
      colors: Record<string, string>;
      finishes: Record<string, string>;
    }
  ): RuleValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const disabledMaterialIds: string[] = [];
    const disabledColorIds: string[] = [];
    const disabledModuleIds: string[] = [];
    const enforcedDimensions: RuleValidationResult["enforcedDimensions"] = {};

    // 1. Check dimension bounds against product definitions
    if (config.dimensions.width < product.dimensions.width.min) {
      errors.push(
        `La largeur (${config.dimensions.width} cm) ne peut être inférieure au minimum de ${product.dimensions.width.min} cm.`
      );
    }
    if (config.dimensions.width > product.dimensions.width.max) {
      errors.push(
        `La largeur (${config.dimensions.width} cm) dépasse le maximum autorisé de ${product.dimensions.width.max} cm.`
      );
    }
    if (config.dimensions.depth < product.dimensions.depth.min) {
      errors.push(
        `La profondeur (${config.dimensions.depth} cm) ne peut être inférieure au minimum de ${product.dimensions.depth.min} cm.`
      );
    }
    if (config.dimensions.depth > product.dimensions.depth.max) {
      errors.push(
        `La profondeur (${config.dimensions.depth} cm) dépasse le maximum autorisé de ${product.dimensions.depth.max} cm.`
      );
    }

    // 2. Check material-color compatibility
    Object.entries(config.materials).forEach(([part, matId]) => {
      const material = getMaterialById(matId);
      const colorId = config.colors[part];
      if (material && colorId) {
        if (!material.availableColors.includes(colorId)) {
          warnings.push(
            `La teinte sélectionnée n'est pas disponible d'office pour ${material.name}. Un ajustement d'atelier pourrait être requis.`
          );
        }
      }
    });

    // 3. Process generic product rules
    for (const rule of product.rules) {
      const isTriggered = this.evaluateCondition(rule, config);

      if (isTriggered) {
        switch (rule.consequence.type) {
          case "enforce_min_dimension":
            if (rule.consequence.targetPart === "width") {
              const minW = Number(rule.consequence.targetValue);
              enforcedDimensions.minWidth = Math.max(enforcedDimensions.minWidth || 0, minW);
              if (config.dimensions.width < minW) {
                errors.push(rule.consequence.message);
              }
            }
            break;

          case "enforce_max_dimension":
            if (rule.consequence.targetPart === "width") {
              const maxW = Number(rule.consequence.targetValue);
              enforcedDimensions.maxWidth = Math.min(enforcedDimensions.maxWidth || 9999, maxW);
              if (config.dimensions.width > maxW) {
                errors.push(rule.consequence.message);
              }
            }
            break;

          case "disable_material":
            disabledMaterialIds.push(String(rule.consequence.targetValue));
            if (Object.values(config.materials).includes(String(rule.consequence.targetValue))) {
              errors.push(rule.consequence.message);
            }
            break;

          case "disable_color":
            disabledColorIds.push(String(rule.consequence.targetValue));
            if (Object.values(config.colors).includes(String(rule.consequence.targetValue))) {
              errors.push(rule.consequence.message);
            }
            break;

          case "disable_option":
            disabledModuleIds.push(String(rule.consequence.targetValue));
            if (config.modules.includes(String(rule.consequence.targetValue))) {
              errors.push(rule.consequence.message);
            }
            break;
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      enforcedDimensions,
      disabledMaterialIds,
      disabledColorIds,
      disabledModuleIds,
    };
  }

  private static evaluateCondition(
    rule: ConfigurationRule,
    config: {
      dimensions: { width: number; depth: number; height: number };
      modules: string[];
      materials: Record<string, string>;
      colors: Record<string, string>;
      finishes: Record<string, string>;
    }
  ): boolean {
    const { property, operator, value } = rule.condition;

    switch (property) {
      case "module":
        if (operator === "includes") {
          return config.modules.includes(String(value));
        }
        return false;

      case "material":
        if (operator === "equals") {
          return Object.values(config.materials).includes(String(value));
        }
        return false;

      case "dimension":
        if (rule.condition.part === "width") {
          if (operator === "greater_than") return config.dimensions.width > Number(value);
          if (operator === "less_than") return config.dimensions.width < Number(value);
        }
        return false;

      default:
        return false;
    }
  }
}
