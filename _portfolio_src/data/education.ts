export interface EducationEntry {
  id: string;
  degree: string;
  option?: string;
  institution: string;
  location: string;
  period: string;
  current: boolean;
  description: string;
}

export const educationEntries: EducationEntry[] = [
  {
    id: 'ismontic',
    degree: 'Technicien Spécialisé en Intelligence Artificielle',
    option: 'Option Data Analyst',
    institution: 'Institut Spécialisé de Technologie Appliquée NTIC de Tanger',
    location: 'ISMONTIC, Tanger',
    period: '2025 — Présent',
    current: true,
    description:
      'Formation spécialisée couvrant l'analyse de données, le Machine Learning, la Business Intelligence, le développement web et les fondamentaux de l'intelligence artificielle appliquée.',
  },
  {
    id: 'bac',
    degree: 'Baccalauréat en Sciences Physiques',
    institution: 'Lycée El Jamaai',
    location: 'Tanger',
    period: '2023 — 2024',
    current: false,
    description:
      'Formation scientifique en sciences physiques, chimie et mathématiques. Base analytique et rigoureuse, fondatrice de l'approche structurée appliquée aux données.',
  },
];
