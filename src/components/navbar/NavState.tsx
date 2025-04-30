/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { getInitial } from "@/lib/utils";
import { useAuth } from "@/provider/AuthProvider";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import AuthFlow from "../auth/AuthFlow";
import NotificationDropdown from "./NotificationDropdown";
import ProfileItems from "./ProfileItems";

const NavState = () => {
    const { user, logout, isLoading } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState<number | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const menuRef = useRef<HTMLDivElement>(null);

    const handleItemClick = (item: any) => {
        if (item.action === "logout") {
            logout();
        } else if (item.url) {
            window.location.href = item.url;
        }
        setMenuOpen(false);

    };

    const menuVariants = {
        closed: { opacity: 0 },
        open: { opacity: 1 }
    };

    return (
        <div className="">
            <div className=" flex items-center justify-between w-full px-5 ">
                <div className="h-10 w-28">
                    <Link href="/">
                        <span className="text-5xl font-bold text-primary">🍿</span>
                    </Link>
                </div>
                <div className="flex w-full items-center lg:justify-between px-6 gap-3">
                    <div className="hidden xl:flex items-center gap-4">
                    </div>
                </div>

                <div className="hidden xl:flex lg:w-1/4 lg:justify-end items-center gap-2">
                    {!isLoading && user?._id && <NotificationDropdown />}

                    {isLoading ? (
                        <div className="flex items-center space-x-2">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <Skeleton className="h-5 w-5" />
                        </div>
                    ) : user?._id ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="flex items-center space-x-2 px-1 py-2 border-2 rounded-xl border-primary focus:text-primary hover:text-primary"
                                    onClick={() => setIsDropdownOpen(isDropdownOpen === 0 ? null : 0)}
                                >
                                    <div className="w-8 h-8 rounded-full bg-secondary text-custom-content-white flex items-center justify-center font-semibold">
                                        {getInitial(user.name || 'U')}
                                    </div>
                                    <ChevronDown
                                        className={`w-5 h-5 transition-transform duration-300 ${isDropdownOpen !== null ? "rotate-180" : "rotate-0"}`}
                                    />
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent className="z-50 bg-background dark:bg-dark-background rounded-xl p-2 mt-3 shadow-lg">
                                {ProfileItems.map((item, index) => (
                                    <DropdownMenuItem key={index} className="group rounded-xl p-1 cursor-pointer" onClick={() => handleItemClick(item)}>
                                        <span className="text-custom-content-tertiary flex items-center group-hover:text-custom-content-tertiary rounded-xl p-1 gap-2">
                                            {item.icon}
                                            {item.label}
                                        </span>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <AuthFlow />
                    )}
                </div>

                {isLoading ? (
                    <div className="xl:hidden">
                        <Skeleton className="h-10 w-16 rounded-lg" />
                    </div>
                ) : user?._id ? (
                    <button
                        onClick={toggleMenu}
                        className="xl:hidden flex items-center p-1.5 border rounded-lg text-primary border-primary bg-background dark:bg-dark-background cursor-pointer"
                        aria-label="Toggle menu"
                    >
                        <Menu className="w-6 h-6 text-secondary p-1 " />
                        <span>Menu</span>
                    </button>
                ) : (
                    <div className="xl:hidden">
                        <AuthFlow />
                    </div>
                )}
            </div>

            {/* mobile Menu */}
            <AnimatePresence>
                {menuOpen && user?._id && (
                    <motion.div
                        key="mobile-menu"
                        ref={menuRef}
                        className="fixed inset-0 z-50 bg-background dark:bg-dark-background flex flex-col items-center justify-center p-6 xl:hidden"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={toggleMenu}
                            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-400 cursor-pointer"
                            aria-label="Close menu"
                        >
                            <X className="w-8 h-8" />
                        </button>


                        <div className="w-full max-w-xs flex flex-col items-center space-y-4">
                            {/* Mobile Menu Content */}
                            <Button
                                variant="outline"
                                className="relative hover:text-white w-full flex items-center justify-center gap-2 py-3 rounded-xl border-primary"
                                onClick={() => {
                                    window.location.href = '/notifications';
                                    toggleMenu();
                                }}
                            >
                                <NotificationDropdown isMobile />
                            </Button>

                            {ProfileItems.map((item, index) => (
                                <Button
                                    key={index}
                                    variant="default"
                                    size="lg"
                                    className="w-full cursor-pointer gap-2
                                     text-white text-lg rounded-xl border-primary"
                                    onClick={() => handleItemClick(item)}
                                >
                                    {item.label}
                                    {item.icon}
                                </Button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default NavState;
