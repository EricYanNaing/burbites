import { notFound } from "next/navigation";
import { getShopDetail } from "@/lib/services/shop";
import { CustomBadge } from "@/components/ui/custom-badge";
import { ArrowUpRight, Clock3, MapPin, MoveLeft, Phone, Star } from "lucide-react";
import { getShopMenuListBySection } from "@/lib/services/menu";
import { getPlatformCategoryBySlug } from "@/lib/services/category";
import { MenuItem, MenuTag } from "@/lib/types/shop";
import Link from "next/link";

const priceFormatter = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
});

const menuTagStyles: Record<MenuTag, string> = {
    popular: "bg-[#ffe7d9] text-[#a64a22]",
    spicy: "bg-[#ffe0e4] text-[#b11f43]",
    vegetarian: "bg-[#e4f7e8] text-[#207241]",
    breakfast: "bg-[#fff4d7] text-[#946214]",
    new: "bg-[#e8f0ff] text-[#2f5fb5]",
    "chef-special": "bg-[#ece7ff] text-[#5d34b0]",
};

function formatPrice(price: number) {
    return `฿${priceFormatter.format(price)}`;
}

function formatMenuTag(tag: MenuTag) {
    return tag
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
}

function getSectionPreview(items: MenuItem[]) {
    if (!items.length) {
        return "Fresh picks from the kitchen";
    }

    const names = items.slice(0, 2).map((item) => item.name);
    const preview = names.join(" • ");
    const remaining = items.length - names.length;

    return remaining > 0 ? `${preview} +${remaining} more` : preview;
}

type ShopDetailProps = {
    params: Promise<{ id: string }>
}

