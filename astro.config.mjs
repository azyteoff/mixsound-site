// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://mixsound.fr",
  trailingSlash: "ignore",
  build: {
    // `/projets/nike-jordan/index.html` → servi sur /projets/nike-jordan
    format: "directory",
  },
  integrations: [
    sitemap({
      // Les trois pages ciblées ne doivent pas être indexées : elles étaient
      // déjà hors navigation sur le site Framer.
      filter: (page) =>
        !["/kitchenette", "/chut", "/comptoir-du-son"].includes(
          new URL(page).pathname.replace(/\/$/, ""),
        ),
    }),
  ],
});
