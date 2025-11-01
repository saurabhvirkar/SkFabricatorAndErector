export interface TeamMember {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
}

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
  icon: string; 
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };  
}

export interface Accolade {
  id: number;
  icon: string; // Tailwind icon class or similar
  title: string;
  count: number;
  suffix: string;
}

export interface ClientDetails {
  id: number;
  name: string;
  imageUrl: string;
}

export type ImageCategory = 'All' | 'Piping' | 'Fabrication' | 'Erection' | 'Maintenance';

export interface GalleryImage {
  id: number;
  url: string;
  isMain: boolean;
  publicId: string;
  category: ImageCategory;
}
