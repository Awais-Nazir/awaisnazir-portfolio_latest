"use client";

import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  X,
} from "lucide-react";
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

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.04 2C6.52 2 2.03 6.48 2.03 12c0 1.77.46 3.5 1.34 5.02L2 22l5.13-1.34A10 10 0 1 0 12.04 2Zm0 18.18a8.15 8.15 0 0 1-4.16-1.14l-.3-.18-3.05.8.82-2.97-.2-.31A8.13 8.13 0 1 1 12.04 20.18Zm4.46-6.1c-.24-.12-1.43-.7-1.65-.77-.22-.08-.38-.12-.54.12-.16.24-.62.77-.76.93-.14.16-.28.18-.52.06-.24-.12-1-.37-1.9-1.18-.7-.62-1.17-1.39-1.31-1.63-.14-.24-.01-.37.1-.49l.35-.4c.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.4h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.65.58.25 1.03.4 1.38.51.58.18 1.1.15 1.52.09.46-.07 1.43-.58 1.63-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}

export function SiteFrame({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const contactDockRef = useRef<HTMLDivElement>(null);
  const contactTriggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname() || "/";
  const links = usePublicLinks();

  useEffect(() => {
    if (!menuOpen && !contactOpen) return;
    function keydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setContactOpen(false);
        if (menuOpen) menuRef.current?.focus();
        if (contactOpen) contactTriggerRef.current?.focus();
      }
    }
    function pointerdown(event: PointerEvent) {
      if (
        !headerRef.current?.contains(event.target as Node) &&
        !contactDockRef.current?.contains(event.target as Node)
      ) {
        setMenuOpen(false);
        setContactOpen(false);
      }
    }
    document.addEventListener("keydown", keydown);
    document.addEventListener("pointerdown", pointerdown);
    return () => {
      document.removeEventListener("keydown", keydown);
      document.removeEventListener("pointerdown", pointerdown);
    };
  }, [contactOpen, menuOpen]);

  const renderLinks = () =>
    navItems.map(item => (
      <Link
        key={item.href}
        href={item.href}
        aria-current={pathname.startsWith(item.href) ? "page" : undefined}
        onClick={() => {
          setMenuOpen(false);
          setContactOpen(false);
        }}
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
            onClick={() => {
              setMenuOpen(!menuOpen);
              setContactOpen(false);
            }}
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
      <div className="mobile-contact-dock" ref={contactDockRef}>
        {contactOpen && (
          <div
            id="mobile-contact-actions"
            className="mobile-contact-actions"
            aria-label="Contact options"
          >
            {links.whatsapp && (
              <a
                href={links.whatsapp}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                title="WhatsApp"
              >
                <WhatsAppIcon />
              </a>
            )}
            {links.linkedin && (
              <a
                href={links.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <Linkedin size={20} aria-hidden="true" />
              </a>
            )}
            {links.github && (
              <a
                href={links.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                title="GitHub"
              >
                <Github size={20} aria-hidden="true" />
              </a>
            )}
            <a
              href={links.email ? `mailto:${links.email}` : "/contact"}
              aria-label={links.email ? "Email Awais" : "Contact form"}
              title={links.email ? "Email" : "Contact form"}
            >
              <Mail size={20} aria-hidden="true" />
            </a>
          </div>
        )}
        <button
          ref={contactTriggerRef}
          type="button"
          className="mobile-contact-trigger"
          aria-expanded={contactOpen}
          aria-controls="mobile-contact-actions"
          aria-label={
            contactOpen ? "Close contact options" : "Open contact options"
          }
          onClick={() => {
            setContactOpen(!contactOpen);
            setMenuOpen(false);
          }}
        >
          {contactOpen ? <X size={22} /> : <MessageCircle size={22} />}
        </button>
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
