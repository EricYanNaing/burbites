"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import { CustomInput } from "../ui/custom-input";
import { CustomCard } from "../ui/custom-card";
import { fetchShops } from "@/lib/api/shop";
import { Shop } from "@/lib/types/shop";
import InfiniteScroll from "react-infinite-scroll-component";
import { LoadingState } from "@/components/ui/loading-state";
import { EmptyState } from "@/components/ui/empty-state";

const PAGE_SIZE = 4;

export function DishesPage() {
    const [mounted, setMounted] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [search, setSearch] = useState("");
    const [shops, setShops] = useState<Shop[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [hasFetched, setHasFetched] = useState(false);
    const [total, setTotal] = useState(0);

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
    }, [mounted, page, search]);

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    };

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
                    placeholder="Search dishes, cuisines..."
                    value={searchInput}
                    onChange={handleSearchChange}
                />
            </div>

            {/* Dish List  */}
            <div className="space-y-4">
                <div className="flex items-end justify-between gap-3">
                    <div className="space-y-1">
                        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-primary/70">
                            Nearby kitchens
                        </p>
                        <h2 className="text-[1.7rem] font-black leading-none text-secondary">
                            Burmese spots worth the trip
                        </h2>
                    </div>

                    {mounted && hasFetched ? (
                        <span className="rounded-full border border-primary/10 bg-primary/6 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                            {search.trim() ? `${total} matches` : `${total} open picks`}
                        </span>
                    ) : null}
                </div>

                <p className="max-w-[22rem] text-sm leading-6 text-secondary/65">
                    {search.trim()
                        ? `Showing the best Burmese kitchens for "${search}".`
                        : "Strong broths, tea-house classics, and fast pickup spots near you."}
                </p>

                {!mounted || (!hasFetched && shops.length === 0) ? (
                    <LoadingState label="Finding nearby kitchens" />
                ) : null}
                {mounted && hasFetched && !loading && shops.length === 0 && search.trim() ? (
                    <EmptyState
                        description={
                            `No kitchens matched "${search}". Try a different dish, neighborhood, or cuisine.`
                        }
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
                                    label="Loading more kitchens"
                                />
                            ) : null
                        }
                        endMessage={
                            <p className="py-4 text-center text-sm font-medium text-secondary/55">
                                You have reached the end of today&apos;s nearby picks.
                            </p>
                        }
                    >
                        {shops.map((shop) => (
                            <CustomCard
                                key={shop.id}
                                className="mb-4"
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
                                specialties={shop.specialties}
                                heroGradient={shop.heroGradient}
                            />
                        ))}
                    </InfiniteScroll>
                ) : null}
            </div>
        </section>
    );
}
