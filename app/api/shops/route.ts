import { getShops } from "@/lib/services/shop";
import { NextResponse } from "next/server";

export async function GET(request : Request){
    try {
        const {searchParams} = new URL(request.url);
        const query = searchParams.get('query');
        const shops = await getShops(query ?? undefined);
        return NextResponse.json(shops);
    } catch (error) {
        console.log(error);
        return NextResponse.json({error : 'Failed to fetch shops'},{status : 500});
    }
}