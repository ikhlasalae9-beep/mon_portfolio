import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { IntroAnimation } from "@/components/ui/intro-animation";

export const metadata: Metadata = {
  title: "Alae Ikhlas | Data Analyst & Business Intelligence",
  description:
    "Portfolio d'Alae Ikhlas — Data Analyst, Business Intelligence, Machine Learning. Étudiant en Intelligence Artificielle à l'ISMONTIC Tanger. À la recherche d'un stage PFE.",
  keywords: [
    "Data Analyst",
    "Business Intelligence",
    "Machine Learning",
    "Power BI",
    "Python",
    "Stage PFE",
    "Tanger",
    "Maroc",
  ],
  authors: [{ name: "Alae Ikhlas" }],
  openGraph: {
    type: "website",
    title: "Alae Ikhlas | Data Analyst & Business Intelligence",
    description:
      "Portfolio d'Alae Ikhlas — Data Analyst, Business Intelligence, Machine Learning. À la recherche d'un stage PFE.",
    siteName: "Alae Ikhlas Portfolio",
    locale: "fr_FR",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning className="dark" data-theme="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=Sora:wght@600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('portfolio-theme');
                  if (t === 'light') {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.setAttribute('data-theme', 'light');
                  } else {
                    document.documentElement.classList.add('dark');
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased relative selection:bg-[#FF5A4E]/20 selection:text-[#FF5A4E]">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
          storageKey="portfolio-theme"
        >
          <SmoothScrollProvider>
            <ScrollProgress />
            <IntroAnimation />
            <AnimatedBackground />
            <div className="relative z-10">{children}</div>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
