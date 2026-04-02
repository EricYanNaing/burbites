import { getShopDetail } from "@/lib/services/shop";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _request: NextRequest,
    context: RouteContext<"/api/shops/[id]">,
) {
    const { id } = await context.params;
    const shop = await getShopDetail(id);
    return NextResponse.json(shop);
}
