import { X } from "lucide-react";

type CustomModalProps = {
    children: React.ReactNode;
    open: boolean;
    onClose: () => void;
    isCloseButton?: boolean;
    className?: string;
}

export default function CustomModal({ children, open, onClose, isCloseButton, className }: CustomModalProps) {
    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-[100]">
            <button
                type="button"
                aria-label="Close modal"
                onClick={onClose}
                className="absolute inset-0 h-full w-full bg-black/50"
            />
            <div className="relative z-[101] flex min-h-full items-center justify-center p-4">
                <div
                    role="dialog"
                    aria-modal="true"
                    className={`relative w-full rounded-xl bg-white p-4 shadow-xl ${className ?? "max-w-md"}`}
                >
                    {children}
                    {isCloseButton ? (
                        <button
                            type="button"
                            onClick={onClose}
                            className="absolute right-3 top-3 text-secondary/60 hover:text-secondary"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
