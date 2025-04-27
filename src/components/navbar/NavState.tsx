/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";


// import AuthFlow from "@/app/(group)/home/auth/AuthFlow";
// import { useAuth } from "@/context/AuthProvider";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Leaf, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import ProfileItems from "./ProfileItems";


const NavState = () => {

    // const { user, logout } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState<number | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);



    const handleDropdownOpenChange = (index: number) => {
        setIsDropdownOpen(isDropdownOpen === index ? null : index);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const getInitial = (name: string) => {
        return name.charAt(0).toUpperCase();
    };

    const user = {
        username: "undefined",
    };

    const menuRef = useRef<HTMLDivElement>(null);

    const handleItemClick = (item: any) => {
        if (item.action === "logout") {
            // logout();
            window.location.href = "/";
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
                        <Leaf className="w-8 h-8 text-primary" />
                    </Link>
                </div>
                <div className="flex w-full items-center lg:justify-between px-6 gap-3">
                    <div className="hidden xl:flex items-center gap-4">
                    </div>
                </div>

                <div className="hidden xl:flex lg:w-1/4 lg:justify-end items-center gap-2">
                    {/* <ModeToggle /> */}
                    {/* <TweakLanguage /> */}

                    {user?.username ? (
                        <DropdownMenu onOpenChange={(open) => setIsDropdownOpen(open ? 0 : null)}>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="flex items-center space-x-2 px-1 py-2 border-2 rounded-xl border-primary focus:text-primary hover:text-primary"
                                >
                                    <div className="w-8 h-8 rounded-full bg-secondary text-custom-content-white flex items-center justify-center font-semibold">
                                        {getInitial(user.username || 'U')}
                                    </div>
                                    <ChevronDown
                                        className={`w-5 h-5 transition-transform duration-300 ${isDropdownOpen !== null ? "rotate-180" : "rotate-0"}`}
                                    />
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent className="z-50 bg-background dark:bg-dark-background rounded-xl p-2 mt-2 shadow-lg">
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

                        // <AuthFlow />
                        <Button variant="outline" className="px-4 py-2 hover:bg-primary rounded-xl border-primary hover:border-transparent text-custom-content-secondary">
                            Login
                        </Button>

                    )}
                </div>

                <button
                    onClick={toggleMenu}
                    className="xl:hidden  flex items-center p-1.5 border rounded-lg text-primary border-primary bg-background dark:bg-dark-background cursor-pointer"
                    aria-label="Toggle menu"
                >
                    <Menu className="w-6 h-6 text-secondary p-1 " />
                    <span>Menu</span>
                </button>
            </div>


            <AnimatePresence>
                {menuOpen && (
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
                            className="absolute top-4 right-4 p-2 text-primary cursor-pointer"
                            aria-label="Close menu"
                        >
                            <X className="w-8 h-8" />
                        </button>


                        <div className="w-full max-w-xs flex flex-col items-center space-y-4">
                            {/* Mobile Menu Content */}
                            {user?.username ? (
                                <>
                                    <Button
                                        variant="outline"
                                        onClick={() => handleItemClick(ProfileItems[0])}
                                        className="w-full cursor-pointer py-3 text-lg rounded-xl border-primary text-custom-content-secondary"
                                    >
                                        My Account
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => handleItemClick(ProfileItems[1])}
                                        className="w-full cursor-pointer py-3 text-lg rounded-xl border-primary text-custom-content-secondary"
                                    >
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    variant="outline"
                                    onClick={() => { setMenuOpen(false); }}
                                    className="w-full py-3 text-lg rounded-xl border-primary text-custom-content-secondary">
                                    Login
                                </Button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default NavState;
