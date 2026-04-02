import { PlatformCategory } from "../types/shop";
import { shops } from "../data/mock-data";

export async function getShops(query?: string, category?: PlatformCategory) {
    const normalizedQuery = query?.trim().toLowerCase() ?? "";
    const normalizedCategory =
        category && category !== "all" ? category : undefined;

    return shops.filter((shop) => {
        const matchesCategory = normalizedCategory
            ? shop.featuredCategorySlugs.includes(normalizedCategory)
            : true;

        if (!matchesCategory) {
            return false;
        }

        if (!normalizedQuery) {
            return true;
        }

        return (
            shop.name.toLowerCase().includes(normalizedQuery) ||
            shop.description.toLowerCase().includes(normalizedQuery) ||
            shop.featuredCategorySlugs.some((specialty) =>
                specialty.toLowerCase().includes(normalizedQuery),
            )
        );
    });
}

export async function getShopDetail(id?:string){
    return shops.find((shop) => shop.id === id);
}