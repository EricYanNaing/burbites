import { notFound } from "next/navigation";
import { getShopDetail } from "@/lib/services/shop";

type ShopDetailProps = {
    params: Promise<{ id: string }>
}

export default async function ShopDetailPage({ params }: ShopDetailProps) {
    const { id } = await params;

    const shop = await getShopDetail(id);

    if (!shop) {
        notFound();
    }

    return (
        <main>
            <h1>{shop.name}</h1>
        </main>
    )
}    
