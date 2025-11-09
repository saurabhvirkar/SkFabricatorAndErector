export interface Photo {
    id: number;
    url: string;
    isMain: boolean;
    publicId: string;
    category: string;
    isAboutSlider: boolean;
    width?: number;
    height?: number;
}