import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import "./globals.css";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { AmbientBackdrop } from "@/components/visuals/AmbientBackdrop";
import { personal } from "@/data";
import { siteConfig } from "@/lib/site";
import { themeInitScript } from "@/lib/theme";

/* -------------------------------------------------------------------------- */
/*                                   fonts                                    */
/* -------------------------------------------------------------------------- */

/**
 * Self-hosted by next/font at build time: no render-blocking request to
 * Google, no layout shift, and `display: swap` so text paints immediately.
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
});

/* -------------------------------------------------------------------------- */
/*                                  metadata                                  */
/* -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${personal.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: personal.name, url: siteConfig.url }],
  creator: personal.name,
  publisher: personal.name,
  applicationName: `${personal.name} — Portfolio`,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: `${personal.name} — Portfolio`,
    title: siteConfig.title,
    description: siteConfig.description,
    firstName: "Abdedaym",
    lastName: "Chakra",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: `@${personal.name.replace(/\s+/g, "")}`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#07080b" },
    { media: "(prefers-color-scheme: light)", color: "#fcfcfd" },
  ],
};

/* -------------------------------------------------------------------------- */
/*                              structured data                               */
/* -------------------------------------------------------------------------- */

/** schema.org Person — helps search engines understand who this site is about. */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personal.name,
  url: siteConfig.url,
  email: `mailto:${personal.email}`,
  jobTitle: personal.title,
  description: siteConfig.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Marrakech",
    addressCountry: "MA",
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Faculty of Sciences and Techniques, Marrakech",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "Faculty of Sciences and Techniques, Errachidia",
    },
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Data Engineering",
    "DevOps",
    "Cloud Computing",
    "Software Engineering",
    "Full-Stack Development",
  ],
  knowsLanguage: ["Arabic", "French", "English"],
  sameAs: personal.socials
    .filter((social) => !social.href.startsWith("mailto:"))
    .map((social) => social.href),
};

/* -------------------------------------------------------------------------- */
/*                                   layout                                   */
/* -------------------------------------------------------------------------- */

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/*
          Runs before first paint so the correct theme class is already on
          <html> when the page renders — this is what prevents a flash of the
          wrong theme. It must stay inline and synchronous.
        */}
        <script
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
          suppressHydrationWarning
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="min-h-screen bg-bg font-sans antialiased">
        <ThemeProvider>
          <a
            href="#about"
            className="skip-link rounded-full border border-[var(--accent-line)] bg-surface px-4 py-2 text-sm text-fg"
          >
            Skip to main content
          </a>

          <AmbientBackdrop />
          <ScrollProgress />
          <Navbar />

          <main id="main">{children}</main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
