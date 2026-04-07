import { notFound } from "next/navigation";
import { getShopDetail } from "@/lib/services/shop";
import { CustomBadge } from "@/components/ui/custom-badge";
import { MapPin, Phone, Star } from "lucide-react";
import { getShopMenuListBySection } from "@/lib/services/menu";

type ShopDetailProps = {
    params: Promise<{ id: string }>
}

export default async function ShopDetailPage({ params }: ShopDetailProps) {
    const { id } = await params;

    const shop = await getShopDetail(id);
    const menuList = await getShopMenuListBySection(id);
    console.log(menuList)

    if (!shop) {
        notFound();
    }

    return (
        <main>
            <div className="relative">
                <img src={shop.image} className="w-full h-60 object-cover" />

                {/* Shop Detail Card */}
                <div className="absolute -bottom-50 left-4 right-4 z-10 rounded-[24px] bg-white px-8 py-5 shadow-lg">
                    <div className="flex flex-col gap-2">
                        <CustomBadge className={`tracking-[0.12em] w-fit ${shop.open ? '!bg-cyan-500' : 'bg-red-500'}`} label={shop.open ? "Open Now" : "Closed Now"} />
                        <h1 className="text-2xl font-semibold">{shop.name}</h1>
                        <p>{shop.description}</p>
                        <div className="text-sm flex flex-col gap-2">
                            <div className="flex items-center text-white font-semibold bg-primary w-fit px-2 py-1 rounded-full">
                                ★
                                <p className="ms-1">{shop.rating}</p>
                                <p className="ms-2">({shop.reviewCount} reviews)</p>
                            </div>
                            <div className="flex items-center">
                                <MapPin size={16} className="text-red-500" />
                                <p className="ms-1">{shop.address}</p>
                            </div>
                            <div className="flex items-center">
                                <Phone size={16} className="text-red-500" />
                                <p className="ms-1">{shop.phone}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Menu Section */}
            <div className="mt-60 px-4 pb-10">
                <h2 className="text-xl font-semibold mb-4">Menu</h2>
                {menuList.map((menuSection) => (
                    <div key={menuSection.menuSectionId} className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">{menuSection.menuSectionName}</h3>
                        <div className="grid grid-cols-1 gap-4">
                            {menuSection.menu.map((item) => (
                                <div key={item.id} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <img src={item.image ? item.image : "/bibimbap.png"} className="w-20 h-20 object-cover" />
                                        <div>
                                            <h4 className="font-semibold">{item.name}</h4>
                                            <p className="text-sm text-gray-500">{item.description}</p>
                                        </div>
                                    </div>
                                    <p className="font-semibold">{item.price}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </main>

    )
}    
