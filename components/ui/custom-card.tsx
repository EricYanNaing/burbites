import Link from "next/link";
import CardAnimation from "../animations/card-animation";

type CustomCardProps = {
    id: string,
    title: string;
    description: string;
    className?: string;
    image?: string;
    rating: number;
    slug: string;
    reviewCount: number;
    distance: number;
    eta: string;
    neighborhood: string;
    open: boolean;
    openTime: string;
    closeTime: string;
    address: string;
    specialties: string[];
    heroGradient: string;
};

function formatSpecialty(specialty: string) {
    return specialty
        .split(" ")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
}

function StatPill({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="rounded-2xl border border-black/6 bg-[#fff7f5] px-3 py-2">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-secondary/45">
                {label}
            </p>
            <p className="mt-1 text-sm font-semibold text-secondary">{value}</p>
        </div>
    );
}

export function CustomCard({
    id,
    title,
    description,
    className,
    image,
    rating,
    reviewCount,
    distance,
    eta,
    neighborhood,
    slug,
    open,
    openTime,
    closeTime,
    address,
    specialties,
    heroGradient,
}: CustomCardProps) {
    return (
        <Link href={`/shops/${id}`} key={id}>
            <CardAnimation>
                <article
                    className={`cursor-pointer group overflow-hidden rounded-[28px] border border-black/6 bg-white shadow-[0_22px_50px_rgba(85,20,31,0.12)] transition-transform duration-300 hover:-translate-y-1 ${className ?? ""}`}
                >
                    <div className="relative h-56 overflow-hidden">
                        {image ? (
                            <img
                                src={image}
                                alt={title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            />
                        ) : null}

                        {/* Image Filter */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/10" />

                        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                            <span
                                className={`rounded-full px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.16em] ${open
                                    ? "bg-[#d6f8de] text-[#0f6a2f]"
                                    : "bg-[#ffe0e4] text-[#b41f3f]"
                                    }`}
                            >
                                {open ? "Open now" : "Closed"}
                            </span>
                            <span className="rounded-full bg-white/16 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                                {neighborhood}
                            </span>
                        </div>

                        <div className="absolute right-4 top-4 rounded-full bg-white/92 px-3 py-1.5 text-sm font-semibold text-secondary shadow-sm">
                            {rating.toFixed(1)} <span className="text-yellow-500">★</span>
                        </div>

                        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 text-white">
                            <div className="min-w-0">
                                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/70">
                                    Burmese kitchen
                                </p>
                                <h2 className="mt-1 text-[1.65rem] font-black leading-none">
                                    {title}
                                </h2>
                            </div>

                            <div className="shrink-0 rounded-2xl bg-white/16 px-3 py-2 text-right backdrop-blur-sm">
                                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-white/70">
                                    ETA
                                </p>
                                <p className="text-sm font-bold text-white">{eta}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-5 p-5">
                        <p className="text-[0.95rem] leading-6 text-secondary/72">
                            {description}
                        </p>

                        <div className="grid grid-cols-3 gap-2">
                            <StatPill
                                label="Distance"
                                value={`${distance.toFixed(1)} km`}
                            />
                            <StatPill label="Reviews" value={`${reviewCount}`} />
                            <StatPill
                                label="Status"
                                value={open ? `Til ${closeTime}` : `At ${openTime}`}
                            />
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {specialties.slice(0, 3).map((specialty) => (
                                <span
                                    key={specialty}
                                    className="rounded-full border border-primary/10 bg-primary/6 px-3 py-1.5 text-xs font-semibold tracking-[0.03em] text-primary"
                                >
                                    {formatSpecialty(specialty)}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-start justify-between gap-4 border-t border-black/6 pt-4">
                            <div>
                                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-secondary/45">
                                    Pickup window
                                </p>
                                <p className="mt-1 text-sm font-semibold text-secondary">
                                    {open
                                        ? `Open now • closes ${closeTime}`
                                        : `Closed • opens ${openTime}`}
                                </p>
                            </div>

                            <p className="max-w-[13rem] text-right text-xs leading-5 text-secondary/60">
                                {address}
                            </p>
                        </div>
                    </div>
                </article>
            </CardAnimation></Link>
    );
}
