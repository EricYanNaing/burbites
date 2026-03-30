import CardAnimation from "../animations/card-animation";

type CustomCardProps = {
    title: string;
    description: string;
    className?: string;
    image?: string;
};

export function CustomCard({ title, description, className, image }: CustomCardProps) {
    return (
        <CardAnimation>
            <div className={`overflow-hidden rounded-lg bg-white shadow-lg ${className ?? ""}`}>
                {image && (
                    <img
                        src={image}
                        alt={title}
                        className="h-48 w-full bg-white object-contain"
                    />
                )}
                <div className="p-4">
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <p className="text-gray-600">{description}</p>
                </div>
            </div>
        </CardAnimation>
    );
}
