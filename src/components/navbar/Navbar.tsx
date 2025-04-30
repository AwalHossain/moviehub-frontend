"use client";

import { useEffect, useState } from "react";
import NavState from "./NavState";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {

            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [scrolled]);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 px-2 md:px-6 py-4 z-[999] transition-all duration-300 ease-in-out ${scrolled
                ? "bg-custom-dark shadow-md"
                : "bg-transparent"
                }`}
        >
            <div className="flex items-center justify-between space-x-6 max-w-7xl mx-auto">
                <div className="w-full">
                    <NavState />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
