import { getShops } from "@/lib/services/shop";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const query = request.nextUrl.searchParams.get('query');
    const page = Number.parseInt(request.nextUrl.searchParams.get('page') ?? '1');
    const limit = Number.parseInt(request.nextUrl.searchParams.get('limit') ?? '4');
    const shops = await getShops(query ?? undefined);
    const startIndex = (page - 1) * limit;
    const pageItems = shops.slice(startIndex, startIndex + limit);
    const hasMore = startIndex + limit < shops.length;
    return Response.json({ items: pageItems, hasMore, total: shops.length });
}