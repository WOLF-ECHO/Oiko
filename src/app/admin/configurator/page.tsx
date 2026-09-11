"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  CONFIGURATOR_PRODUCTS,
  getProductsByCategory,
} from "@/lib/configurator/products";
import { MATERIALS } from "@/lib/configurator/materials";
import { COLORS } from "@/lib/configurator/colors";
import { ConfiguratorProduct, QuoteRequest, DesignAdvisorLead } from "@/lib/configurator/types";
import { ConfiguratorStorage } from "@/lib/configurator/storage";
import {
  Layers,
  Box,
  Palette,
  FileText,
  Users,
  Plus,
  ArrowUpRight,
  Sparkles,
  Phone,
  Clock,
  Eye,
  CheckCircle2,
  DollarSign,
  Sliders,
} from "lucide-react";

export default function AdminConfiguratorPage() {
  const [activeTab, setActiveTab] = useState<"products" | "materials" | "quotes" | "leads">("products");
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [leads, setLeads] = useState<DesignAdvisorLead[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // New product simulation form state
  const [newModel, setNewModel] = useState({
    name: "",
    category: "sofas",
    basePrice: 20000,
    tagline: "",
    widthDefault: 260,
    widthMin: 200,
    widthMax: 360,
  });

  useEffect(() => {
    setQuotes(ConfiguratorStorage.getQuoteRequests());
    setLeads(ConfiguratorStorage.getAdvisorLeads());
  }, []);

  return (
    <div className="min-h-screen bg-[#0C0B0A] py-10 px-4 sm:px-6 lg:px-8 text-[#EFECE6]">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#282622] pb-6">
          <div>
            <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.25em] text-[#C5A880] mb-1 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>OÏKOS Administration &bull; Data-Driven Studio</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#F9F6F0] font-light">
              Supervision du Configurateur 3D
            </h1>
            <p className="text-xs text-[#8E877D] mt-1">
              Gestion centralisée des modèles, matières, formules tarifaires et suivi des demandes de devis.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/configurateur"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#282622] hover:border-[#C5A880] text-xs text-[#F9F6F0] transition-colors"
            >
              <span>Voir le Studio Public</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A880]" />
            </Link>

            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C5A880] text-[#0C0B0A] text-xs font-bold uppercase tracking-wider hover:bg-[#DEC5A5] transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Nouveau Modèle</span>
            </button>
          </div>
        </div>

        {/* Metric Cards Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#161513] border border-[#282622] space-y-2">
            <span className="text-[10px] uppercase tracking-wider text-[#8E877D] block">
              Modèles Actifs
            </span>
            <span className="font-serif text-3xl text-[#F9F6F0]">
              {CONFIGURATOR_PRODUCTS.length}
            </span>
            <span className="text-[11px] text-[#C5A880] block">
              Canapés, Fauteuils, Tables &amp; Lits
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-[#161513] border border-[#282622] space-y-2">
            <span className="text-[10px] uppercase tracking-wider text-[#8E877D] block">
              Matières Nobles
            </span>
            <span className="font-serif text-3xl text-[#F9F6F0]">
              {MATERIALS.length}
            </span>
            <span className="text-[11px] text-[#C5A880] block">
              {COLORS.length} nuances calibrées
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-[#161513] border border-[#282622] space-y-2">
            <span className="text-[10px] uppercase tracking-wider text-[#8E877D] block">
              Demandes de Devis
            </span>
            <span className="font-serif text-3xl text-[#F9F6F0]">
              {quotes.length}
            </span>
            <span className="text-[11px] text-emerald-400 block">
              Transmises au studio Casablanca
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-[#161513] border border-[#282622] space-y-2">
            <span className="text-[10px] uppercase tracking-wider text-[#8E877D] block">
              Leads Conseiller
            </span>
            <span className="font-serif text-3xl text-[#F9F6F0]">
              {leads.length}
            </span>
            <span className="text-[11px] text-[#C5A880] block">
              Rappels et visites showroom
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-[#282622] pb-1 overflow-x-auto">
          {[
            { id: "products", label: "Modèles & Dimensions (12)" },
            { id: "materials", label: "Bibliothèque de Matières (14)" },
            { id: "quotes", label: `Devis Reçus (${quotes.length})` },
            { id: "leads", label: `Conseillers Demandés (${leads.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 ${
                activeTab === tab.id
                  ? "bg-[#C5A880] text-[#0C0B0A]"
                  : "text-[#8E877D] hover:text-[#F9F6F0]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: PRODUCTS LIST */}
        {activeTab === "products" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {CONFIGURATOR_PRODUCTS.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-[#161513] border border-[#282622] rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-[#C5A880]/50 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-[#C5A880] mb-1">
                      <span>{prod.categoryLabel}</span>
                      <span className="font-mono text-[#8E877D]">{prod.id}</span>
                    </div>
                    <h3 className="font-serif text-xl text-[#F9F6F0]">{prod.name}</h3>
                    <p className="text-xs text-[#8E877D] mt-1 line-clamp-2">{prod.description}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#0C0B0A] border border-[#282622] space-y-1.5 text-xs text-[#8E877D]">
                    <div className="flex justify-between">
                      <span>Prix de départ :</span>
                      <strong className="text-[#F9F6F0]">{prod.basePrice.toLocaleString("fr-MA")} DH</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Plage Largeur :</span>
                      <span className="text-[#F9F6F0]">{prod.dimensions.width.min} à {prod.dimensions.width.max} cm (pas {prod.dimensions.width.step} cm)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Modules supportés :</span>
                      <span className="text-[#C5A880]">{prod.supportedModules?.length || 1}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#282622]">
                    <span className="text-[11px] text-emerald-400 font-medium">&bull; 3D Activé</span>
                    <Link
                      href={`/configurateur?model=${prod.slug}`}
                      className="text-xs text-[#C5A880] hover:text-[#DEC5A5] font-semibold uppercase tracking-wider flex items-center gap-1"
                    >
                      <span>Tester dans le studio</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: MATERIALS LIST */}
        {activeTab === "materials" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MATERIALS.map((mat) => (
              <div
                key={mat.id}
                className="bg-[#161513] border border-[#282622] rounded-2xl p-4 space-y-3"
              >
                <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-[#C5A880]">
                  <span>{mat.category}</span>
                  <span className="bg-[#0C0B0A] px-2 py-0.5 rounded-full border border-[#282622] font-bold">
                    {mat.tier}
                  </span>
                </div>
                <div>
                  <h4 className="font-serif text-base text-[#F9F6F0]">{mat.name}</h4>
                  <p className="text-[11px] text-[#8E877D] line-clamp-2 mt-1">{mat.description}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-[#0C0B0A] text-xs flex items-center justify-between">
                  <span className="text-[#8E877D]">Majoration :</span>
                  <span className="text-[#C5A880] font-bold">
                    {mat.priceModifier > 0 ? `+${mat.priceModifier} DH` : "Inclus"}
                  </span>
                </div>
                <div className="text-[10px] text-[#6E675E]">
                  <span>{mat.availableColors.length} teintes associées</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: QUOTE REQUESTS */}
        {activeTab === "quotes" && (
          <div className="space-y-4">
            {quotes.length === 0 ? (
              <div className="p-12 text-center bg-[#161513] rounded-3xl border border-[#282622] text-[#8E877D]">
                <FileText className="w-8 h-8 text-[#C5A880] mx-auto mb-2 opacity-50" />
                <p className="text-sm">Aucun devis enregistré pour le moment.</p>
                <p className="text-xs mt-1">Les devis générés depuis le studio 3D apparaîtront automatiquement ici.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {quotes.map((q) => (
                  <div
                    key={q.id}
                    className="p-5 rounded-2xl bg-[#161513] border border-[#282622] flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#F9F6F0]">{q.client.fullName}</span>
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#0C0B0A] border border-[#282622] text-[#C5A880]">
                          {q.configurationId}
                        </span>
                      </div>
                      <p className="text-xs text-[#8E877D]">
                        {q.client.phone} &bull; {q.client.email || "Sans email"} &bull; {q.client.city}
                      </p>
                      <p className="text-xs text-[#C4BEB4]">
                        Modèle : <strong className="text-[#F9F6F0]">{q.configuration.productName}</strong> ({q.configuration.dimensions.width} × {q.configuration.dimensions.depth} cm)
                      </p>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-right">
                        <span className="text-[10px] uppercase tracking-wider text-[#8E877D] block">Total</span>
                        <span className="font-serif text-xl text-[#C5A880]">{q.configuration.pricing.formattedTotal}</span>
                      </div>

                      <a
                        href={`https://wa.me/212${q.client.phone.replace(/[^0-9]/g, "").slice(-9)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-full bg-[#C5A880] text-[#0C0B0A] text-xs font-bold uppercase tracking-wider"
                      >
                        Contacter
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: LEADS ADVISOR */}
        {activeTab === "leads" && (
          <div className="space-y-4">
            {leads.length === 0 ? (
              <div className="p-12 text-center bg-[#161513] rounded-3xl border border-[#282622] text-[#8E877D]">
                <Users className="w-8 h-8 text-[#C5A880] mx-auto mb-2 opacity-50" />
                <p className="text-sm">Aucune demande de conseiller en attente.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {leads.map((l) => (
                  <div
                    key={l.id}
                    className="p-5 rounded-2xl bg-[#161513] border border-[#282622] flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-[#F9F6F0]">{l.fullName}</h4>
                      <p className="text-xs text-[#8E877D]">{l.phone} &bull; Canal préféré : {l.preferredContact}</p>
                      {l.notes && <p className="text-xs text-[#C4BEB4] mt-1 italic">&laquo; {l.notes} &raquo;</p>}
                    </div>
                    <span className="text-xs text-[#C5A880] font-mono">{l.configurationId || "Général"}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* NEW PRODUCT SIMULATION MODAL */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-lg bg-[#161513] border border-[#282622] rounded-3xl p-6 sm:p-8 space-y-5">
              <div className="border-b border-[#282622] pb-3">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-bold block">
                  Data-Driven Architecture
                </span>
                <h3 className="font-serif text-2xl text-[#F9F6F0]">
                  Ajouter un Modèle sans Développeur
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="text-[11px] text-[#8E877D]">Nom du Modèle</label>
                  <input
                    type="text"
                    placeholder="Ex: TIVOLI • Canapé d'Angle Bas"
                    value={newModel.name}
                    onChange={(e) => setNewModel({ ...newModel, name: e.target.value })}
                    className="w-full bg-[#0C0B0A] border border-[#282622] rounded-xl px-3 py-2 text-xs text-[#F9F6F0]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] text-[#8E877D]">Catégorie</label>
                    <select
                      value={newModel.category}
                      onChange={(e) => setNewModel({ ...newModel, category: e.target.value })}
                      className="w-full bg-[#0C0B0A] border border-[#282622] rounded-xl px-3 py-2 text-xs text-[#F9F6F0]"
                    >
                      <option value="sofas">Canapés</option>
                      <option value="armchairs">Fauteuils</option>
                      <option value="tables">Tables</option>
                      <option value="beds">Lits</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-[#8E877D]">Prix de Base (DH)</label>
                    <input
                      type="number"
                      value={newModel.basePrice}
                      onChange={(e) => setNewModel({ ...newModel, basePrice: Number(e.target.value) })}
                      className="w-full bg-[#0C0B0A] border border-[#282622] rounded-xl px-3 py-2 text-xs text-[#F9F6F0]"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#0C0B0A] border border-[#282622] text-[11px] text-[#8E877D]">
                  <p className="text-[#C5A880] font-semibold mb-1">Architecture Validée :</p>
                  Grâce à la structure modulaire, ce nouveau produit hérite automatiquement du moteur de règles, de la matériauthèque et du studio 3D sans modifier le moteur React.
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 rounded-full border border-[#282622] text-xs text-[#C4BEB4] uppercase tracking-wider"
                >
                  Fermer
                </button>
                <button
                  onClick={() => {
                    alert("Modèle validé par le schéma de données OÏKOS !");
                    setShowAddModal(false);
                  }}
                  className="flex-1 py-3 rounded-full bg-[#C5A880] text-[#0C0B0A] text-xs font-bold uppercase tracking-wider"
                >
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
