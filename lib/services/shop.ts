import { shops } from "../data/mock-data";

export async function getShops(query? : string){
    if (!query) {
        return shops;
    }

    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
        return shops;
    }

    return shops.filter((shop) => {
        return (
            shop.name.toLowerCase().includes(normalizedQuery) ||
            shop.description.toLowerCase().includes(normalizedQuery) ||
            shop.specialties.some((specialty) =>
                specialty.toLowerCase().includes(normalizedQuery),
            )
        );
    });
}
