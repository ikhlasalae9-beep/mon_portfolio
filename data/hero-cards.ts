export interface HeroSkillCard {
  id: string;
  title: string;
  subtitle: string;
  iconName: 'BarChart3' | 'LineChart' | 'Brain' | 'Database' | 'Workflow';
  targetSection: string;
  dotPosition: { x: number; y: number }; // Target point on the subject
  desktopPos: string; // Tailwind positioning classes
  delay: number;
}

export const heroFloatingCards: HeroSkillCard[] = [
  {
    id: 'data-analysis',
    title: 'Data Analysis',
    subtitle: 'Python · SQL · Nettoyage & EDA',
    iconName: 'BarChart3',
    targetSection: '#skills',
    dotPosition: { x: 280, y: 240 },
    desktopPos: '-top-3 -right-2 sm:-right-8 lg:-right-10',
    delay: 0.5,
  },
  {
    id: 'power-bi',
    title: 'Dashboards BI',
    subtitle: 'Power BI · DAX · Schéma en étoile',
    iconName: 'LineChart',
    targetSection: '#skills',
    dotPosition: { x: 300, y: 380 },
    desktopPos: 'top-1/2 translate-y-12 -right-4 sm:-right-10 lg:-right-14',
    delay: 0.7,
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning',
    subtitle: 'Scikit-learn · Modélisation & IA',
    iconName: 'Brain',
    targetSection: '#projects',
    dotPosition: { x: 200, y: 320 },
    desktopPos: 'top-20 -left-2 sm:-left-8 lg:-left-12',
    delay: 0.6,
  },
];

export const heroLatestProject = {
  title: 'Projet Éducation',
  category: 'Streamlit & Data Analysis',
  href: '#projects',
  badge: 'Dernier projet',
};
