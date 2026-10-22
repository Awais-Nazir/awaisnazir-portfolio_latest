export type PublicLinks = {
  email?: string;
  github?: string;
  linkedin?: string;
  whatsapp?: string;
  cv?: string;
};

// Server-only usage: serialize this public allowlist, never the full environment.
// Legacy VITE_* variables are unavailable in Next.js browser bundles.
export function getPublicLinks(): PublicLinks {
  return {
    email:
      process.env.NEXT_PUBLIC_CONTACT_EMAIL ||
      process.env.VITE_CONTACT_EMAIL ||
      undefined,
    github:
      process.env.NEXT_PUBLIC_GITHUB_URL ||
      process.env.VITE_GITHUB_URL ||
      undefined,
    linkedin:
      process.env.NEXT_PUBLIC_LINKEDIN_URL ||
      process.env.VITE_LINKEDIN_URL ||
      undefined,
    whatsapp:
      process.env.NEXT_PUBLIC_WHATSAPP_URL ||
      process.env.VITE_WHATSAPP_URL ||
      undefined,
    cv: process.env.NEXT_PUBLIC_CV_URL || process.env.VITE_CV_URL || undefined,
  };
}
