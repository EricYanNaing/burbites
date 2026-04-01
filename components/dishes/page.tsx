"use client";

import { useState } from "react";
import { CustomInput } from "../ui/custom-input";
import { CustomCard } from "../ui/custom-card";

export function DishesPage() {
    const [search, setSearch] = useState("");


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
                <CustomCard
                    title="Mohinga"
                    description="A flavorful Burmese fish noodle soup"
                    image="/mohinga.jpg"
                />
            </div>
        </section>
    );
}