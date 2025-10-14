export interface TeamMember {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
}

// export interface Project {
//   id: number;
//   title: string;
//   category: 'Piping' | 'Fabrication' | 'Erection' | 'Maintenance';
//   description: string;
//   imageUrl: string;
// }

/**
 * Define the strict union type for project categories.
 * This resolves the TypeScript error in the template by ensuring
 * the categories array and the signal match the setFilter function signature.
 */
type ProjectCategory = 'All' | 'Piping' | 'Fabrication' | 'Erection' | 'Maintenance';

export interface Project {
  id: number;
  title: string;
  category: ProjectCategory;
  description: string;
  imageUrl: string;
}

export interface Service {
  id: number;
  name: string;
  summary: string;
  icon: string; // Tailwind icon class or similar
}

export interface Accolade {
  id: number;
  icon: string; // Tailwind icon class or similar
  title: string;
  count: number;
  suffix: string;
}
