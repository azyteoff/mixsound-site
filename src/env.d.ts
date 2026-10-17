/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** Endpoint du formulaire de contact. Vide = repli `mailto:`. */
  readonly PUBLIC_CONTACT_FORM_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
