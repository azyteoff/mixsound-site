/**
 * Construction des URL d'intégration Vimeo / YouTube à partir des champs CMS.
 *
 * Les URL stockées dans le CMS Framer sont des URL de partage
 * (`https://vimeo.com/1207222666?share=copy&fl=sv&fe=ci`,
 * `https://www.youtube.com/watch?v=JO-1jR_yP58`). Elles ne sont pas
 * intégrables telles quelles : il faut les convertir en URL de lecteur.
 */

export type VideoEmbed = {
  provider: "vimeo" | "youtube";
  id: string;
  /** URL du lecteur, à placer dans l'iframe. */
  src: string;
  /** URL publique de la vidéo, pour le lien de repli. */
  watchUrl: string;
};

function extractVimeoId(url: string): string | null {
  // Couvre vimeo.com/<id>, player.vimeo.com/video/<id> et vimeo.com/manage/videos/<id>
  const match = url.match(
    /vimeo\.com\/(?:manage\/videos\/|video\/|channels\/[^/]+\/)?(\d+)/i,
  );
  return match ? match[1] : null;
}

function extractYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/i,
  );
  return match ? match[1] : null;
}

/**
 * `isYouTube` fait autorité sur `sourcePlatform` : l'export Framer contient au
 * moins une incohérence (`gucci-perfume` est marqué `Platform = YouTube` alors
 * que la vidéo est hébergée sur Vimeo et que `Is You Tube` vaut `false`).
 */
export function getVideoEmbed(
  embedUrl: string,
  isYouTube: boolean,
): VideoEmbed | null {
  if (isYouTube) {
    const id = extractYouTubeId(embedUrl);
    if (!id) return null;
    return {
      provider: "youtube",
      id,
      // nocookie : aucun cookie de suivi tant que la vidéo n'est pas lancée.
      src: `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`,
      watchUrl: `https://www.youtube.com/watch?v=${id}`,
    };
  }

  const id = extractVimeoId(embedUrl);
  if (!id) return null;
  return {
    provider: "vimeo",
    id,
    src: `https://player.vimeo.com/video/${id}?dnt=1&title=0&byline=0&portrait=0`,
    watchUrl: `https://vimeo.com/${id}`,
  };
}
