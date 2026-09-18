import type { Metadata, Viewport } from "next";
import { Manrope, Space_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/AppProviders";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

export const viewport: Viewport = {
  themeColor: "#100e0b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://awaisnazir.tech"),
  title: {
    default: "Awais Nazir | Software Engineer, AI Engineer & Web Developer in Islamabad",
    template: "%s | Awais Nazir",
  },
  description:
    "Awais Nazir is a software engineer, AI engineer, and web developer in Islamabad building reliable backend systems, APIs, AI integrations, and production web applications.",
  authors: [{ name: "Awais Nazir" }],
  keywords: [
    "Awais Nazir",
    "software engineer Islamabad",
    "AI engineer Islamabad",
    "web developer Islamabad",
    "backend engineer",
    "AI integration",
    "API development",
    "full stack web development",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  icons: {
    icon: "/images/awais-logo-mark_87eb554f.png",
    apple: "/images/awais-logo-mark_87eb554f.png",
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "https://awaisnazir.tech/",
    siteName: "Awais Nazir",
    title: "Awais Nazir | Software Engineer, AI Engineer & Web Developer",
    description:
      "Software engineering, backend systems, web development, and applied AI integrations from Islamabad.",
    images: [
      {
        url: "/images/awais-nazir-nightfall-portrait_6e4bc477.png",
        width: 1200,
        height: 630,
        alt: "Awais Nazir, software engineer and AI engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Awais Nazir | Software Engineer, AI Engineer & Web Developer",
    description:
      "Software engineering, backend systems, web development, and applied AI integrations from Islamabad.",
    images: ["/images/awais-nazir-nightfall-portrait_6e4bc477.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Awais Nazir",
    url: "https://awaisnazir.tech",
    jobTitle: "Software Engineer and AI Engineer",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Islamabad",
      addressCountry: "PK",
    },
    sameAs: [
      process.env.NEXT_PUBLIC_LINKEDIN_URL || process.env.VITE_LINKEDIN_URL,
      process.env.NEXT_PUBLIC_GITHUB_URL || process.env.VITE_GITHUB_URL,
    ].filter(Boolean),
  };

  return (
    <html lang="en" className={`${manrope.variable} ${spaceMono.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#100e0b] text-foreground font-sans">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
