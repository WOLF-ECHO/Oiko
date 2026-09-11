import { CanonicalConfiguration, QuoteRequest, DesignAdvisorLead } from "./types";

const STORAGE_KEY_CONFIGS = "oikos_saved_configurations";
const STORAGE_KEY_QUOTES = "oikos_quote_requests";
const STORAGE_KEY_LEADS = "oikos_advisor_leads";

export class ConfiguratorStorage {
  /**
   * Generates a luxury unique configuration ID (e.g. OIKOS-8F42K).
   */
  static generateId(productSlug: string): string {
    const prefix = "OIKOS";
    const year = new Date().getFullYear();
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `${prefix}-${code}`;
  }

  /**
   * Encodes a configuration into a compressed URL-safe string for instant link sharing.
   */
  static encodeConfigToUrl(config: CanonicalConfiguration): string {
    if (typeof window === "undefined") return "";
    try {
      const minimal = {
        id: config.configurationId,
        p: config.productId,
        w: config.dimensions.width,
        d: config.dimensions.depth,
        h: config.dimensions.height,
        m: config.modules,
        mat: config.materials,
        c: config.colors,
        f: config.finishes,
        o: config.options,
      };
      const json = JSON.stringify(minimal);
      const b64 = btoa(unescape(encodeURIComponent(json)));
      return b64;
    } catch {
      return "";
    }
  }

  /**
   * Decodes a configuration payload from a shared URL.
   */
  static decodeConfigFromUrl(encoded: string): any | null {
    try {
      const json = decodeURIComponent(escape(atob(encoded)));
      const min = JSON.parse(json);
      return {
        configurationId: min.id,
        productId: min.p,
        dimensions: { width: min.w, depth: min.d, height: min.h },
        modules: min.m || [],
        materials: min.mat || {},
        colors: min.c || {},
        finishes: min.f || {},
        options: min.o || {},
      };
    } catch {
      return null;
    }
  }

  /**
   * Saves a configuration to localStorage.
   */
  static saveConfiguration(config: CanonicalConfiguration): void {
    if (typeof window === "undefined") return;
    try {
      const existing = this.getSavedConfigurations();
      const updated = [config, ...existing.filter((c) => c.configurationId !== config.configurationId)];
      localStorage.setItem(STORAGE_KEY_CONFIGS, JSON.stringify(updated.slice(0, 20)));
    } catch (err) {
      console.warn("Error saving configuration", err);
    }
  }

  /**
   * Retrieves all locally saved configurations.
   */
  static getSavedConfigurations(): CanonicalConfiguration[] {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY_CONFIGS);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  /**
   * Records a quote request in the database / storage.
   */
  static submitQuoteRequest(quote: Omit<QuoteRequest, "id" | "createdAt" | "status">): QuoteRequest {
    const fullQuote: QuoteRequest = {
      ...quote,
      id: `QUO-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    if (typeof window !== "undefined") {
      try {
        const quotes = this.getQuoteRequests();
        localStorage.setItem(STORAGE_KEY_QUOTES, JSON.stringify([fullQuote, ...quotes]));
      } catch (err) {
        console.warn("Failed to store quote", err);
      }
    }

    return fullQuote;
  }

  /**
   * Retrieves all quote requests (for admin panel).
   */
  static getQuoteRequests(): QuoteRequest[] {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY_QUOTES);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  /**
   * Records a design advisor lead in storage.
   */
  static submitAdvisorLead(lead: Omit<DesignAdvisorLead, "id" | "createdAt">): DesignAdvisorLead {
    const fullLead: DesignAdvisorLead = {
      ...lead,
      id: `LEAD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      createdAt: new Date().toISOString(),
    };

    if (typeof window !== "undefined") {
      try {
        const leads = this.getAdvisorLeads();
        localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify([fullLead, ...leads]));
      } catch (err) {
        console.warn("Failed to store advisor lead", err);
      }
    }

    return fullLead;
  }

  /**
   * Retrieves all advisor leads.
   */
  static getAdvisorLeads(): DesignAdvisorLead[] {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY_LEADS);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  /**
   * Formats a configuration for instant WhatsApp quotation sharing.
   */
  static formatWhatsAppMessage(config: CanonicalConfiguration, clientName?: string): string {
    const header = `Bonjour OÏKOS Maison de Design Casablanca,`;
    const intro = clientName
      ? `Je m'appelle ${clientName} et j'ai personnalisé une pièce sur votre Configurateur 3D.`
      : `Voici ma configuration personnalisée sur votre Studio 3D :`;

    const details = [
      `🏛️ Modèle : ${config.productName}`,
      `📐 Dimensions : L ${config.dimensions.width} × P ${config.dimensions.depth} × H ${config.dimensions.height} cm`,
      `🛋️ Modules : ${config.modules.join(", ") || "Standard"}`,
      `🎨 Matières : ${Object.values(config.materials).join(", ")}`,
      `✨ Finitions : ${Object.values(config.finishes).join(", ") || "Standard"}`,
      `💰 Estimation indicative : ${config.pricing.formattedTotal}`,
      `🔖 Référence : ${config.configurationId}`,
    ].join("\n");

    const closing = `Pourriez-vous me confirmer la faisabilité d'atelier et les délais de livraison gants blancs ?`;

    return `${header}\n\n${intro}\n\n${details}\n\n${closing}`;
  }
}
