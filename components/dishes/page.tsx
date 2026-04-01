"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import { CustomInput } from "../ui/custom-input";
import { CustomCard } from "../ui/custom-card";
import { fetchShops } from "@/lib/api/shop";
import { Shop } from "@/lib/types/shop";
import InfiniteScroll from "react-infinite-scroll-component";
import { LoadingState } from "@/components/ui/loading-state";
import { EmptyState } from "@/components/ui/empty-state";
import { Reveal } from "../animations/reveal";

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
            <div className="">
                <p className="text-sm font-medium font-display text-primary">Discover our delicious dishes</p>
                {!mounted || (!hasFetched && shops.length === 0) ? (
                    <LoadingState label="Finding dishes near you" />
                ) : null}
                {mounted && hasFetched && !loading && shops.length === 0 && search.trim() ? (
                    <EmptyState
                        description={
                            `No dishes matched "${search}". Try a different name or cuisine.`
                        }
                    />
                ) : null}
                {mounted && shops.length > 0 ? (
                    <InfiniteScroll
                        dataLength={shops.length}
                        next={loadMore}
                        hasMore={hasMore}
                        loader={
                            loading && shops.length > 0 ? (
                                <LoadingState
                                    variant="inline"
                                    label="Loading more dishes"
                                />
                            ) : null
                        }
                    >
                        {shops.map((shop) => (
                            <Reveal key={shop.id}>
                                <CustomCard
                                    title={shop.name}
                                    description={shop.description}
                                    image={shop.image}
                                />
                            </Reveal>
                        ))}
                    </InfiniteScroll>
                ) : null}
            </div>
        </section>
    );
}
