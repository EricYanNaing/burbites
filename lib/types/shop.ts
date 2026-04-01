export type Shop = {
  id: string;
  slug: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  distance: number;
  eta: string;
  neighborhood: string;
  open: boolean;
  openTime: string;
  closeTime: string;
  address: string;
  phone: string;
  description: string;
  specialties: string[];
  heroGradient: string;
  mapPosition: {
    x: number;
    y: number;
  };
};