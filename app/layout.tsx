import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alae Ikhlas | Data Analyst & Business Intelligence",
  description:
    "Portfolio d'Alae Ikhlas, étudiant en Intelligence Artificielle, option Data Analyst, spécialisé en analyse de données, Business Intelligence et Machine Learning. À la recherche d'un stage PFE.",
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
    <html lang="fr" suppressHydrationWarning>
      <body className="grain font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
