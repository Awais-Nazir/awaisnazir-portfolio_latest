"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePublicLinks } from "@/contexts/PublicLinksContext";

const navItems = [
  { label: "Work", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Writing", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function SiteFrame({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname() || "/";
  const links = usePublicLinks();

  useEffect(() => {
    if (!menuOpen) return;
    function keydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuRef.current?.focus();
      }
    }
    function pointerdown(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node))
        setMenuOpen(false);
    }
    document.addEventListener("keydown", keydown);
    document.addEventListener("pointerdown", pointerdown);
    return () => {
      document.removeEventListener("keydown", keydown);
      document.removeEventListener("pointerdown", pointerdown);
    };
  }, [menuOpen]);

  const renderLinks = () =>
    navItems.map(item => (
      <Link
        key={item.href}
        href={item.href}
        aria-current={pathname.startsWith(item.href) ? "page" : undefined}
        onClick={() => setMenuOpen(false)}
      >
        {item.label}
      </Link>
    ));

  return (
    <div className="editorial-site">
      <a className="editorial-skip" href="#site-content">
        Skip to content
      </a>
      <header className="editorial-header" ref={headerRef}>
        <div className="editorial-container editorial-header-inner">
          <Link
            href="/"
            className="editorial-brand"
            aria-label="Awais Nazir home"
          >
            <span aria-hidden="true">
              an<span className="editorial-brand-dot">.</span>
            </span>
            <span>
              Awais Nazir
              <span className="editorial-brand-caption">SOFTWARE ENGINEER</span>
            </span>
          </Link>
          <nav
            className="editorial-desktop-nav"
            aria-label="Primary navigation"
          >
            {renderLinks()}
            <a
              href={links.cv || "/contact"}
              target={links.cv ? "_blank" : undefined}
              rel={links.cv ? "noreferrer" : undefined}
              className="editorial-nav-resume"
            >
              {links.cv ? "Résumé" : "Request résumé"}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </nav>
          <button
            ref={menuRef}
            type="button"
            className="editorial-menu-button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
        {menuOpen && (
          <nav
            className="editorial-mobile-nav editorial-container"
            id="mobile-navigation"
            aria-label="Mobile navigation"
          >
            {renderLinks()}
            <a
              href={links.cv || "/contact"}
              target={links.cv ? "_blank" : undefined}
              rel={links.cv ? "noreferrer" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {links.cv ? "View résumé ↗" : "Request résumé"}
            </a>
            <a
              href={links.whatsapp || "/contact"}
              target={links.whatsapp ? "_blank" : undefined}
              rel={links.whatsapp ? "noreferrer" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {links.whatsapp ? "Talk on WhatsApp ↗" : "Get in touch"}
            </a>
          </nav>
        )}
      </header>
      <div id="site-content" tabIndex={-1}>
        {children}
      </div>
      <footer className="editorial-footer editorial-container">
        <div>
          <Link href="/" className="editorial-footer-name">
            Awais Nazir<span> / Software engineer</span>
          </Link>
          <p>AI & backend systems. Islamabad, Pakistan.</p>
        </div>
        <div className="editorial-footer-links">
          {links.github && (
            <a href={links.github} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
          )}
          {links.linkedin && (
            <a href={links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
          )}
          <a href={links.email ? `mailto:${links.email}` : "/contact"}>
            {links.email ? "Email ↗" : "Contact ↗"}
          </a>
        </div>
        <span className="editorial-copyright">
          © {new Date().getFullYear()} Awais Nazir
        </span>
      </footer>
    </div>
  );
}
