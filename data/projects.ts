export type ProjectCategory = 'power-bi' | 'streamlit-ml' | 'ia-web' | 'community';

// Backward compatibility types and filters
export type ProjectType = 'power-bi' | 'streamlit' | 'ml' | 'python';
export const projectFilters = [
  { id: 'all', label: 'Tous' },
  { id: 'power-bi', label: 'Power BI' },
  { id: 'streamlit', label: 'Streamlit' },
  { id: 'ml', label: 'Machine Learning' },
  { id: 'python', label: 'Python' },
] as const;
export type ProjectFilterId = (typeof projectFilters)[number]['id'];

export interface ProjectCategoryConfig {
  id: ProjectCategory;
  name: string;
  iconName: 'BarChart3' | 'Brain' | 'Globe' | 'Users';
}

export const projectCategories: ProjectCategoryConfig[] = [
  { id: 'power-bi', name: 'Power BI & Data Viz', iconName: 'BarChart3' },
  { id: 'streamlit-ml', name: 'Streamlit & Machine Learning', iconName: 'Brain' },
  { id: 'ia-web', name: 'IA & Mobile / Web', iconName: 'Globe' },
  { id: 'community', name: 'Communauté & Gestion', iconName: 'Users' },
];

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  shortDescription: string; // Max 10 words for card
  description: string;      // Detailed description for modal
  category: ProjectCategory;
  year: string;
  tools: string[];
  cover?: string;           // Real photo ONLY for maisondelux and glutisafe
  images: string[];
  liveUrl?: string;
  embedUrl?: string;
  pbixUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  highlights: string[];
  role: string;
}

