import { useEffect } from "react";
import { useLocation } from "wouter";

type SeoProps = {
    title?: string;
    description?: string;
    path?: string;
    type?: "website" | "article";
};

const siteUrl = "https://awaisnazir.tech";

function setMeta(attribute: "name" | "property", key: string, content: string) {
    let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
    if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
    }
    element.content = content;
}

export function Seo({ title: defaultTitle, description: defaultDescription, path, type = "website" }: SeoProps) {
    const [location] = useLocation();
    const title = defaultTitle ?? (location === "/" ? "Awais Nazir | Software Engineer, AI Engineer & Web Developer in Islamabad" : location.startsWith("/projects/") ? "Project Case Study | Awais Nazir" : location === "/projects" ? "Projects | Awais Nazir" : location === "/skills" ? "Skills | Awais Nazir" : location === "/blog" || location.startsWith("/blog/") ? "Engineering Notes | Awais Nazir" : location === "/contact" ? "Contact Awais Nazir | Software Engineer in Islamabad" : "Awais Nazir | Software Engineer, AI Engineer & Web Developer");
    const description = defaultDescription ?? "Awais Nazir is a software engineer, AI engineer, and web developer in Islamabad building reliable backend systems, APIs, AI integrations, and production web applications.";
    const currentPath = path ?? location;

    useEffect(() => {
        const url = `${siteUrl}${currentPath}`;
        document.title = title;
        setMeta("name", "description", description);
        setMeta("property", "og:title", title);
        setMeta("property", "og:description", description);
        setMeta("property", "og:url", url);
        setMeta("property", "og:type", type);
        setMeta("name", "twitter:title", title);
        setMeta("name", "twitter:description", description);

        const sameAs = [import.meta.env.VITE_LINKEDIN_URL, import.meta.env.VITE_GITHUB_URL].filter(Boolean);
        let structuredData = document.head.querySelector<HTMLScriptElement>('script[data-seo="person"]');
        if (!structuredData) {
            structuredData = document.createElement("script");
            structuredData.type = "application/ld+json";
            structuredData.dataset.seo = "person";
            document.head.appendChild(structuredData);
        }
        structuredData.textContent = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Awais Nazir",
            url: siteUrl,
            jobTitle: "Software Engineer and AI Engineer",
            address: { "@type": "PostalAddress", addressLocality: "Islamabad", addressCountry: "PK" },
            sameAs,
        });

        let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement("link");
            canonical.rel = "canonical";
            document.head.appendChild(canonical);
        }
        canonical.href = url;
    }, [currentPath, description, title, type]);

    return null;
}
