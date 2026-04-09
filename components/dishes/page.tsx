"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import { CustomInput } from "../ui/custom-input";
import { CustomCard } from "../ui/custom-card";
import { fetchShops } from "@/lib/api/shop";
import { PlatformCategory, Shop } from "@/lib/types/shop";
import InfiniteScroll from "react-infinite-scroll-component";
import { LoadingState } from "@/components/ui/loading-state";
import { EmptyState } from "@/components/ui/empty-state";
import useEmblaCarousel from "embla-carousel-react";
import { platformCategories } from "@/lib/constant";
import { getPlatformCategoryBySlug } from "@/lib/services/category";
import { Check } from "lucide-react";
import { useI18n } from "@/components/i18n/locale-provider";
import type { Messages } from "@/lib/i18n";

const PAGE_SIZE = 4;

function getResultSummary(
    total: number,
    search: string,
    category: PlatformCategory,
    t: Messages["dishes"],
) {
    const selectedCategory = getPlatformCategoryBySlug(category);
    const categoryLabel = selectedCategory?.label ?? platformCategories[0]?.label ?? "";

    if (search.trim() && category !== "all") {
        return t.resultSummarySearchCategory(total, categoryLabel);
    }

    if (search.trim()) {
        return t.resultSummarySearchOnly(total);
    }

    if (category !== "all") {
        return t.resultSummaryCategoryOnly(total, categoryLabel);
    }

    return t.resultSummaryDefault(total);
}

function getSectionDescription(
    search: string,
    category: PlatformCategory,
    t: Messages["dishes"],
) {
    const selectedCategory = getPlatformCategoryBySlug(category);
    const categoryLabel = selectedCategory?.label ?? platformCategories[0]?.label ?? "";

    if (search.trim() && category !== "all") {
        return t.sectionDescriptionSearchCategory(search, categoryLabel);
    }

    if (search.trim()) {
        return t.sectionDescriptionSearchOnly(search);
    }

    if (category !== "all") {
        return t.sectionDescriptionCategoryOnly(categoryLabel);
    }

    return t.sectionDescriptionDefault;
}

function getEmptyDescription(
    search: string,
    category: PlatformCategory,
    t: Messages["dishes"],
) {
    const selectedCategory = getPlatformCategoryBySlug(category);
    const categoryLabel = selectedCategory?.label ?? platformCategories[0]?.label ?? "";

    if (search.trim() && category !== "all") {
        return t.emptyDescriptionSearchCategory(search, categoryLabel);
    }

    if (search.trim()) {
        return t.emptyDescriptionSearchOnly(search);
    }

    if (category !== "all") {
        return t.emptyDescriptionCategoryOnly(categoryLabel);
    }

    return t.emptyDescriptionDefault;
}

