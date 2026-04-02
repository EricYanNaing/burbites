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
  cuisine: "burmese";
  featuredCategorySlugs: PlatformCategory[];
  heroGradient: string;
  mapPosition: { x: number; y: number };
};

export type FetchOptions = {
  query?: string;
  category?: PlatformCategory;
  page: number;
  limit: number;
  signal?: AbortSignal;
}

export type FetchResult = {
  items: Shop[];
  hasMore: boolean;
  total: number;
}

export type PlatformCategory =
  | "all"
  | "mohinga"
  | "noodles"
  | "rice"
  | "salads"
  | "curries"
  | "snacks"
  | "desserts"
  | "drinks";

export type MenuTag =
  | "popular"
  | "spicy"
  | "vegetarian"
  | "breakfast"
  | "new"
  | "chef-special";

export type PlatformCategoryItem = {
  slug: PlatformCategory;
  label: string;
  description?: string;
  icon?: string;
  sortOrder: number;
  image?: string;
};

export type MenuSection = {
  id: string;
  shopId: string;
  name: string;
  sortOrder: number;
};

export type MenuItem = {
  id: string;
  shopId: string;
  sectionId: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  price: number;
  available: boolean;
  categorySlug: PlatformCategory;
  tags?: MenuTag[];
};
