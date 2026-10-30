"use client";

import { useEffect, useState } from "react";
import { X, ShieldCheck, FileText, Lock, Building, Scale, ArrowRight, Printer } from "lucide-react";

export type LegalTab = "mentions" | "cgv" | "confidentialite";

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: LegalTab;
}

export default function LegalModal({
  isOpen,
  onClose,
  initialTab = "mentions",
}: LegalModalProps) {
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#141311] border border-[#2B2822] rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.95)] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-[#2B2822] bg-[#0E0D0C]/90 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5" />
                Informations Juridiques &amp; Réglementaires
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#F9F6F0]">
                OÏKOS Maison de Design
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 text-[#8E877D] hover:text-[#F9F6F0] bg-[#1E1D1A] hover:bg-[#282622] rounded-full border border-[#2B2822] transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-[#2B2822]/60">
            <button
              onClick={() => setActiveTab("mentions")}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all flex items-center gap-2 ${
                activeTab === "mentions"
                  ? "bg-[#C5A880] text-[#0C0B0A] font-semibold shadow-md"
                  : "bg-[#1B1916] text-[#A69F93] hover:text-[#F9F6F0] hover:bg-[#25221D]"
              }`}
            >
              <Building className="w-3.5 h-3.5" />
              <span>Mentions Légales</span>
            </button>

            <button
              onClick={() => setActiveTab("cgv")}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all flex items-center gap-2 ${
                activeTab === "cgv"
                  ? "bg-[#C5A880] text-[#0C0B0A] font-semibold shadow-md"
                  : "bg-[#1B1916] text-[#A69F93] hover:text-[#F9F6F0] hover:bg-[#25221D]"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Conditions Générales de Vente (CGV)</span>
            </button>

            <button
              onClick={() => setActiveTab("confidentialite")}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all flex items-center gap-2 ${
                activeTab === "confidentialite"
                  ? "bg-[#C5A880] text-[#0C0B0A] font-semibold shadow-md"
                  : "bg-[#1B1916] text-[#A69F93] hover:text-[#F9F6F0] hover:bg-[#25221D]"
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Données &amp; CNDP</span>
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-xs sm:text-sm text-[#C4BEB4] leading-relaxed custom-scrollbar">
          {/* TAB 1: MENTIONS LÉGALES */}
          {activeTab === "mentions" && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-[#1B1916] border border-[#2B2822]">
                <p className="text-xs text-[#A69F93]">
                  Conformément aux lois en vigueur au Royaume du Maroc régissant le commerce électronique, la société de l&apos;information et la protection du consommateur.
                </p>
              </div>

              <section className="space-y-2">
                <h3 className="font-serif text-lg text-[#F9F6F0] flex items-center gap-2">
                  <span className="text-[#C5A880]">01.</span> Éditeur du Site
                </h3>
                <p>
                  Le présent site internet accessible à l&apos;adresse <strong className="text-[#F9F6F0]">www.oikos.ma</strong> est édité par la société :
                </p>
                <div className="p-4 rounded-xl bg-[#0E0D0C] border border-[#2B2822] space-y-1.5 text-xs">
                  <p><span className="text-[#8E877D]">Dénomination sociale :</span> <strong className="text-[#F9F6F0]">OÏKOS Maison de Design SARL</strong></p>
                  <p><span className="text-[#8E877D]">Siège Social, Showroom &amp; Atelier :</span> ERRAHMA BLOC 80 N°112, DAR BOUAZZA, CASABLANCA, MAROC</p>
                  <p><span className="text-[#8E877D]">Téléphone Conciergerie :</span> +212 (0)7 22 03 33 26</p>
                  <p><span className="text-[#8E877D]">Adresse électronique :</span> oikosmaison@gmail.com</p>
                  <p><span className="text-[#8E877D]">Registre du Commerce :</span> Casablanca</p>
                  <p><span className="text-[#8E877D]">Tribunal compétent :</span> Tribunal de Commerce de Casablanca</p>
                  <p><span className="text-[#8E877D]">Directeur de la publication :</span> La Direction Générale OÏKOS</p>
                </div>
              </section>

              <section className="space-y-2">
                <h3 className="font-serif text-lg text-[#F9F6F0] flex items-center gap-2">
                  <span className="text-[#C5A880]">02.</span> Hébergement Technique
                </h3>
                <p>
                  Le site est hébergé sur des infrastructures d&apos;hébergement haute disponibilité et sécurisées (Cloud Haute Performance avec certificat SSL/TLS 256 bits).
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-serif text-lg text-[#F9F6F0] flex items-center gap-2">
                  <span className="text-[#C5A880]">03.</span> Propriété Intellectuelle &amp; Droits d&apos;Auteur
                </h3>
                <p>
                  L&apos;ensemble des éléments constitutifs de ce site (charte graphique, photographies des collections de chaises et fauteuils, textures, modélisations 3D, marques, logotypes, textes, architecture sonore et logicielle) est protégé par la législation marocaine et internationale relative au droit d&apos;auteur et à la propriété intellectuelle.
                </p>
                <p>
                  La marque verbale et figurative <strong className="text-[#F9F6F0]">OÏKOS</strong> est déposée et protégée auprès de l&apos;Office Marocain de la Propriété Industrielle et Commerciale (OMPIC). Toute reproduction, représentation, diffusion, adaptation ou exploitation partielle ou totale des œuvres et modèles présentés, sans accord exprès et écrit préalable d&apos;OÏKOS Maison de Design SARL, est constitutive de contrefaçon et passible de poursuites judiciaires.
                </p>
              </section>
            </div>
          )}

          {/* TAB 2: CGV */}
          {activeTab === "cgv" && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-[#1B1916] border border-[#2B2822]">
                <p className="text-xs text-[#A69F93]">
                  Conditions Générales régissant les ventes de mobilier d&apos;art, chaises, fauteuils confectionnés à l&apos;atelier et les prestations d&apos;accompagnement en Conception Globale.
                </p>
              </div>

              <section className="space-y-2">
                <h3 className="font-serif text-lg text-[#F9F6F0] flex items-center gap-2">
                  <span className="text-[#C5A880]">Article 1.</span> Objet &amp; Domaine d&apos;Application
                </h3>
                <p>
                  Les présentes Conditions Générales de Vente (CGV) s&apos;appliquent à toute commande passée auprès de la maison OÏKOS, que ce soit en showroom, par correspondance, par devis personnalisé ou via nos canaux numériques officiels. Toute commande emporte adhésion pleine et entière aux présentes dispositions.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-serif text-lg text-[#F9F6F0] flex items-center gap-2">
                  <span className="text-[#C5A880]">Article 2.</span> Fabrication Sur-Mesure &amp; Spécifications
                </h3>
                <p>
                  Chaque assise (chaise de réception, fauteuil lounge, tabouret de bar) est une pièce unique réalisée sur mesure selon les sélections de bois massif (noyer, chêne miel, chêne blanchi, finition fumée), de métaux brossés et d&apos;étoffes haut de gamme (bouclettes texturées, lins lourds, velours soyeux) validées par le client.
                </p>
                <p>
                  En raison du caractère noble et vivant des matériaux naturels employés (veinage du bois, nuances de fibres textiles), de légères variations d&apos;aspect peuvent exister, constituant la signature authentique d&apos;une fabrication artisanale d&apos;exception.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-serif text-lg text-[#F9F6F0] flex items-center gap-2">
                  <span className="text-[#C5A880]">Article 3.</span> Tarification &amp; Modalités de Règlement
                </h3>
                <p>
                  Les tarifs sont établis en Dirhams Marocains (MAD) toutes taxes comprises (TTC). Pour toute commande d&apos;atelier :
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-[#A69F93]">
                  <li><strong className="text-[#F9F6F0]">Acompte de confirmation :</strong> 50% du montant total à la signature du bon de commande pour engager l&apos;approvisionnement des bois et tissus et débuter la confection d&apos;ébénisterie.</li>
                  <li><strong className="text-[#F9F6F0]">Solde :</strong> 50% restant dû à la mise à disposition ou au jour de la livraison et installation.</li>
                  <li><strong className="text-[#F9F6F0]">Moyens de paiement :</strong> Virement bancaire professionnel, chèque certifié, ou règlement au showroom.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="font-serif text-lg text-[#F9F6F0] flex items-center gap-2">
                  <span className="text-[#C5A880]">Article 4.</span> Délais d&apos;Atelier
                </h3>
                <p>
                  Le délai de confection standard en atelier est de <strong className="text-[#F9F6F0]">2 à 4 semaines</strong> à compter de la confirmation du devis et de l&apos;acompte. Des délais adaptés peuvent être convenus pour les projets de Conception Globale ou les commandes professionnelles volumineuses (hôtellerie, restauration, sièges d&apos;entreprise).
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-serif text-lg text-[#F9F6F0] flex items-center gap-2">
                  <span className="text-[#C5A880]">Article 5.</span> Livraison &amp; Installation Soignée
                </h3>
                <p>
                  OÏKOS assure une livraison et une installation personnalisées à domicile sur l&apos;ensemble des villes du Maroc (Casablanca, Dar Bouazza, Bouskoura, Rabat, Marrakech, Tanger, Fès, Meknès, Agadir, etc.).
                </p>
                <p>
                  Le client s&apos;engage à signaler au préalable toute contrainte technique d&apos;accès (dimensions des ascenseurs, escaliers étroits, autorisations de copropriété).
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-serif text-lg text-[#F9F6F0] flex items-center gap-2">
                  <span className="text-[#C5A880]">Article 6.</span> Garantie Atelier (6 Mois)
                </h3>
                <p>
                  Chaque pièce de mobilier OÏKOS bénéficie d&apos;une <strong className="text-[#F9F6F0]">garantie atelier de 6 mois</strong> couvrant la solidité de la structure en bois massif, les assemblages tenons-mortaises et les défauts de fabrication avérés.
                </p>
                <p className="text-xs text-[#A69F93]">
                  Cette garantie ne couvre pas l&apos;usure naturelle normale des étoffes, les taches accidentelles de liquides, l&apos;exposition prolongée à des intempéries extérieures pour des modèles d&apos;intérieur, ou tout dommage résultant d&apos;une mauvaise utilisation.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-serif text-lg text-[#F9F6F0] flex items-center gap-2">
                  <span className="text-[#C5A880]">Article 7.</span> Pièces Sur-Mesure &amp; Droit de Rétractation
                </h3>
                <p>
                  Conformément aux dispositions de la loi marocaine n° 31-08 édictant des mesures de protection du consommateur, le droit de rétractation ne s&apos;applique pas aux biens confectionnés sur mesure ou nettement personnalisés selon les choix exclusifs de tissu, d&apos;essence de bois ou de gabarit formulés par le client.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-serif text-lg text-[#F9F6F0] flex items-center gap-2">
                  <span className="text-[#C5A880]">Article 8.</span> Litiges &amp; Droit Applicable
                </h3>
                <p>
                  Les présentes conditions sont soumises à la loi marocaine. En cas de différend relatif à l&apos;interprétation ou à l&apos;exécution d&apos;une commande, les parties s&apos;engagent à rechercher prioritairement un règlement à l&apos;amiable. À défaut d&apos;accord, les Tribunaux de Commerce de Casablanca seront seuls compétents.
                </p>
              </section>
            </div>
          )}

          {/* TAB 3: DONNÉES & CNDP */}
          {activeTab === "confidentialite" && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-[#1B1916] border border-[#2B2822]">
                <p className="text-xs text-[#A69F93]">
                  Protection des données à caractère personnel conformément aux exigences de la Commission Nationale de Contrôle de la Protection des Données à Caractère Personnel (CNDP) et de la Loi n° 09-08.
                </p>
              </div>

              <section className="space-y-2">
                <h3 className="font-serif text-lg text-[#F9F6F0] flex items-center gap-2">
                  <span className="text-[#C5A880]">01.</span> Collecte &amp; Finalité des Données
                </h3>
                <p>
                  Les informations recueillies via nos formulaires de contact, questionnaire de Conception Globale ou devis personnalisés (nom, prénom, numéro de téléphone, adresse email, adresse de livraison, détails du projet d&apos;aménagement) font l&apos;objet d&apos;un traitement exclusivement destiné à :
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-[#A69F93]">
                  <li>L&apos;établissement et la transmission des devis sur mesure ;</li>
                  <li>Le suivi de la fabrication et la planification de la livraison d&apos;atelier ;</li>
                  <li>L&apos;envoi des passeports de style et invitations privées aux expositions OÏKOS.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="font-serif text-lg text-[#F9F6F0] flex items-center gap-2">
                  <span className="text-[#C5A880]">02.</span> Non-Divulgation &amp; Sécurité
                </h3>
                <p>
                  OÏKOS s&apos;engage formellement à ne jamais commercialiser, louer ou céder vos données personnelles à des tiers. Les informations sont stockées dans des environnements sécurisés et ne sont accessibles qu&apos;aux collaborateurs habilités de la maison.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-serif text-lg text-[#F9F6F0] flex items-center gap-2">
                  <span className="text-[#C5A880]">03.</span> Vos Droits (Loi 09-08)
                </h3>
                <p>
                  Vous bénéficiez d&apos;un droit d&apos;accès, de rectification et d&apos;opposition aux données vous concernant. Pour exercer ces droits, vous pouvez contacter notre service juridique et conciergerie à tout moment :
                </p>
                <div className="p-3.5 rounded-xl bg-[#0E0D0C] border border-[#2B2822] space-y-1 text-xs">
                  <p><span className="text-[#8E877D]">Email :</span> <a href="mailto:oikosmaison@gmail.com" className="text-[#C5A880] underline">oikosmaison@gmail.com</a></p>
                  <p><span className="text-[#8E877D]">Courrier :</span> OÏKOS Maison de Design SARL – Errahma Bloc 80 N°112, Dar Bouazza, Casablanca</p>
                </div>
              </section>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-[#2B2822] bg-[#0E0D0C] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#8E877D]">
            <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
            <span>Maison certifiée OMPIC &bull; Atelier Dar Bouazza, Casablanca</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-full border border-[#2B2822] text-xs text-[#A69F93] hover:text-[#F9F6F0] hover:bg-[#1E1D1A] transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimer</span>
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-full bg-[#C5A880] text-[#0C0B0A] text-xs font-semibold tracking-wider uppercase hover:bg-[#DEC5A5] transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
