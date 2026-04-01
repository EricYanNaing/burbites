import { apiGet } from "../http";
import { Shop } from "../types/shop";

export async function fetchShops(query? : string){
    return await apiGet<Shop[]>('/shops',{params : {query}}).then((res) => res.filter((shop) => shop.name.toLowerCase().includes(query?.toLowerCase() ?? '')))
}