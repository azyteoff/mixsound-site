import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const categories = [
  "Sound design / Mix",
  "Mixage",
  "Sound design / habillage sonore",
  "Courts-métrages",
  "Composition musicale",
] as const;

const projects = defineCollection({
  loader: glob({
    base: "./src/content/projects",
    pattern: "**/*.md",
  }),
  schema: z.object({
    slug: z.string().min(1),
    title: z.string().min(1),
    category: z.enum(categories),
    sourcePlatform: z.enum(["Vimeo", "YouTube"]),
    // `z.string().url()` plutôt que `z.url()` : compatible avec le Zod 3
    // embarqué par Astro comme avec Zod 4.
    videoUrl: z.string().url(),
    embedUrl: z.string().url(),
    isYouTube: z.boolean(),
    role: z.string().min(1),
    summary: z.string().min(1),
    year: z.number().int().min(2000).max(2100),
    featured: z.boolean(),
    order: z.number().int().nonnegative(),
    thumbnail: z.object({
      src: z.string().startsWith("/assets/images/projects/"),
      alt: z.string().min(1),
    }),
    skills: z.array(z.string().min(1)).min(1).max(3),
    studioTargets: z.array(reference("studios")),
    studioOrder: z
      .object({
        kitchenette: z.number().int().positive().optional(),
        chut: z.number().int().positive().optional(),
        comptoirDuSon: z.number().int().positive().optional(),
      })
      .default({}),
  }),
});

const studios = defineCollection({
  loader: glob({
    base: "./src/content/studios",
    pattern: "**/*.json",
  }),
  schema: z.object({
    title: z.string().min(1),
  }),
});

export const collections = { projects, studios };
