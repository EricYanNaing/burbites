import { apiGet } from "../http";
import { FetchOptions, FetchResult } from "../types/shop";

export async function fetchShops(
    { query, page, limit, signal }: FetchOptions,
) {
    return await apiGet<FetchResult>("/shops", {
        params: { query, page, limit },
        signal,
    });
}
