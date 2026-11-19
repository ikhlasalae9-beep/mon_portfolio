export interface StatItem {
  id: string;
  value: string;
  label: string;
  sublabel?: string;
}

/**
 * Hero statistics — easily edit these values anytime.
 */
export const heroStats: StatItem[] = [
  {
    id: 'projects',
    value: '10+',
    label: 'Projets Réalisés',
    sublabel: 'BI, ML & Data Analytics',
  },
  {
    id: 'accuracy',
    value: '95%+',
    label: 'Précision Modèles',
    sublabel: 'Classification & Prédiction',
  },
  {
    id: 'tools',
    value: '15+',
    label: 'Outils Maîtrisés',
    sublabel: 'Python, SQL, Power BI, DAX',
  },
  {
    id: 'commitment',
    value: '100%',
    label: 'Rigueur & Passion',
    sublabel: 'Orienté impact métier',
  },
];
