import { getCollection, type CollectionEntry } from "astro:content";
import { STUDIO_PAGE_LIMIT } from "../data/site";

export type Project = CollectionEntry<"projects">;

/** Ordre de la page /projets : champ `Ordre` du CMS, croissant. */
export async function getProjectsInOrder(): Promise<Project[]> {
  const projects = await getCollection("projects");
  return projects.sort((a, b) => a.data.order - b.data.order);
}

/**
 * Ordre d'une page ciblée : `studioOrder[key]` croissant, les égalités étant
 * départagées par le champ `order` global — c'est ce tri qui reproduit
 * exactement les listes publiées sur /kitchenette, /chut et /comptoir-du-son.
 * Les projets sans valeur pour ce studio sont exclus, et la liste est tronquée
 * à 7 éléments comme sur le site Framer.
 */
export async function getProjectsForStudio(
  orderKey: "kitchenette" | "chut" | "comptoirDuSon",
  limit: number = STUDIO_PAGE_LIMIT,
): Promise<Project[]> {
  const projects = await getCollection("projects");
  return projects
    .filter((project) => typeof project.data.studioOrder[orderKey] === "number")
    .sort((a, b) => {
      const delta =
        (a.data.studioOrder[orderKey] as number) -
        (b.data.studioOrder[orderKey] as number);
      return delta !== 0 ? delta : a.data.order - b.data.order;
    })
    .slice(0, limit);
}

/** Projet précédent / suivant dans l'ordre de la page /projets. */
export function getSiblings(projects: Project[], slug: string) {
  const index = projects.findIndex((project) => project.data.slug === slug);
  return {
    previous: index > 0 ? projects[index - 1] : undefined,
    next:
      index >= 0 && index < projects.length - 1 ? projects[index + 1] : undefined,
  };
}

/**
 * Sépare le corps Markdown en ses deux sections `## Studio / Contexte` et
 * `## Missions réalisées`, telles que générées par l'export de sauvegarde.
 */
export function splitBody(body: string): {
  studioContext: string[];
  missions: string[];
} {
  const sections: Record<string, string[]> = {};
  let current: string | null = null;

  for (const rawLine of body.split("\n")) {
    const heading = rawLine.match(/^##\s+(.*)$/);
    if (heading) {
      current = heading[1].trim().toLowerCase();
      sections[current] = [];
      continue;
    }
    if (current && rawLine.trim() !== "") {
      sections[current].push(rawLine.trim());
    }
  }

  return {
    studioContext: sections["studio / contexte"] ?? [],
    missions: sections["missions réalisées"] ?? [],
  };
}
