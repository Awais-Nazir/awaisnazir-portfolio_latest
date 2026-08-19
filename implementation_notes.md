# Portfolio Implementation Notes

The portfolio uses a React client with an Express/tRPC server provided by the managed project template. Sanity content is read only on the server through `server/portfolio.ts`; the frontend receives typed content through public portfolio procedures. The required Sanity identifiers are intentionally read only from `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` and are not present in source code.

The Nightfall visual system uses the supplied three-layer ambient gradient over `#100e0b`, warm gold interaction color `#f0c276`, Manrope for readable body typography, and Space Mono for compact technical labels. Contact submissions validate on the server before an owner notification is sent through the managed notification channel.

The remaining runtime configuration consists of the Sanity values, real contact/social values, a CV URL or file, and any optional contact delivery fallback. The site intentionally renders clear empty states rather than fabricated project, blog, skill, testimonial, or contact data.
