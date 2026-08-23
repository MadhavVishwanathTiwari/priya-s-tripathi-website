/**
 * Environment lookups for the Supabase project.
 *
 * These are functions rather than module constants on purpose: a constant would
 * throw while the module is being imported, which turns a missing variable into
 * an unreadable build error instead of a message at the point of use.
 */

function required(name: string, value: string | undefined) {
  if (!value) {
    throw new Error(
      `${name} is not set. Copy .env.example to .env.local and fill in the ` +
        `Supabase project details; see the "Content and the CMS" section of the README.`,
    );
  }
  return value;
}

export function supabaseUrl() {
  return required(
    "NEXT_PUBLIC_SUPABASE_URL",
    process.env.NEXT_PUBLIC_SUPABASE_URL,
  );
}

export function supabaseAnonKey() {
  return required(
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

export function supabaseServiceRoleKey() {
  return required(
    "SUPABASE_SERVICE_ROLE_KEY",
    process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}

/** Bucket holding post covers and testimonial photos. */
export const MEDIA_BUCKET = "media";

/** Public URL for an object path stored in a row, e.g. `covers/<id>/<file>.webp`. */
export function mediaUrl(objectPath: string) {
  return `${supabaseUrl()}/storage/v1/object/public/${MEDIA_BUCKET}/${objectPath}`;
}
