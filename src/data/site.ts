/**
 * Constantes du site — reprises telles quelles du site Framer publié.
 *
 * Les deux valeurs marquées TODO sont des anomalies relevées lors de l'audit du
 * 25 juillet 2026 sur mixsound.fr : le lien téléphone ne correspondait pas au
 * numéro affiché et le lien LinkedIn pointait vers l'accueil de LinkedIn.
 * Elles sont volontairement laissées visibles ici plutôt que corrigées à votre
 * place.
 */

export const site = {
  name: "Arthur Thomas",
  url: "https://mixsound.fr",
  lang: "fr",
  defaultTitle: "Arthur Thomas - Ingénieur Son",
  defaultDescription:
    "Portfolio de post-production sonore audiovisuelle : montage son, sound design, et mixage",
  ogImage: "/assets/images/social/default-og.png",
  footerTag: "Ingénieur son · Post-production sonore",
} as const;

export const contact = {
  email: "arthur@mixsound.fr",
  /** Numéro tel qu'affiché sur le site Framer. */
  phoneDisplay: "0769383961",
  /** TODO — le site Framer liait `tel:+33000000000`, incohérent avec l'affichage. */
  phoneHref: "tel:+33769383961",
  /** TODO — le site Framer liait `https://www.linkedin.com/` (page d'accueil). */
  linkedin: "https://www.linkedin.com/",
  cv: "https://candidature-alternance-2026-2027.tiiny.site",
  /** Copie locale du CV, indépendante de Tiiny Host. */
  cvLocal: "/assets/documents/cv-arthur-thomas.pdf",
} as const;

export const nav = [
  { label: "Showreel", href: "/showreel" },
  { label: "Projets", href: "/projets" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
] as const;

/** Identifiant Vimeo du showreel intégré sur l'accueil et sur /showreel. */
export const showreel = {
  vimeoId: "1207055637",
  title: "SHOWREEL Arthur Thomas 2026",
  poster: "/assets/images/showreel/showreel-2026-poster.jpg",
  label: "Vimeo / 2026",
  caption: "Sélection de projets — 2024–2026",
} as const;

/**
 * Pages ciblées déjà publiques sur mixsound.fr.
 * `limit` reproduit le comportement constaté : 7 projets affichés, triés par
 * `studioOrder`, les égalités étant départagées par le champ `order`.
 */
export const studioPages = {
  kitchenette: {
    slug: "kitchenette",
    orderKey: "kitchenette",
    eyebrow: "Sélection ciblée · Kitchenette",
    title: "Une sélection entre sound design, musique à l’image et post-production.",
    lede:
      "Des projets choisis pour leur dimension créative, premium et rythmique dans l’esprit de Kitchenette.",
    seoTitle: "Kitchenette — Arthur Thomas",
    seoDescription:
      "Sélection ciblée de projets sound design, musique à l’image et post-production.",
  },
  chut: {
    slug: "chut",
    orderKey: "chut",
    eyebrow: "Sélection ciblée · Chut! On vous écoute",
    title: "Une sélection entre création sonore, voix et mixage.",
    lede:
      "Des projets choisis pour leur approche transversale de l’audio post, du sound design et de la musique dans l’esprit de Chut!.",
    seoTitle: "Chut — Arthur Thomas",
    seoDescription: "Sélection ciblée de projets création sonore, voix et mixage.",
  },
  "comptoir-du-son": {
    slug: "comptoir-du-son",
    orderKey: "comptoirDuSon",
    eyebrow: "Sélection ciblée · Comptoir du Son",
    title: "Une sélection entre montage son, narration et mixage.",
    lede:
      "Des projets choisis pour la précision du montage, le travail des dialogues et la construction narrative dans l’esprit de la Team Comptoir.",
    seoTitle: "Comptoir du Son — Arthur Thomas",
    seoDescription: "Sélection ciblée de projets montage son, narration et mixage.",
  },
} as const;

export const STUDIO_PAGE_LIMIT = 7;

export const studioCta =
  "Disponible pour échanger autour d’une alternance de 3e année en post-production sonore.";
