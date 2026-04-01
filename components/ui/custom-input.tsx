"use client";

import { useState, useRef } from "react";

type CustomInputProps = {
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function CustomInput({ placeholder = "Search dishes...", value, onChange }: CustomInputProps) {
    const [focused, setFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClear = () => {
        onChange({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
        inputRef.current?.focus();
    };

    return (
        <div
            className="relative w-full"
            style={{
                filter: focused
                    ? "drop-shadow(0 0 12px rgba(227, 24, 55, 0.18))"
                    : "drop-shadow(0 2px 8px rgba(0,0,0,0.07))",
                transition: "filter 0.3s ease",
            }}
        >
            {/* Wrapper */}
            <div
                className="flex items-center w-full rounded-2xl overflow-hidden"
                style={{
                    background: focused
                        ? "rgba(255,255,255,0.97)"
                        : "rgba(255,255,255,0.85)",
                    border: focused
                        ? "1.5px solid #E31837"
                        : "1.5px solid rgba(227,24,55,0.18)",
                    transition: "background 0.25s ease, border-color 0.25s ease",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                }}
            >
                {/* Search Icon */}
                <span
                    className="flex items-center justify-center shrink-0 pl-4 pr-2"
                    style={{
                        color: focused ? "#E31837" : "#aaa",
                        transition: "color 0.25s ease",
                    }}
                >
                    <svg
                        width="19"
                        height="19"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                </span>

                {/* Input Field */}
                <input
                    ref={inputRef}
                    type="text"
                    value={value}
                    onChange={onChange}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder={placeholder}
                    className="flex-1 bg-transparent outline-none text-sm py-3.5 pr-2"
                    style={{
                        fontFamily: "var(--font-sans), sans-serif",
                        color: "#1a1a1a",
                        caretColor: "#E31837",
                    }}
                />

                {/* Clear button */}
                {value && (
                    <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={handleClear}
                        className="flex items-center justify-center shrink-0 mr-3 rounded-full w-5 h-5 cursor-pointer"
                        style={{
                            background: "rgba(227,24,55,0.12)",
                            color: "#E31837",
                            transition: "background 0.2s",
                        }}
                        aria-label="Clear search"
                    >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M1.5 1.5L8.5 8.5M8.5 1.5L1.5 8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                    </button>
                )}

                {/* Mic icon (decorative / UX feel) */}
                {!value && (
                    <span
                        className="flex items-center justify-center shrink-0 mr-3.5"
                        style={{
                            color: focused ? "#E31837" : "#ccc",
                            transition: "color 0.25s ease",
                        }}
                    >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="9" y="2" width="6" height="13" rx="3" />
                            <path d="M5 10a7 7 0 0 0 14 0" />
                            <line x1="12" y1="19" x2="12" y2="22" />
                            <line x1="9" y1="22" x2="15" y2="22" />
                        </svg>
                    </span>
                )}
            </div>

            {/* Animated bottom accent */}
            <div
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: focused ? "60%" : "0%",
                    height: "2px",
                    background: "linear-gradient(90deg, transparent, #E31837, transparent)",
                    borderRadius: "9999px",
                    transition: "width 0.35s cubic-bezier(0.4,0,0.2,1)",
                    pointerEvents: "none",
                }}
            />
        </div>
    );
}