# Nightfall Project Cover Prompt Guide

Use this guide to generate a consistent cover image for every portfolio project before uploading it to Sanity. Each cover should feel like part of the same **Nightfall** portfolio system: calm, technical, dimensional, and deliberately restrained.

> **Use source material as visual inspiration, not as a literal poster.** Architecture diagrams, code screenshots, wireframes, product images, or project screenshots should influence the generated composition. The final cover should never depend on small readable labels or dense interface text.

## Required visual system

| Element | Direction |
| --- | --- |
| **Format** | Wide **16:9** landscape cover. Generate at the highest available resolution. |
| **Base** | Deep charcoal-black background, close to `#100e0b`. |
| **Atmosphere** | Subtle midnight-blue gradient bloom; keep large areas dark and calm. |
| **Accent** | Warm amber signal paths and highlights, close to `#f0c276`. |
| **Supporting tones** | Soft ivory structural lines, muted smoke-gray glass surfaces. |
| **Style** | Premium technical editorial illustration, clean 3D/isometric depth or refined abstract systems visualization. |
| **Composition** | One clear focal system with generous negative space; avoid filling every area. |
| **Text** | No readable text, labels, code, logos, watermarks, or UI copy. |

## How to use a reference image

When adding a reference image to an AI tool, state what must be preserved conceptually. For example, preserve the relationship between a central application core, its service domains, and a database layer—but do **not** reproduce tiny labels, names, or literal boxes.

| Reference type | What to retain | What to avoid |
| --- | --- | --- |
| Architecture diagram | System hierarchy, major domains, flow direction, database or event layer | Readable nodes, arrows with text, exact labels, a white-paper appearance |
| Product screenshot | Product theme, major workflow, primary interaction concept | Browser chrome, small UI text, a generic dashboard screenshot |
| Code or terminal screenshot | Engineering mood, language or infrastructure character | Literal code blocks, syntax text, terminal windows |
| Photograph | The real-world subject or environment | Generic stock-photo styling or unrelated people |

## Reusable generation prompt

Copy the prompt below. Replace the bracketed sections, attach a suitable reference image, and keep the exclusions intact.

```text
Create a wide 16:9 website project-cover illustration for a recruiter-facing software engineering portfolio.

Project concept: [DESCRIBE THE PRODUCT, BACKEND SYSTEM, OR ENGINEERING PROBLEM IN ONE SENTENCE].
Reference interpretation: Use the supplied reference only as conceptual and compositional inspiration. Preserve [THE MAIN SYSTEM RELATIONSHIPS, VISUAL MOTIF, OR SUBJECT], but do not reproduce its labels, interface text, or exact diagram.

Composition: [DESCRIBE THE FOCAL OBJECT OR SYSTEM]. Build a clear hierarchy with [PRIMARY ELEMENT] as the focal point, [SECONDARY ELEMENTS] supporting it, and generous dark negative space around the composition. Use an elegant isometric or lightly dimensional technical-editorial perspective.

Nightfall style: deep charcoal-black background (#100e0b), restrained midnight-blue atmospheric gradient bloom, warm amber highlights and signal paths (#f0c276), soft ivory structural lines, and subtle smoke-gray glass or metallic surfaces. Premium, mature, clean, high-contrast, technically credible, and cinematic without becoming flashy.

Output constraints: no readable text, no labels, no code, no logos, no watermark, no browser frame, no UI screenshot, no stock-photo aesthetic. Avoid neon overload, dense clutter, excessive glow, generic robots, generic hands, and generic floating code. Keep the final image suitable for a polished wide portfolio card.
```

## Project-specific prompt starters

### Backend architecture

```text
Project concept: A production-ready document-intelligence backend with authentication, user workflows, ticketing services, and persistent data.
Composition: A central application core above three connected service domains, with a durable data layer below. Show warm amber signal paths moving through a disciplined, modular system.
```

### AI or RAG system

```text
Project concept: An AI retrieval system that turns private documents into reliable contextual answers.
Composition: A structured flow from document ingestion through embeddings and retrieval to a focused intelligence core, with a stable database foundation underneath. Show information as calm layered light and structured data surfaces, not as a chatbot screen.
```

### Real-time platform

```text
Project concept: A real-time product system that coordinates users, events, and live updates.
Composition: A calm central event core with multiple connected client signals and a resilient persistence layer. Convey continuous flow with amber paths and measured pulses rather than excessive motion effects.
```

## Final quality check

Before uploading a generated cover to Sanity, verify that it is wide, dark, text-free, and visually legible at card size. The focal concept should be recognisable in under two seconds, while the image remains secondary to the project title and summary on the portfolio page.
