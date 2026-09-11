import React from "react";
import { Product } from "@/data/products";

export function JsonLdOrganization() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "OÏKOS",
    legalName: "OÏKOS Maison de Design SARL",
    url: "https://oikos.ma",
    logo: "https://oikos.ma/logo-oikos.png",
    email: "koncept.morocco@gmail.com",
    description:
      "Maison marocaine de mobilier contemporain d'exception, pièces sculpturales et architecture intérieure au Boulevard d'Anfa à Casablanca.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Boulevard d'Anfa, Triangle d'Or",
      addressLocality: "Casablanca",
      postalCode: "20050",
      addressCountry: "MA",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+212-722033326",
        contactType: "customer service",
        areaServed: "MA",
        availableLanguage: ["French", "Arabic", "English"],
      },
    ],
    sameAs: [
      "https://www.instagram.com/oikos.ma",
      "https://www.pinterest.com/oikosdesign",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function JsonLdLocalBusiness() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HomeGoodsStore",
    name: "OÏKOS Showroom & Studio Casablanca",
    image: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
    ],
    "@id": "https://oikos.ma/#casablanca-showroom",
    url: "https://oikos.ma/showroom",
    telephone: "+212-722033326",
    email: "koncept.morocco@gmail.com",
    priceRange: "$$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Angle Boulevard d'Anfa & Rue de Bab Mansour",
      addressLocality: "Casablanca",
      addressRegion: "Casablanca-Settat",
      postalCode: "20050",
      addressCountry: "MA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 33.589886,
      longitude: -7.636654,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "10:00",
        closes: "19:30",
      },
    ],
    currenciesAccepted: "MAD",
    paymentAccepted: "Virement, Carte Bancaire, Acompte en showroom",
    areaServed: [
      "Casablanca",
      "Rabat",
      "Marrakech",
      "Tanger",
      "Agadir",
      "Fès",
      "Toutes les villes du Maroc",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function JsonLdProduct({ product }: { product: Product }) {
  const schema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.images,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: "OÏKOS",
    },
    offers: {
      "@type": "Offer",
      url: `https://oikos.ma/collections/${product.slug}`,
      priceCurrency: "MAD",
      price: product.price,
      priceValidUntil: "2027-12-31",
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "OÏKOS",
      },
    },
    material: product.materials.join(", "),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function JsonLdFaq() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Où se trouve le showroom OÏKOS au Maroc ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Notre showroom 'La Galerie Habitable' et studio de conception se situe exclusivement au Boulevard d'Anfa à Casablanca. Les visites privées se font sur rendez-vous en contactant le 07 22 03 33 26 ou par email à koncept.morocco@gmail.com.",
        },
      },
      {
        "@type": "Question",
        name: "Comment utiliser le Configurateur 3D OÏKOS ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Le Configurateur 3D OÏKOS permet de personnaliser en temps réel les dimensions, modules, tissus (bouclé d'alpaga, lin belge, cuirs) et piètements de vos canapés, fauteuils, tables et lits avec estimation tarifaire instantanée et devis exportable.",
        },
      },
      {
        "@type": "Question",
        name: "Quels sont les délais de fabrication et de livraison au Maroc ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nos pièces confectionnées sur commande demandent un délai moyen de 2 à 4 semaines. Nous assurons la livraison et l'installation avec gants blancs partout au Maroc (Casablanca, Rabat, Marrakech, Tanger, etc.).",
        },
      },
      {
        "@type": "Question",
        name: "Proposez-vous un accompagnement dédié aux architectes d'intérieur et décorateurs ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, OÏKOS dispose d'un Espace B2B dédié aux architectes, prescripteurs et hôtels. Nous fournissons les fichiers 3D CAD/BIM, envoyons une matériauthèque d'échantillons sous 48h et appliquons des remises professionnelles.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
