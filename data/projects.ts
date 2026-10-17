export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  role: string;
  technologies: string[];
  highlights: string[];
  color: string;
  accentColor: string;
  externalUrl?: string;
  category: 'data' | 'ai' | 'web' | 'community';
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "maisondelux",
    title: "MaisonDeLUX",
    subtitle: "Plateforme Immobilière & Prédiction des Prix",
    description:
      "Plateforme immobilière intégrant un pipeline complet de données — du web scraping à la modélisation analytique — avec un modèle de régression déployé en production pour estimer les prix de l'immobilier au Maroc.",
    role: "Data Engineer · ML Engineer · BI Developer",
    technologies: ["Next.js", "Python", "Machine Learning", "Talend ETL", "Power BI", "Supabase"],
    highlights: [
      "Web scraping pour la collecte de données immobilières",
      "Nettoyage avancé des données avec expressions régulières et traitement des valeurs aberrantes",
      "Déploiement d'un modèle de régression intégré à une application Next.js",
      "Modélisation en schéma en étoile via Talend ETL",
      "Création de mesures DAX personnalisées",
      "Conception d'un tableau de bord analytique Power BI",
    ],
    color: "#5B8CFF",
    accentColor: "#A78BFA",
    externalUrl: "https://maison-delux.com/fr",
    category: "data",
    featured: true,
  },
  {
    id: "glutisafe",
    title: "GlutiSafe",
    subtitle: "Application d'Assistance Alimentaire IA",
    description:
      "Application mobile d'aide alimentaire pour les personnes intolérantes au gluten, combinant reconnaissance optique de caractères et chatbot IA pour analyser les étiquettes d'ingrédients en temps réel.",
    role: "Architecte Logiciel · Développeur IA",
    technologies: ["Python", "OCR", "AI Chatbot", "Supabase"],
    highlights: [
      "Conception de l'architecture applicative",
      "Développement d'un pipeline OCR pour extraire le texte des étiquettes",
      "Intégration d'un chatbot IA interactif",
      "Gestion de base de données avec Supabase",
      "Assistance pour les personnes intolérantes au gluten",
    ],
    color: "#34D399",
    accentColor: "#6EE7B7",
    category: "ai",
  },
  {
    id: "softquiz",
    title: "SoftQuiz",
    subtitle: "Plateforme d'Évaluation des Compétences",
    description:
      "Application web interactive de quiz destinée à évaluer et renforcer les soft skills et compétences professionnelles, avec un système de score dynamique et une interface soignée.",
    role: "Développeur Full-Stack · Designer UI/UX",
    technologies: ["Full-Stack", "Web", "UI/UX"],
    highlights: [
      "Développement d'une application quiz interactive",
      "Conception de l'interface utilisateur et de l'expérience",
      "Logique de questionnaire structurée",
      "Suivi dynamique des scores",
    ],
    color: "#F59E0B",
    accentColor: "#FCD34D",
    category: "web",
  },
  {
    id: "itria",
    title: "ITRI IA",
    subtitle: "Gestion de Projet & Animation de Communauté",
    description:
      "Initiative communautaire autour de l'Intelligence Artificielle — organisation de workshops pratiques, structuration d'équipes de communication, et création d'une identité visuelle pour fédérer les étudiants autour de l'IA.",
    role: "Chef de Projet · Community Manager",
    technologies: ["Trello", "Branding", "Communication", "Social Media"],
    highlights: [
      "Structuration des équipes de communication",
      "Organisation des workflows dans Trello",
      "Création d'une identité visuelle",
      "Coordination d'intervenants invités",
      "Organisation de workshops pratiques sur l'IA pour les étudiants",
    ],
    color: "#EC4899",
    accentColor: "#F9A8D4",
    category: "community",
  },
];
