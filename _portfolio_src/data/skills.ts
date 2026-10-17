export interface SkillGroup {
  id: string;
  title: string;
  icon: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'data-ai',
    title: 'Data & IA',
    icon: 'Brain',
    skills: ['Python', 'SQL', 'Machine Learning', 'Web Scraping', 'Expressions Régulières', 'OCR'],
  },
  {
    id: 'bi-engineering',
    title: 'Business Intelligence & Data Engineering',
    icon: 'BarChart3',
    skills: ['Power BI', 'DAX', 'Talend ETL', 'Modélisation en Étoile', 'Excel'],
  },
  {
    id: 'web-db',
    title: 'Développement Web & Bases de Données',
    icon: 'Code2',
    skills: ['Next.js', 'React', 'Streamlit', 'Supabase'],
  },
  {
    id: 'tools',
    title: 'Outils & Gestion de Projet',
    icon: 'Wrench',
    skills: ['Git', 'GitHub', 'Kaggle', 'Trello'],
  },
];
