export type ImageCategory = 'All' | 'Piping' | 'Fabrication' | 'Erection' | 'Maintenance';

export interface GalleryImage {
  id: number;
  url: string;
  isMain: boolean;
  publicId: string;
  category: ImageCategory;
  isAboutSlider: boolean;
}
