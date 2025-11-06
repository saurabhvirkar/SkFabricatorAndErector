type ProjectCategory = 'All' | 'Piping' | 'Fabrication' | 'Erection' | 'Maintenance';

export interface Project {
  id: number;
  title: string;
  category: ProjectCategory;
  description: string;
  image: string;
}
