/**
 * This structure is intentionally dormant until real testimonials are supplied.
 * Enable `showTestimonials` and provide verified customer feedback to render it.
 */
const showTestimonials = false;

export function TestimonialsSection() {
  if (!showTestimonials) return null;

  return <section aria-labelledby="testimonials-heading" className="container py-20 sm:py-28">
    <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#f0c276]">Testimonials</p>
    <h2 id="testimonials-heading" className="mt-4 text-3xl font-semibold tracking-[-0.045em] text-[#f6f1e9] sm:text-4xl">Trusted delivery, in their words.</h2>
  </section>;
}
