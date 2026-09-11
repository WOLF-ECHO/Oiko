import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "OÏKOS • Maison de Design & d'Art",
    short_name: "OÏKOS",
    description:
      "Maison marocaine de mobilier contemporain d'exception, architecture intérieure et configurateur 3D au Boulevard d'Anfa à Casablanca.",
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
