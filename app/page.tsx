"use client";

import { Reveal } from "@/components/animations/reveal";
import { DishesPage } from "@/components/dishes/page";
import { CustomBadge } from "@/components/ui/custom-badge";

export default function Home() {
  return (
    <div className="w-full p-5 flex flex-col gap-8">
      {/* Featured Cards */}
      <Reveal delay={0.1}>
        <div
          style={{
            backgroundImage: `
            radial-gradient(circle at 78% 16%, rgba(255, 148, 171, 0.18), transparent 28%),
            radial-gradient(circle at 18% 88%, rgba(255, 80, 122, 0.24), transparent 34%),
            linear-gradient(180deg, rgba(35, 0, 8, 0.88) 0%, rgba(96, 0, 22, 0.64) 42%, rgba(184, 0, 37, 0.72) 100%),
            url('/featured-1.jpg')
          `,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="h-60 w-full overflow-hidden rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
        >
          <div className="flex h-full w-full flex-col items-start justify-end gap-1 p-5">
            <CustomBadge
              label="Today's Special"
              className="font-bold uppercase tracking-[0.12em]"
            />
            <h1 className="text-4xl font-bold text-white">Featured Shop</h1>
            <p className="max-w-52 text-white/92">Burmese food for everyone</p>
          </div>
        </div>
      </Reveal>

      {/* Dish List */}
      <Reveal delay={0.2}>
        <DishesPage />
      </Reveal>
    </div>
  );
}
