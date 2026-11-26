# Managing the skills map

Studio source: `../Portfolio-sanity/portfolio-projects`.
Local Studio: http://localhost:3333 (use this registered origin, not 127.0.0.1).

1. Publish each Skill you want to use.
2. Open a Project and find **Related skills** at the top. Add references to the skills actually used in that project, then publish.
3. For employment or other practical experience, create an **Experience** document. Set its title (for example, Endpoint Clients), role/context, summary, optional company URL, related skills, and display order. Publish it.
4. Reload `/skills`. Published content can take a short time to update through Sanity's CDN and the page's 60-second revalidation interval.

The graph uses referenced document IDs, not names or `techStack`. Renaming a skill therefore preserves its connections. Removing a reference removes its edge. Empty reference arrays intentionally produce no edges. Draft-only or missing target documents do not create visible edges. A skill can belong to any number of projects and experience entries.

Existing `techStack` tags are unchanged and still drive the project cards. No existing content has been migrated or published automatically. Existing projects need their related skills selected; experience documents must be created before they appear as hubs.

The Experience schema currently feeds the skills map only; it does not replace the existing homepage experience content.

Schema edits are local until the Studio is deployed through its usual deployment workflow. No deployment is required to edit the live dataset through your local Studio, so publishing content there affects the portfolio's production content too.
