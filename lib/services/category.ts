import { platformCategories } from "../constant";
import { PlatformCategory, PlatformCategoryItem } from "../types/shop";

export function getPlatformCategoryBySlug(
  slug: PlatformCategory,
): PlatformCategoryItem | undefined {
  return platformCategories.find((category) => category.slug === slug);
}

export function parsePlatformCategory(
  value?: string | null,
): PlatformCategory | undefined {
  if (!value) {
    return undefined;
  }

  return platformCategories.some((category) => category.slug === value)
    ? (value as PlatformCategory)
    : undefined;
}
