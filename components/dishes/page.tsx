"use client";

import { useEffect, useState } from "react";
import { CustomInput } from "../ui/custom-input";
import { CustomCard } from "../ui/custom-card";
import { fetchShops } from "@/lib/api/shop";
import { Shop } from "@/lib/types/shop";
import AnimatedList from "../animations/list-animation";

export function DishesPage() {
    const [search, setSearch] = useState("");
    const [shops, setShops] = useState<Shop[]>([]);

    useEffect(() => {
        fetchShops(search).then((res) => setShops(res));
    }, [search])
    return (
        <section className="flex flex-col gap-3">
            {/* Search Bar */}
            <div className="">
                <CustomInput
                    placeholder="Search dishes, cuisines..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Dish List  */}
            <div className="">
                <p className="text-sm font-medium font-display text-primary">Discover our delicious dishes</p>
                {shops.map((shop) => (
                    <CustomCard
                        key={shop.id}
                        title={shop.name}
                        description={shop.description}
                        image={shop.image}
                    />
                ))}
            </div>
        </section>
    );
}