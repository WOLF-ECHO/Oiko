import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VELMORA • Maison de Mobilier Contemporain & d'Art",
    short_name: "VELMORA",
    description:
      "Maison marocaine de mobilier contemporain d'exception, pièces sculpturales et art mural.",
    start_url: "/",
    display: "standalone",
    background_color: "#0C0B0A",
    theme_color: "#0C0B0A",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