export function DishesPage() {
    const { messages } = useI18n();
    const t = messages.dishes;

    const [mounted, setMounted] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [search, setSearch] = useState("");
    const [shops, setShops] = useState<Shop[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [hasFetched, setHasFetched] = useState(false);
    const [total, setTotal] = useState(0);

    const [emblaRef, emblaApi] = useEmblaCarousel({
        dragFree: true,
        align: "start",
        containScroll: "keepSnaps",
    });

    const [selected, setSelected] = useState<PlatformCategory>("all");

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) {
            return;
        }

        const timeoutId = window.setTimeout(() => {
            setSearch((currentSearch) => {
                if (currentSearch === searchInput) {
                    return currentSearch;
                }

                setPage(1);
                setShops([]);
                setHasMore(true);
                setHasFetched(false);

                return searchInput;
            });
        }, 350);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [mounted, searchInput]);

    useEffect(() => {
        if (!mounted) {
            return;
        }

        const controller = new AbortController();

        const loadShops = async () => {
            setLoading(true);

            try {
                const res = await fetchShops({
                    query: search,
                    category: selected,
                    page,
                    limit: PAGE_SIZE,
                    signal: controller.signal,
                });

                setShops((currentShops) =>
                    page === 1 ? res.items : [...currentShops, ...res.items],
                );
                setHasMore(res.hasMore);
                setTotal(res.total);
            } catch (error) {
                if (!controller.signal.aborted) {
                    console.log(error);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                    setHasFetched(true);
                }
            }
        };

        void loadShops();

        return () => {
            controller.abort();
        };
    }, [mounted, page, search, selected]);

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    };

    const handleCategorySelect = (category: PlatformCategory, index: number) => {
        if (selected === category) {
            emblaApi?.scrollTo(index);
            return;
        }

        setSelected(category);
        setPage(1);
        setShops([]);
        setHasMore(true);
        setHasFetched(false);
        emblaApi?.scrollTo(index);
    };

    const selectedCategory = getPlatformCategoryBySlug(selected);

    const loadMore = () => {
        if (!hasMore || loading) {
            return;
        }

        setPage((currentPage) => currentPage + 1);
    };

    return (
        <section className="flex flex-col gap-3">
            {/* Search Bar */}
            <div className="">
                <CustomInput
                    placeholder={t.searchPlaceholder}
                    value={searchInput}
                    onChange={handleSearchChange}
                />
            </div>

            {/* Categories */}
            <div className="relative space-y-3">
                <div className="flex items-center justify-between gap-3">
                    <div className="space-y-1">
                        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-primary/70">
                            {t.browseByCategory}
                        </p>
                        <p className="text-sm text-secondary/65">
                            {selected === "all"
                                ? t.browseHintAll
                                : t.browseHintFocused(
                                    selectedCategory?.label ?? platformCategories[0]?.label ?? "",
                                )}
                        </p>
                    </div>

                    {selected !== "all" ? (
                        <button
                            type="button"
                            onClick={() => handleCategorySelect("all", 0)}
                            className="shrink-0 rounded-full border border-primary/15 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary transition hover:border-primary/35 hover:bg-primary/5"
                        >
                            {t.clear}
                        </button>
                    ) : null}
                </div>

                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex gap-3 py-1">
                        {platformCategories.map((cat, index) => {
                            const isSelected = selected === cat.slug;

                            return (
                                <button
                                    key={cat.slug}
                                    type="button"
                                    onClick={() => handleCategorySelect(cat.slug, index)}
                                    aria-pressed={isSelected}
                                    className={`cursor-pointer group relative min-w-[118px] shrink-0 overflow-hidden rounded-[26px] border px-3 pb-3 pt-4 text-left transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 ${isSelected
                                        ? "border-primary/35 bg-white shadow-[0_16px_40px_rgba(227,24,55,0.16)]"
                                        : "border-black/6 bg-[#fff8f6] hover:-translate-y-0.5 hover:border-primary/15 hover:bg-white hover:shadow-[0_12px_30px_rgba(42,19,13,0.08)]"
                                        }`}
                                >
                                    <div
                                        className={`absolute inset-x-0 top-0 h-16 transition-opacity ${isSelected ? "opacity-100" : "opacity-70 group-hover:opacity-90"}`}
                                        style={{
                                            background:
                                                "linear-gradient(180deg, rgba(227,24,55,0.16) 0%, rgba(227,24,55,0.03) 70%, transparent 100%)",
                                        }}
                                    />

                                    <div className="relative flex items-start justify-between gap-3">
                                        <div className="h-14 w-14 overflow-hidden rounded-2xl ring-1 ring-black/5">
                                            <img
                                                src={cat.image}
                                                alt={cat.label}
                                                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                            />
                                        </div>

                                        <span
                                            className={`inline-flex h-7 w-7 items-center justify-center rounded-full border transition ${isSelected
                                                ? "border-primary/15 bg-primary text-white"
                                                : "border-black/8 bg-white text-transparent group-hover:text-primary/55"
                                                }`}
                                            aria-hidden="true"
                                        >
                                            <Check className="h-3.5 w-3.5" />
                                        </span>
                                    </div>

                                    <div className="relative mt-4 space-y-1">
                                        <p
                                            className={`text-sm font-semibold transition ${isSelected ? "text-primary" : "text-secondary"}`}
                                        >
                                            {cat.label}
                                        </p>
                                        <p className="line-clamp-2 text-xs leading-5 text-secondary/58">
                                            {cat.description}
                                        </p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-8 bg-gradient-to-r from-[#f7efe8] to-transparent md:block" />
                <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-8 bg-gradient-to-l from-[#f7efe8] to-transparent md:block" />
            </div>

            {/* Dish List  */}
            <div className="space-y-4">
                <div className="flex items-end justify-between gap-3">
                    <div className="space-y-1">
                        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-primary/70">
                            {t.nearbyKitchens}
                        </p>
                        <h2 className="text-[1.7rem] font-black leading-none text-secondary">
                            {t.nearbyKitchensTitle}
                        </h2>
                    </div>

                    {mounted && hasFetched ? (
                        <span className="rounded-full border border-primary/10 bg-primary/6 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                            {getResultSummary(total, search, selected, t)}
                        </span>
                    ) : null}
                </div>

                <p className="max-w-[22rem] text-sm leading-6 text-secondary/65">
                    {getSectionDescription(search, selected, t)}
                </p>

                {!mounted || (!hasFetched && shops.length === 0) ? (
                    <LoadingState
                        label={
                            selected === "all"
                                ? t.findingNearbyKitchens
                                : t.findingCategoryKitchens(
                                    selectedCategory?.label ?? platformCategories[0]?.label ?? "",
                                )
                        }
                    />
                ) : null}
                {mounted && hasFetched && !loading && shops.length === 0 ? (
                    <EmptyState
                        title={t.emptyTitle}
                        description={getEmptyDescription(search, selected, t)}
                    />
                ) : null}
                {mounted && shops.length > 0 ? (
                    <InfiniteScroll
                        dataLength={shops.length}
                        next={loadMore}
                        hasMore={hasMore}
                        scrollThreshold="160px"
                        loader={
                            loading && shops.length > 0 ? (
                                <LoadingState
                                    variant="inline"
                                    label={t.loadingMoreKitchens}
                                />
                            ) : null
                        }
                        endMessage={
                            <p className="py-4 text-center text-sm font-medium text-secondary/55">
                                {t.endOfPicks}
                            </p>
                        }
                    >
                        {shops.map((shop) => (
                            <div key={shop.id}>
                                <CustomCard
                                    id={shop.id}
                                    className="mb-4"
                                    slug={shop.slug}
                                    title={shop.name}
                                    description={shop.description}
                                    image={shop.image}
                                    rating={shop.rating}
                                    reviewCount={shop.reviewCount}
                                    distance={shop.distance}
                                    eta={shop.eta}
                                    neighborhood={shop.neighborhood}
                                    open={shop.open}
                                    openTime={shop.openTime}
                                    closeTime={shop.closeTime}
                                    address={shop.address}
                                    specialties={shop.featuredCategorySlugs}
                                    heroGradient={shop.heroGradient}
                                />
                            </div>
                        ))}
                    </InfiniteScroll>
                ) : null}
            </div>
        </section>
    );
}
