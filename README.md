# Portfolio Professionnel — Alae Ikhlas
> **Data Analyst · Business Intelligence · Machine Learning**  
> Étudiant en Intelligence Artificielle (Option Data Analyst) — ISMONTIC Tanger  
> **Objectif :** Recherche d'un Stage de Fin d'Études (Stage PFE)

---

## 🌟 Aperçu du Projet

Portfolio personnel développé sur-mesure pour **Alae Ikhlas**, combinant une identité visuelle moderne (*Midnight × Ivory × Electric Blue*), une expérience interactive axée sur la Data & la Business Intelligence, et des performances optimales.

### Palette de Couleurs
- **Mode Sombre** : Fond `#101322` · Surface `#1D2338` · Texte `#F5F6FA` · Accent `#5B8CFF` · Secondaire `#A78BFA`
- **Mode Clair** : Fond `#F6F4EF` · Surface `#FFFFFF` · Texte `#171A2B` · Accent `#315EEA` · Secondaire `#7754D8`
- **Typographie** : Space Grotesk (Titres & Chiffres) + Inter (Corps de texte)

---

## 🛠️ Stack Technique

- **Framework** : [Next.js 16 (App Router)](https://nextjs.org) avec Turbopack
- **Langage** : TypeScript 5 (Strict Mode)
- **Styling** : Tailwind CSS v4 avec design tokens CSS natifs
- **Animations** : [Motion / Framer Motion](https://motion.dev/) (Staggered reveals, micro-interactions, modal fluide)
- **Thème** : `next-themes` (Dark/Light mode avec détection automatique du système et zéro hydration mismatch)
- **Icônes** : Lucide React + Icônes SVG sur mesure (GitHub, LinkedIn)

---

## 📁 Structure du Projet

```text
mon_portfolio/
├── app/
│   ├── globals.css         # Tokens de design, typographie, utilitaires, orbes animés
│   ├── layout.tsx          # Root Layout avec ThemeProvider & SEO metadata
│   └── page.tsx            # Assemblage des 6 sections + Navbar & Footer
├── components/
│   ├── layout/
│   │   ├── navbar.tsx      # Navigation fixe avec indicateur actif & menu mobile
│   │   └── footer.tsx      # Pied de page avec réseaux et bouton retour en haut
│   ├── sections/
│   │   ├── hero.tsx        # Écran d'accueil avec motif de données abstrait & CTA
│   │   ├── about.tsx       # Parcours & 4 piliers de compétences analytiques
│   │   ├── projects.tsx    # Projets vedette & grille avec modal de détail interactive
│   │   ├── skills.tsx      # 4 groupes de compétences avec tags interactifs
│   │   ├── education.tsx   # Frise chronologique du parcours académique
│   │   └── contact.tsx     # Cartes de contact directes (Email, LinkedIn, GitHub)
│   └── ui/
│       ├── icons.tsx       # Composants SVG vectoriels pour GitHub & LinkedIn
│       ├── portrait.tsx    # Placeholder géométrique élégant / intégration photo
│       ├── section-heading.tsx # Titres de section réutilisables avec animation
│       └── theme-toggle.tsx    # Bouton de bascule Mode Clair / Sombre
├── data/
│   ├── projects.ts         # Données vérifiées des 4 projets
│   ├── skills.ts           # Compétences classées par domaine
│   └── education.ts        # Données académiques (ISMONTIC, Lycée El Jamaai)
└── public/
    └── images/             # Emplacement pour la photo de profil (portrait.jpg)
```

---

## 🚀 Démarrage Rapide

### Prérequis
- Node.js (v18.18+ recommandé)
- npm

### Installation des dépendances
```bash
npm install
```

### Lancement du serveur de développement
```bash
npm run dev
```
Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### Vérification des types et linting
```bash
npx tsc --noEmit
npm run lint
```

### Build de production & test local
```bash
npm run build
npm run start
```

---

## 📸 Comment Ajouter votre Photo de Profil

Le site intègre un composant de portrait géométrique abstrait qui fonctionne parfaitement sans photo. Pour ajouter votre photo réelle :

1. Déposez votre photo dans le dossier `public/images/` sous le nom `portrait.jpg` (ou `.png` / `.webp`).
2. Ouvrez le fichier `components/ui/portrait.tsx`.
3. Remplacez le bloc placeholder SVG par le composant `Image` de Next.js :
```tsx
import Image from 'next/image';

// Dans le composant Portrait:
<Image
  src="/images/portrait.jpg"
  alt="Alae Ikhlas"
  fill
  className="object-cover"
  priority
/>
```

---

## 📊 Données Vérifiées Intégrées

### Projets Réalisés
1. **MaisonDeLUX** — Plateforme Immobilière & Prédiction des Prix (Projet Vedette)
   - *Next.js, Python, Machine Learning, Talend ETL, Power BI, Supabase*
   - Modélisation en schéma en étoile, mesures DAX, régression prédictive déployée.
   - Lien : [https://maison-delux.com/fr](https://maison-delux.com/fr)
2. **GlutiSafe** — Application d'Assistance Alimentaire IA
   - *Python, OCR, AI Chatbot, Supabase*
   - Extraction de texte des étiquettes d'ingrédients pour intolérance au gluten.
3. **SoftQuiz** — Plateforme d'Évaluation des Compétences
   - *Full-Stack, Web, UI/UX*
   - Évaluation des soft skills avec calcul dynamique des scores.
4. **ITRI IA** — Gestion de Projet & Animation de Communauté
   - *Trello, Branding, Communication, Social Media*
   - Organisation d'ateliers pratiques et gestion des équipes de communication.

### Formation
- **2025 — Présent** : Technicien Spécialisé en Intelligence Artificielle (Option Data Analyst) — *ISMONTIC Tanger*
- **2023 — 2024** : Baccalauréat en Sciences Physiques — *Lycée El Jamaai, Tanger*

### Contact
- **Email** : [ikhlasalae9@gmail.com](mailto:ikhlasalae9@gmail.com)
- **LinkedIn** : [linkedin.com/in/alae-ikhlas](https://www.linkedin.com/in/alae-ikhlas/)
- **GitHub** : [github.com/ikhlasalae9-beep](https://github.com/ikhlasalae9-beep)
- **Localisation** : Tanger, Maroc
