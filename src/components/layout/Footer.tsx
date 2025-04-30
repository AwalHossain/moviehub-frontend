"use client";

import { Facebook, Github, Instagram, Leaf, Twitter } from "lucide-react";
import Link from "next/link";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#121212] text-gray-300 pt-12 pb-8 mt-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <Leaf className="w-8 h-8 text-primary" />
                            <span className="text-xl font-bold text-white">MovieHub</span>
                        </Link>
                        <p className="text-sm text-gray-400 mb-4">
                            Discover and enjoy the best movies from around the world. Your one-stop destination for movie information.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://www.facebook.com/awalhossain/" className="text-gray-400 hover:text-primary transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="https://twitter.com/awalHossain" className="text-gray-400 hover:text-primary transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="https://www.instagram.com/awalhossain/" className="text-gray-400 hover:text-primary transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="https://github.com/awalHossain/" className="text-gray-400 hover:text-primary transition-colors">
                                <Github size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="col-span-1">
                        <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
                        <ul className="space-y-2">
                            <li><Link href="/movies?genre=action" className="text-gray-400 hover:text-primary transition-colors">Action</Link></li>
                            <li><Link href="/movies?genre=comedy" className="text-gray-400 hover:text-primary transition-colors">Comedy</Link></li>
                            <li><Link href="/movies?genre=fantasy" className="text-gray-400 hover:text-primary transition-colors">Fantasy</Link></li>
                            <li><Link href="/movies?genre=horror" className="text-gray-400 hover:text-primary transition-colors">Horror</Link></li>
                            <li><Link href="/movies?genre=romance" className="text-gray-400 hover:text-primary transition-colors">Romance</Link></li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div className="col-span-1">
                        <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link href="/" className="text-gray-400 hover:text-primary transition-colors">Home</Link></li>
                            <li><Link href="/movies" className="text-gray-400 hover:text-primary transition-colors">Movies</Link></li>
                            <li><Link href="/about" className="text-gray-400 hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-primary transition-colors">Contact</Link></li>
                            <li><Link href="/privacy" className="text-gray-400 hover:text-primary transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="col-span-1">
                        <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
                        <p className="text-sm text-gray-400 mb-4">Subscribe to our newsletter for the latest updates</p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="bg-gray-800 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-primary flex-grow"
                            />
                            <button className="bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-r-lg transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-10 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm text-gray-400">
                            &copy; {currentYear} MovieHub. All rights reserved.
                        </p>
                        <div className="mt-4 md:mt-0">
                            <ul className="flex space-x-6">
                                <li><Link href="/terms" className="text-sm text-gray-400 hover:text-primary transition-colors">Terms</Link></li>
                                <li><Link href="/privacy" className="text-sm text-gray-400 hover:text-primary transition-colors">Privacy</Link></li>
                                <li><Link href="/cookies" className="text-sm text-gray-400 hover:text-primary transition-colors">Cookies</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 