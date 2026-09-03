import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { PRODUCTS, Product } from "@/data/products";
import ProductDetailClient from "./ProductDetailClient";
import { JsonLdProduct } from "@/components/seo/JsonLd";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Pièce introuvable | VELMORA",
    };
  }

  return {
    title: `${product.name} | VELMORA Maroc`,
    description: `${product.name} - ${product.subtitle}. Confection contemporaine sur mesure au Maroc. ${product.description.slice(0, 150)}...`,
    openGraph: {
      title: `${product.name} | VELMORA Maison de Mobilier`,
      description: product.description,
      images: [
        {
          url: product.images[0],
          width: 1200,
          height: 900,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Related products in the same universe
  const related = PRODUCTS.filter(
    (p) => p.id !== product.id && p.universe === product.universe
  ).slice(0, 3);

  return (
    <>
      <JsonLdProduct product={product} />
      <ProductDetailClient product={product} related={related} />
    </>
  );
}