export default async function ShopDetailPage({ params }: ShopDetailProps) {
    const { id } = await params;

    const shop = await getShopDetail(id);
    const menuList = await getShopMenuListBySection(id);

    if (!shop || !menuList) {
        notFound();
    }

    const totalItems = menuList.reduce(
        (count, section) => count + section.menu.length,
        0,
    );
    const featuredSection = menuList[0]?.menuSectionName ?? "House picks";

    return (
        <main className="pb-16">
            <div>
                <div className="relative">
                    <img
                        src={shop.image}
                        alt={shop.name}
                        className="h-80 w-full object-cover sm:h-[24rem]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#160a08]/90 via-[#160a08]/28 to-transparent" />
                </div>

                {/* Shop Detail Card */}
                <div className="relative z-10 -mt-16 px-4 sm:-mt-20 sm:px-6">
                    <div className="rounded-[28px] border border-white/30 bg-white/95 px-5 py-5 shadow-[0_28px_60px_rgba(49,18,20,0.18)] backdrop-blur-sm sm:px-8 sm:py-6">
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <div className="space-y-3">
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <div>
                                            <CustomBadge
                                                className={`w-fit tracking-[0.14em] ${shop.open ? "!bg-[#0d9488]" : "!bg-[#e11d48]"}`}
                                                label={shop.open ? "Open Now" : "Closed Now"}
                                            />
                                            <span className="rounded-full bg-secondary/6 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-secondary/75">
                                                {shop.neighborhood}
                                            </span>
                                        </div>
                                        <Link href={`/`} className="flex items-center gap-2 text-secondary/72 text-sm rounded-full bg-secondary/6 px-3 py-1">
                                            <MoveLeft />
                                            Back to home
                                        </Link>
                                    </div>

                                    <div>
                                        <h1 className="text-2xl font-black text-secondary sm:text-3xl">
                                            {shop.name}
                                        </h1>
                                        <p className="mt-2 max-w-2xl text-sm leading-6 text-secondary/72 sm:text-[0.95rem]">
                                            {shop.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="rounded-[22px] bg-secondary px-4 py-3 text-white shadow-lg">
                                    <p className="text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-white/70">
                                        Guest rating
                                    </p>
                                    <div className="mt-2 flex items-center gap-2 text-lg font-bold">
                                        <Star size={18} className="fill-current" />
                                        <span>{shop.rating.toFixed(1)}</span>
                                        <span className="text-sm font-medium text-white/72">
                                            ({shop.reviewCount})
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-3 text-sm text-secondary/78 sm:grid-cols-3">
                                <div className="rounded-2xl border border-black/6 bg-[#fff8f5] px-4 py-3">
                                    <p className="text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-secondary/45">
                                        Service window
                                    </p>
                                    <div className="mt-2 flex items-center gap-2 font-semibold text-secondary">
                                        <Clock3 size={16} className="text-primary" />
                                        <p>
                                            {shop.open
                                                ? `${shop.openTime} - ${shop.closeTime}`
                                                : `Opens ${shop.openTime}`}
                                        </p>
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-black/6 bg-[#fff8f5] px-4 py-3">
                                    <p className="text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-secondary/45">
                                        Address
                                    </p>
                                    <div className="mt-2 flex items-start gap-2 font-semibold text-secondary">
                                        <MapPin size={16} className="mt-0.5 shrink-0 text-primary" />
                                        <p>{shop.address}</p>
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-black/6 bg-[#fff8f5] px-4 py-3">
                                    <p className="text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-secondary/45">
                                        Contact
                                    </p>
                                    <div className="mt-2 flex items-center gap-2 font-semibold text-secondary">
                                        <Phone size={16} className="shrink-0 text-primary" />
                                        <p>{shop.phone}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Menu Section */}
            <div className="mt-8 px-4 pb-10 sm:mt-10 sm:px-6">
                <section className="rounded-[32px] border border-black/6 bg-[linear-gradient(180deg,#fffaf7_0%,#fff4ef_100%)] p-4 shadow-[0_22px_50px_rgba(85,20,31,0.08)] sm:p-6">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-2xl">
                            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-primary/70">
                                Today&apos;s menu
                            </p>
                            <h2 className="mt-2 text-2xl font-black text-secondary sm:text-[2rem]">
                                Built for faster scanning and easier deciding
                            </h2>
                            <p className="mt-3 text-sm leading-6 text-secondary/70 sm:text-[0.95rem]">
                                Jump between sections, compare dishes side by side, and see price, category,
                                and standout tags without digging through a long plain list.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                            <div className="rounded-[22px] border border-black/6 bg-white px-4 py-3 shadow-sm">
                                <p className="text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-secondary/45">
                                    Sections
                                </p>
                                <p className="mt-2 text-xl font-black text-secondary">
                                    {menuList.length}
                                </p>
                            </div>

                            <div className="rounded-[22px] border border-black/6 bg-white px-4 py-3 shadow-sm">
                                <p className="text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-secondary/45">
                                    Dishes
                                </p>
                                <p className="mt-2 text-xl font-black text-secondary">
                                    {totalItems}
                                </p>
                            </div>

                            <div className="rounded-[22px] border border-black/6 bg-white px-4 py-3 shadow-sm">
                                <p className="text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-secondary/45">
                                    Highlight
                                </p>
                                <p className="mt-2 text-sm font-bold text-secondary">
                                    {featuredSection}
                                </p>
                            </div>

                            <div className="rounded-[22px] border border-black/6 bg-white px-4 py-3 shadow-sm">
                                <p className="text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-secondary/45">
                                    ETA
                                </p>
                                <p className="mt-2 text-sm font-bold text-secondary">
                                    {shop.eta}
                                </p>
                            </div>
                        </div>
                    </div>

                    {menuList.length ? (
                        <div className="mt-6 rounded-[28px] border border-black/6 bg-white/72 p-3 shadow-[0_14px_30px_rgba(42,19,13,0.06)] backdrop-blur-sm sm:p-4">
                            <div className="flex flex-col gap-3 border-b border-black/6 pb-4 sm:flex-row sm:items-end sm:justify-between">
                                <div>
                                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary/70">
                                        Browse sections
                                    </p>
                                    <p className="mt-2 text-sm leading-6 text-secondary/65">
                                        Jump straight to the lane you want instead of scanning one long list.
                                    </p>
                                </div>

                                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#fff6f2] px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-secondary/60">
                                    <span className="h-2 w-2 rounded-full bg-primary" />
                                    {menuList.length} menu sections
                                </div>
                            </div>

                            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                                {menuList.map((menuSection, index) => (
                                    <a
                                        key={menuSection.menuSectionId}
                                        href={`#section-${menuSection.menuSectionId}`}
                                        className="group rounded-[24px] border border-black/6 bg-[linear-gradient(180deg,#ffffff_0%,#fff8f4_100%)] p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/18 hover:shadow-[0_18px_34px_rgba(85,20,31,0.12)]"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary text-sm font-black text-white shadow-sm">
                                                {String(index + 1).padStart(2, "0")}
                                            </span>
                                            <span className="rounded-full bg-primary/8 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-primary">
                                                {menuSection.menu.length} dishes
                                            </span>
                                        </div>

                                        <p className="mt-4 text-lg font-black text-secondary">
                                            {menuSection.menuSectionName}
                                        </p>
                                        <p className="mt-2 text-sm leading-6 text-secondary/62">
                                            {getSectionPreview(menuSection.menu)}
                                        </p>

                                        <div className="mt-4 flex items-center justify-between border-t border-black/6 pt-3">
                                            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-secondary/45">
                                                Jump to section
                                            </span>
                                            <ArrowUpRight
                                                size={16}
                                                className="text-primary transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                            />
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    ) : null}

                    <div className="mt-6 space-y-6">
                        {menuList.map((menuSection, index) => (
                            <section
                                key={menuSection.menuSectionId}
                                id={`section-${menuSection.menuSectionId}`}
                                className="scroll-mt-24 rounded-[28px] border border-black/6 bg-white/92 p-4 shadow-[0_18px_40px_rgba(85,20,31,0.08)] sm:p-5"
                            >
                                <div className="flex flex-col gap-3 border-b border-black/6 pb-4 sm:flex-row sm:items-end sm:justify-between">
                                    <div>
                                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary/70">
                                            Section {String(index + 1).padStart(2, "0")}
                                        </p>
                                        <h3 className="mt-2 text-xl font-black text-secondary sm:text-2xl">
                                            {menuSection.menuSectionName}
                                        </h3>
                                        <p className="mt-2 text-sm text-secondary/65">
                                            {menuSection.menu.length} dishes in this lane
                                        </p>
                                    </div>

                                    <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#fff6f2] px-3 py-2 text-sm font-semibold text-secondary">
                                        <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                                        Freshly prepared for pickup
                                    </div>
                                </div>

                                <div className="mt-5 grid gap-4 xl:grid-cols-2">
                                    {menuSection.menu.map((item) => {
                                        const category = getPlatformCategoryBySlug(item.categorySlug);

                                        return (
                                            <article
                                                key={item.id}
                                                className="group overflow-hidden rounded-[26px] border border-black/6 bg-[#fffaf8] shadow-[0_14px_30px_rgba(42,19,13,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(42,19,13,0.12)]"
                                            >
                                                <div className="relative">
                                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(227,24,55,0.08),transparent_42%)]" />

                                                    <div className="relative flex flex-col gap-4 p-4 sm:flex-row">
                                                        <img
                                                            src={item.image ?? "/bibimbap.png"}
                                                            alt={item.name}
                                                            className="h-36 w-full rounded-[22px] object-cover ring-1 ring-black/5 sm:h-28 sm:w-28 sm:shrink-0"
                                                        />

                                                        <div className="min-w-0 flex-1">
                                                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                                                <div className="min-w-0">
                                                                    <div className="flex flex-wrap gap-2">
                                                                        {category ? (
                                                                            <span className="rounded-full bg-primary/8 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-primary">
                                                                                {category.label}
                                                                            </span>
                                                                        ) : null}

                                                                        {item.tags?.slice(0, 2).map((tag) => (
                                                                            <span
                                                                                key={tag}
                                                                                className={`rounded-full px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] ${menuTagStyles[tag]}`}
                                                                            >
                                                                                {formatMenuTag(tag)}
                                                                            </span>
                                                                        ))}
                                                                    </div>

                                                                    <h4 className="mt-3 text-lg font-black text-secondary">
                                                                        {item.name}
                                                                    </h4>
                                                                    <p className="mt-2 text-sm leading-6 text-secondary/68">
                                                                        {item.description ?? "Prepared fresh with the kitchen's signature Burmese flavors."}
                                                                    </p>
                                                                </div>

                                                                <div className="shrink-0 rounded-[22px] bg-secondary px-4 py-3 text-white shadow-sm">
                                                                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/70">
                                                                        Price
                                                                    </p>
                                                                    <p className="mt-1 text-xl font-black">
                                                                        {formatPrice(item.price)}
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            <div className="mt-4 flex flex-col gap-3 border-t border-black/6 pt-3 sm:flex-row sm:items-center sm:justify-between">
                                                                <div
                                                                    className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] ${item.available
                                                                        ? "bg-[#e4f7e8] text-[#207241]"
                                                                        : "bg-[#ffe0e4] text-[#b11f43]"
                                                                        }`}
                                                                >
                                                                    <span className="h-2 w-2 rounded-full bg-current" />
                                                                    {item.available ? "Available today" : "Unavailable"}
                                                                </div>

                                                                <p className="text-xs font-medium text-secondary/52">
                                                                    {category?.description ?? "Fresh from the kitchen"}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </article>
                                        );
                                    })}
                                </div>
                            </section>
                        ))}
                    </div>
                </section>
            </div>
        </main>

    )
}