export const projects: Project[] = [
  // ─── FEATURED PHARE: MaisonDeLUX (Immobilier & BI) ──────────────────
  {
    id: 'maisondelux',
    slug: 'maisondelux',
    title: 'MaisonDeLUX',
    subtitle: 'Plateforme Immobilière & Prédiction des Prix',
    shortDescription: 'Plateforme immobilière et estimation prédictive des prix au Maroc.',
    description:
      "Plateforme immobilière intégrant un pipeline complet de données — du web scraping à la modélisation analytique — avec un modèle de régression déployé en production pour estimer les prix de l'immobilier au Maroc.",
    category: 'streamlit-ml',
    year: '2025',
    tools: ['Python', 'Scikit-learn', 'Power BI', 'Talend', 'Next.js', 'Supabase'],
    cover: '/projects/maisondeluxcover.png',
    images: ['/projects/maisondeluxcover.png'],
    liveUrl: 'https://maison-delux.com/fr',
    githubUrl: 'https://github.com/ikhlasalae9-beep',
    featured: true,
    highlights: [
      'Web scraping automatisé pour la collecte d’annonces immobilières',
      'Nettoyage rigoureux des données avec regex et traitement des valeurs aberrantes',
      'Modélisation en schéma en étoile via Talend ETL',
      'Création de mesures DAX personnalisées et tableau de bord Power BI',
      'Déploiement d’un modèle de régression intégré à une application Next.js',
    ],
    role: 'Data Engineer · ML Engineer · BI Developer',
  },

  // ─── 1. Power BI & Data Viz (Dashboards) ────────────────────────────
  {
    id: 'pbi-sales-analytics',
    slug: 'pbi-sales-analytics',
    title: 'Performance Commerciale',
    subtitle: 'Ventes & Chiffre d’Affaires',
    shortDescription: 'Suivi de la performance commerciale, marge brute et quotas de vente.',
    description:
      'Tableau de bord décisionnel Power BI dédié au suivi de la performance commerciale : chiffre d’affaires par région, marge brute, analyse des tendances temporelles et atteinte des quotas de vente.',
    category: 'power-bi',
    year: '2025',
    tools: ['Power BI', 'DAX', 'SQL', 'Modélisation'],
    images: [],
    highlights: [
      'Modélisation en schéma en étoile avec table de faits et tables de dimensions',
      'Mesures DAX temporelles avancées (YTD, MTD, YoY, Moving Average)',
      'Navigation interactive avec filtres croisés et infobulles personnalisées',
      'Fichier .pbix prêt à être connecté à vos sources de données',
    ],
    role: 'BI Developer',
  },
  {
    id: 'pbi-financial-kpi',
    slug: 'pbi-financial-kpi',
    title: 'Contrôle Financier',
    subtitle: 'Budget & Trésorerie',
    shortDescription: 'Contrôle budgétaire, flux de trésorerie et rentabilité opérationnelle.',
    description:
      'Tableau de bord financier interactif permettant de comparer les dépenses réelles aux prévisions budgétaires, de piloter le besoin en fonds de roulement et de décomposer la rentabilité opérationnelle.',
    category: 'power-bi',
    year: '2025',
    tools: ['Power BI', 'DAX', 'Excel', 'KPIs'],
    images: [],
    highlights: [
      'Suivi des écarts budget vs. réalisé par département',
      'Visualisation des flux de trésorerie et structure de coûts',
      'Mesures DAX de rentabilité (EBITDA, ROI, Marge Nette)',
      'Export automatisé et rapports paginés pour la direction',
    ],
    role: 'BI Developer',
  },
  {
    id: 'pbi-hr-analytics',
    slug: 'pbi-hr-analytics',
    title: 'Ressources Humaines',
    subtitle: 'Effectifs & Turnover',
    shortDescription: 'Analyse du turnover, masse salariale et effectifs par département.',
    description:
      'Analyse approfondie de la masse salariale, du taux de rotation des collaborateurs (turnover), de l’absentéisme et de la répartition par genre, tranche d’âge et département.',
    category: 'power-bi',
    year: '2024',
    tools: ['Power BI', 'DAX', 'RLS', 'RH'],
    images: [],
    highlights: [
      'Calcul automatisé des indicateurs d’attrition et de rétention',
      'Pyramide des âges dynamique et analyse de l’ancienneté',
      'Suivi des campagnes de recrutement et délais d’embauche',
      'Modèle relationnel sécurisé avec Row-Level Security (RLS)',
    ],
    role: 'BI Developer',
  },
  {
    id: 'pbi-supply-chain',
    slug: 'pbi-supply-chain',
    title: 'Supply Chain & Stocks',
    subtitle: 'Logistique & Flux',
    shortDescription: 'Rotation des stocks, délais d’expédition et respect des accords SLA.',
    description:
      'Visualisation des flux logistiques, du taux de rotation des stocks, du respect des délais de livraison et de l’évaluation de la fiabilité des fournisseurs clés.',
    category: 'power-bi',
    year: '2024',
    tools: ['Power BI', 'DAX', 'Logistique', 'KPIs'],
    images: [],
    highlights: [
      'Surveillance en temps réel des alertes de rupture de stock',
      'Analyse des délais d’expédition et respect des accords SLA',
      'Scorecards dynamiques d’évaluation des transporteurs',
      'Cartographie interactive des points de distribution',
    ],
    role: 'BI Developer',
  },
  {
    id: 'pbi-marketing-roi',
    slug: 'pbi-marketing-roi',
    title: 'Marketing Digital & ROI',
    subtitle: 'Campagnes & Conversions',
    shortDescription: 'Pilotage ROI multi-canaux, coût d’acquisition et entonnoir de conversion.',
    description:
      'Tableau de bord de pilotage des investissements marketing multi-canaux (Google Ads, Meta, SEO), analyse du coût d’acquisition client (CAC) et de la valeur vie client (LTV).',
    category: 'power-bi',
    year: '2024',
    tools: ['Power BI', 'Google Ads', 'DAX', 'ROI'],
    images: [],
    highlights: [
      'Suivi en continu du retour sur dépenses publicitaires (ROAS)',
      'Décomposition de l’entonnoir de conversion du prospect au client',
      'Modèle d’attribution multi-touch des canaux d’acquisition',
      'Alertes de performance sur les variations de coût par clic',
    ],
    role: 'BI Developer',
  },
  {
    id: 'pbi-customer-insights',
    slug: 'pbi-customer-insights',
    title: 'Insights & Segments Client',
    subtitle: 'Segmentation RFM',
    shortDescription: 'Segmentation RFM automatique, satisfaction client et programmes de fidélisation.',
    description:
      'Analyse comportementale des clients par segmentation RFM (Récence, Fréquence, Montant), évaluation de la satisfaction (NPS, CSAT) et programmes de fidélisation.',
    category: 'power-bi',
    year: '2024',
    tools: ['Power BI', 'DAX', 'Segmentation', 'RFM'],
    images: [],
    highlights: [
      'Segmentation RFM automatique des segments VIP, fidèles et dormants',
      'Calcul de la valeur vie prévisionnelle (Customer Lifetime Value)',
      'Analyse de cohorte de réachat mois par mois',
      'Recommandations stratégiques d’actions de réactivation',
    ],
    role: 'BI Developer',
  },

  // ─── 2. Streamlit & Machine Learning ───────────────────────────────
  {
    id: 'projet-education',
    slug: 'projet-education',
    title: 'Projet Éducation',
    subtitle: 'Visualisation du Système Éducatif',
    shortDescription: 'Tableau de bord interactif d’analyse du secteur éducatif marocain.',
    description:
      "Application analytique interactive développée avec Streamlit permettant d'explorer les indicateurs clés du secteur éducatif (taux de scolarisation, réussite académique, effectifs et répartition des ressources pédagogiques). Intègre des graphiques interactifs Plotly et un filtrage multi-critères fluide.",
    category: 'streamlit-ml',
    year: '2025',
    tools: ['Streamlit', 'Python', 'Plotly', 'Pandas'],
    images: [],
    liveUrl: 'https://projeteducation.streamlit.app/',
    embedUrl: 'https://projeteducation.streamlit.app/?embed=true',
    githubUrl: 'https://github.com/ikhlasalae9-beep',
    highlights: [
      'Exploration multi-dimensionnelle des indicateurs académiques',
      'Tableaux de bord interactifs avec visualisations dynamiques Plotly',
      'Filtres par région, niveau d’études et année scolaire',
      'Déploiement en continu sur Streamlit Cloud',
    ],
    role: 'Data Analyst & Développeur Streamlit',
  },
  {
    id: 'churn-bancaire',
    slug: 'churn-bancaire',
    title: 'Prédiction Churn Bancaire',
    subtitle: 'Machine Learning & Détection d’Attrition',
    shortDescription: 'Modèle de classification ML anticipant l’attrition des clients bancaires.',
    description:
      "Solution prédictive complète conçue pour identifier les clients bancaires à fort risque de résiliation. Comprend un pipeline d'ingestion et de prétraitement des données, l'entraînement d'un modèle de classification optimisé avec Scikit-learn, et une interface Streamlit interactive pour tester des profils clients en temps réel.",
    category: 'streamlit-ml',
    year: '2025',
    tools: ['Machine Learning', 'Streamlit', 'Python', 'Scikit-learn'],
    images: [],
    liveUrl: 'https://churnbank2-rb5s8yd78c6vgqr86recdg.streamlit.app/',
    embedUrl: 'https://churnbank2-rb5s8yd78c6vgqr86recdg.streamlit.app/?embed=true',
    githubUrl: 'https://github.com/ikhlasalae9-beep',
    highlights: [
      'Analyse exploratoire et traitement de classes déséquilibrées',
      'Modélisation prédictive avec évaluation approfondie (ROC-AUC, Recall, Precision)',
      'Interface utilisateur Streamlit permettant l’évaluation instantanée de scénarios',
      'Interprétabilité des facteurs clés influençant le départ des clients',
    ],
    role: 'Data Scientist & Développeur ML',
  },

  // ─── 3. IA & Mobile / Web ──────────────────────────────────────────
  {
    id: 'glutisafe',
    slug: 'glutisafe',
    title: 'GlutiSafe V2',
    subtitle: 'Assistant Nutritionnel & Scanner IA',
    shortDescription: 'Assistant alimentaire IA combinant OCR et recommandations sans gluten.',
    description:
      'Application d’assistance alimentaire pour les personnes intolérantes au gluten, combinant reconnaissance optique de caractères (OCR) et chatbot IA pour analyser la composition des étiquettes alimentaires en temps réel.',
    category: 'ia-web',
    year: '2025',
    tools: ['Python', 'OCR', 'IA', 'Supabase', 'Next.js'],
    cover: '/projects/glutisafecover.png',
    images: ['/projects/glutisafecover.png'],
    liveUrl: 'https://gluti-safe-v2.vercel.app/',
    githubUrl: 'https://github.com/ikhlasalae9-beep',
    highlights: [
      'Conception de l’architecture applicative et pipeline de traitement d’images',
      'Développement d’un pipeline OCR pour extraire instantanément le texte des ingrédients',
      'Intégration d’un chatbot conversationnel pour guider les choix nutritionnels',
      'Gestion et persistance des données avec Supabase',
    ],
    role: 'Architecte Logiciel & Développeur IA',
  },
  {
    id: 'softquiz',
    slug: 'softquiz',
    title: 'SoftQuiz',
    subtitle: 'Évaluation des Compétences',
    shortDescription: 'Plateforme web interactive d’évaluation dynamique des compétences professionnelles.',
    description:
      'Application web interactive de quiz destinée à évaluer et renforcer les soft skills et compétences professionnelles, avec un système de score dynamique et une interface soignée.',
    category: 'ia-web',
    year: '2024',
    tools: ['React', 'JavaScript', 'CSS', 'UI/UX'],
    images: [],
    githubUrl: 'https://github.com/ikhlasalae9-beep',
    highlights: [
      'Développement d’une application quiz interactive et réactive',
      'Conception ergonomique et parcours utilisateur intuitif',
      'Logique de calcul et suivi dynamique des scores en temps réel',
      'Restitution visuelle des points forts et axes d’amélioration',
    ],
    role: 'Développeur Front-End & Designer UI',
  },

  // ─── 4. Communauté & Gestion ───────────────────────────────────────
  {
    id: 'itria',
    slug: 'itria',
    title: 'ITRI IA',
    subtitle: 'Gestion & Animation Communautaire',
    shortDescription: 'Animation de communauté étudiante et organisation de workshops IA.',
    description:
      'Initiative communautaire autour de l’Intelligence Artificielle — organisation de workshops pratiques, structuration d’équipes de communication, et création d’une identité visuelle pour fédérer les étudiants autour de l’IA.',
    category: 'community',
    year: '2024',
    tools: ['Trello', 'Branding', 'Communication', 'Gestion'],
    images: [],
    githubUrl: 'https://github.com/ikhlasalae9-beep',
    highlights: [
      'Structuration des équipes de communication et coordination de projets',
      'Organisation des workflows agiles dans Trello',
      'Création d’une identité visuelle fédératrice',
      'Animation d’ateliers pratiques d’initiation à l’IA pour les étudiants',
    ],
    role: 'Chef de Projet & Community Lead',
  },
];
