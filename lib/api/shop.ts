import { apiGet } from "../http";
import { FetchOptions, FetchResult } from "../types/shop";

export async function fetchShops(
    { query, category, page, limit, signal }: FetchOptions,
) {
    return await apiGet<FetchResult>("/shops", {
        params: { query, category, page, limit },
        signal,
    });
}
