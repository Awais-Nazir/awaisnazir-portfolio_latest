import { Github, Linkedin, Mail, Menu, MessageCircle, X } from "lucide-react";
import { type ReactNode, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "wouter";
import { portraitObjectPosition } from "@/lib/homeInteractions";
import { FeedbackAction } from "./FeedbackAction";

const navItems = ["Home", "Projects", "Skills", "Blog", "Contact"] as const;
const pageFor = (item: (typeof navItems)[number]) => (item === "Home" ? "/" : `/${item.toLowerCase()}`);

export function SiteFrame({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();
  const email = import.meta.env.VITE_CONTACT_EMAIL as string | undefined;
  const github = import.meta.env.VITE_GITHUB_URL as string | undefined;
  const linkedin = import.meta.env.VITE_LINKEDIN_URL as string | undefined;
  const whatsapp = import.meta.env.VITE_WHATSAPP_URL as string | undefined;
  const portrait = "/images/img2.png";
  const isProjectDetail = /^\/projects\/[^/]+$/.test(location);
  const floatingWhatsAppAction = whatsapp && location !== "/contact" ? <FeedbackAction href={whatsapp} target="_blank" rel="noreferrer" className={`floating-whatsapp ${isProjectDetail ? "floating-whatsapp--above-project-dock" : ""} fixed bottom-6 right-5 z-[100] grid size-12 place-items-center rounded-full p-0 shadow-[0_14px_34px_rgba(0,0,0,.38)] lg:hidden`} aria-label="Let’s Talk on WhatsApp" data-testid="floating-whatsapp"><MessageCircle size={21} /></FeedbackAction> : null;

  return (
    <>
      <div className="relative min-h-screen overflow-x-clip bg-[#100e0b] text-[#f6f1e9]">
        <div className="pointer-events-none absolute inset-0 blur-[25px] md:blur-[36px]" style={{ background: "radial-gradient(85% 55% at 52% 0%, rgba(35,70,105,0.34) 0%, rgba(24,49,74,0.18) 38%, transparent 76%)", mixBlendMode: "screen" }} aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 blur-[25px] opacity-90 md:blur-[36px]" style={{ background: "linear-gradient(180deg, rgba(54,88,120,0.16) 0%, transparent 45%, rgba(0,0,0,0.18) 100%)", mixBlendMode: "soft-light" }} aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 blur-[25px] md:blur-[36px]" style={{ background: "radial-gradient(42% 35% at 78% 16%, rgba(96,130,155,0.16) 0%, transparent 78%)", mixBlendMode: "screen" }} aria-hidden="true" />
        <div className="nightfall-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

        <div className="relative z-[1] pt-20">
          <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-5">
            <div className="mx-auto flex h-[62px] max-w-6xl items-center justify-between gap-3 rounded-2xl border border-white/[0.12] bg-[#17130f]/72 px-3 shadow-[0_18px_42px_rgba(0,0,0,0.3)] backdrop-blur-2xl sm:px-4">
              <Link href="/" className="flex min-w-0 items-center gap-2.5" aria-label="Awais Nazir home">
                <span className="grid size-8 shrink-0 overflow-hidden rounded-full border border-[#f0c276]/45 bg-[#f0c276]/10">
                  <img src={portrait} alt="" className="size-full object-cover" style={{ objectPosition: portraitObjectPosition }} />
                </span>
                <span className="truncate text-xs font-medium tracking-[-0.02em] text-[#f6f1e9] sm:text-sm">Awais Nazir</span>
              </Link>
              <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary navigation">
                {navItems.map((item) => <Link key={item} href={pageFor(item)} className="text-sm text-[#f6f1e9]/70 transition-colors hover:text-[#f0c276]">{item}</Link>)}
                <FeedbackAction href={whatsapp ?? "/contact"} target={whatsapp ? "_blank" : undefined} rel={whatsapp ? "noreferrer" : undefined}>
                  <MessageCircle size={14} /> Let&apos;s Talk
                </FeedbackAction>
              </nav>
              <button className="nav-icon-button mobile-menu-trigger lg:hidden" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label="Toggle navigation menu">
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
            <div className={`mx-auto grid max-w-6xl transition-[grid-template-rows,opacity,margin,transform] duration-300 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] lg:hidden ${menuOpen ? "mt-2 translate-y-0 grid-rows-[1fr] opacity-100" : "-translate-y-1 grid-rows-[0fr] opacity-0"}`}>
              <nav id="mobile-navigation" className="min-h-0 overflow-hidden" aria-label="Mobile navigation" aria-hidden={!menuOpen}>
                <div className="rounded-2xl border border-white/[0.1] bg-[#17130f]/95 p-3 shadow-2xl backdrop-blur-2xl">
                  <div className="flex flex-col">
                    {navItems.map((item) => <Link key={item} href={pageFor(item)} tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 text-sm text-[#f6f1e9]/80 transition-colors hover:bg-white/[0.05] hover:text-[#f0c276]">{item}</Link>)}
                    <FeedbackAction href={whatsapp ?? "/contact"} target={whatsapp ? "_blank" : undefined} rel={whatsapp ? "noreferrer" : undefined} tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)} className="mt-1 justify-center rounded-lg px-3 py-3 text-sm">
                      <MessageCircle size={15} /> Let&apos;s Talk on WhatsApp
                    </FeedbackAction>
                  </div>
                </div>
              </nav>
            </div>
          </header>

          {children}

          <footer className="border-t border-white/[0.08] bg-black/10">
            <div className="container grid gap-10 py-12 md:grid-cols-[1.3fr_1fr_1fr]">
              <div><p className="font-mono text-sm tracking-[0.12em] text-[#f0c276]">AWAIS NAZIR</p><p className="mt-3 max-w-sm text-sm leading-6 text-[#f6f1e9]/58">Backend systems and AI integration, built for products that need to actually work.</p></div>
              <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#f6f1e9]/45">Navigate</p><div className="mt-4 flex flex-col gap-2.5">{navItems.map((item) => <Link key={item} href={pageFor(item)} className="w-fit text-sm text-[#f6f1e9]/70 transition hover:text-[#f0c276]">{item}</Link>)}</div></div>
              <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#f6f1e9]/45">Connect</p><div className="mt-4 flex flex-col items-start gap-2.5 text-sm">{email && <a className="inline-flex items-center gap-2 text-[#f6f1e9]/70 transition hover:text-[#f0c276]" href={`mailto:${email}`}><Mail size={15} /> {email}</a>}{whatsapp && <a className="inline-flex items-center gap-2 text-[#f6f1e9]/70 transition hover:text-[#f0c276]" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={15} /> WhatsApp</a>}{github && <a className="inline-flex items-center gap-2 text-[#f6f1e9]/70 transition hover:text-[#f0c276]" href={github} target="_blank" rel="noreferrer"><Github size={15} /> GitHub</a>}{linkedin && <a className="inline-flex items-center gap-2 text-[#f6f1e9]/70 transition hover:text-[#f0c276]" href={linkedin} target="_blank" rel="noreferrer"><Linkedin size={15} /> LinkedIn</a>}{!email && !whatsapp && !github && !linkedin && <Link className="inline-flex items-center gap-2 text-[#f6f1e9]/70 transition hover:text-[#f0c276]" href="/contact"><Mail size={15} /> Contact</Link>}</div></div>
            </div>
            <div className="container border-t border-white/[0.08] py-5 text-xs text-[#f6f1e9]/40">© {new Date().getFullYear()} Awais Nazir. All rights reserved.</div>
          </footer>
        </div>
      </div>
      {floatingWhatsAppAction && createPortal(floatingWhatsAppAction, document.body)}
    </>
  );
}
