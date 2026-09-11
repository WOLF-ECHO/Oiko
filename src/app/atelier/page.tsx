import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import { ShieldCheck, CheckCircle2, Clock, Sparkles, Truck, Layers, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "L'Atelier & Savoir-Faire | OÏKOS",
  description:
    "Découvrez les coulisses de confection OÏKOS : alliance entre l'artisanat marocain d'art, l'ingénierie contemporaine et un protocole qualité strict en 7 étapes.",
};

export default function AtelierPage() {
  const steps = [
    {
      num: "01",
      title: "Validation & Fiche Technique",
      desc: "Réception de votre fiche de commande détaillée avec validation précise des dimensions, du choix de tissu ou de marbre et confirmation d'acompte.",
    },
    {
      num: "02",
      title: "Sélection des Matières Nobles",
      desc: "Découpe des dalles de travertin sélectionnées en carrière, débitage des noyers et chênes massifs, et inspection des rouleaux de bouclé italien.",
    },
    {
      num: "03",
      title: "Façonnage & Points Intermédiaires",
      desc: "Assemblages traditionnels à queues d'aronde, cintrage du laiton et garnissage haute résilience avec transmission de photos d'avancement.",
    },
    {
      num: "04",
      title: "Contrôle Qualité Strict",
      desc: "Vérification millimétrique : stabilité, tension des tissus, pureté des arêtes, propreté irréprochable et tests de charge.",
    },
    {
      num: "05",
      title: "Conditionnement Sur Mesure",
      desc: "Protection de chaque pièce sous housses molletonnées hermétiques spécifiques pour prévenir tout micro-frottement lors du transport.",
    },
    {
      num: "06",
      title: "Livraison Gants Blancs au Maroc",
      desc: "Équipe spécialisée en tenue de marque, déballage soigné, mise en place millimétrée dans votre salon et reprise de tous les emballages.",
    },
    {
      num: "07",
      title: "Validation Client & Garantie 5 Ans",
      desc: "Signature conjointe du procès-verbal de réception, remise du certificat d'authenticité signé et guide d'entretien des matières nobles.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0C0B0A] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <SectionHeading
            chapter="Savoir-Faire"
            eyebrow="Excellence Opérationnelle"
            title="L'Atelier &amp; La Rigueur du Geste"
            subtitle="Une promesse simple : allier la poésie de l'artisanat d'art marocain à une exigence industrielle de précision, de délai et de finition."
          />
        </div>

        {/* Hero Craft Image */}
        <div className="relative aspect-[21/9] w-full rounded-3xl overflow-hidden border border-[#282622] bg-[#161513]">
          <Image
            src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=2000&auto=format&fit=crop"
            alt="Atelier d'ébénisterie et tapisserie OÏKOS"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0B0A] via-black/40 to-transparent" />
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 max-w-xl space-y-2">
            <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-medium block">
              Engagement Fondateur
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl text-[#F9F6F0] font-light">
              « Une marque forte attire. Une exécution fiable transforme cette attention en fidélité durable. »
            </h3>
          </div>
        </div>

        {/* 3 Pillars Metrics from Business Plan */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-[#161513] border border-[#282622] text-center space-y-3">
            <span className="font-serif text-5xl sm:text-6xl text-gold-gradient font-light block">
              &ge; 95 %
            </span>
            <h4 className="text-base text-[#F9F6F0] font-medium">Livraisons à l&apos;Heure</h4>
            <p className="text-xs text-[#8E877D] leading-relaxed">
              Planification rigoureuse et marge tampon pour respecter scrupuleusement la date convenue avec nos clients.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#161513] border border-[#282622] text-center space-y-3">
            <span className="font-serif text-5xl sm:text-6xl text-gold-gradient font-light block">
              &lt; 3 %
            </span>
            <h4 className="text-base text-[#F9F6F0] font-medium">Taux de Défaut Cible</h4>
            <p className="text-xs text-[#8E877D] leading-relaxed">
              Double contrôle qualité avant expédition : dimensions, coutures, rectitude des arêtes et toucher de surface.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#161513] border border-[#282622] text-center space-y-3">
            <span className="font-serif text-5xl sm:text-6xl text-gold-gradient font-light block">
              48 h
            </span>
            <h4 className="text-base text-[#F9F6F0] font-medium">Réponse SAV Maximale</h4>
            <p className="text-xs text-[#8E877D] leading-relaxed">
              Une conciergerie réactive dédiée à chaque acquéreur, avec intervention rapide si nécessaire partout au Maroc.
            </p>
          </div>
        </div>

        {/* The 7-Step Protocol from Business Plan */}
        <div className="space-y-12 bg-[#161513] rounded-3xl p-8 sm:p-14 border border-[#282622]">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-medium block">
              Protocole Opérationnel
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#F9F6F0] font-light">
              Le Parcours d&apos;une Création OÏKOS
            </h3>
            <p className="text-xs text-[#C4BEB4] leading-relaxed">
              De la première esquisse au showroom jusqu&apos;à la dépose dans votre salon, chaque étape est documentée et maîtrisée.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {steps.map((step) => (
              <div
                key={step.num}
                className="p-6 rounded-2xl bg-[#0C0B0A] border border-[#282622] space-y-3 flex flex-col justify-between hover:border-[#C5A880]/40 transition-colors"
              >
                <div className="space-y-2">
                  <span className="text-sm font-serif text-[#C5A880] tracking-widest block">
                    Étape {step.num}
                  </span>
                  <h4 className="font-serif text-lg text-[#F9F6F0] font-normal">
                    {step.title}
                  </h4>
                  <p className="text-xs text-[#8E877D] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}

            {/* Custom Consultation box */}
            <div className="p-6 rounded-2xl bg-[#1E1D1A] border border-[#C5A880]/40 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-sm font-serif text-[#C5A880] tracking-widest block">
                  Sur Mesure Total
                </span>
                <h4 className="font-serif text-lg text-[#F9F6F0] font-normal">
                  Votre Projet d&apos;Architecte
                </h4>
                <p className="text-xs text-[#C4BEB4] leading-relaxed">
                  Vous disposez d&apos;une demande particulière pour une villa ou un hôtel ? Notre bureau d&apos;étude analyse vos plans sous 24h.
                </p>
              </div>

              <Link
                href="/contact"
                className="w-full py-3 rounded-full bg-[#C5A880] text-[#0C0B0A] text-xs font-semibold uppercase tracking-wider text-center hover:bg-[#DEC5A5] transition-colors"
              >
                Prendre contact avec l&apos;atelier
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Craft CTA */}
        <div className="text-center py-12 space-y-6">
          <h3 className="font-serif text-3xl sm:text-4xl text-[#F9F6F0]">
            Découvrez Les Matières Dans Notre Showroom
          </h3>
          <p className="text-xs text-[#8E877D] max-w-lg mx-auto">
            Touchez la texture de nos bouclés d&apos;alpaga, appréciez le grain des travertins et la chaleur des noyers à Casablanca.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#F9F6F0] text-[#0C0B0A] text-xs font-semibold tracking-wider uppercase hover:bg-[#C5A880] transition-colors"
          >
            <span>Prendre rendez-vous au showroom</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
