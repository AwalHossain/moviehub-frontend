"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const bannerImages = [
    "/banner/banner-1.jpg",
    "/banner/banner-2.jpg",
    "/banner/banner-3.jpg",
    "/banner/banner-4.jpg",
    "/banner/banner-5.jpg",
];

export default function Hero() {
    const router = useRouter();
    const [searcing, setSearching] = useState(false);
    const [query, setQuery] = useState("");

    useEffect(() => {
        setSearching(false);
    }, []);

    return (
        <header className="relative">
            <Swiper
                effect="fade"
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={false}
                navigation={false}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {bannerImages?.map((img) => (
                    <SwiperSlide className="w-full h-auto relative" key={img}>
                        <div className="w-full h-[calc(100vh-100px)] relative ">
                            <Image
                                src={img}
                                alt="banner"
                                fill
                                className="object-cover"
                                priority
                            />
                            {/* make a button */}

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/50 via-black/60 to-black/90 flex flex-col items-center justify-center">
                <h3 className="text-4xl md:text-5xl lg:text-[4rem] capitalize font-bold text-white text-center px-4">
                    Find the best <span className="text-primary">movies</span> In town
                </h3>
                <div className="mt-8 w-full max-w-lg px-4">
                    <div className="border border-primary border-opacity-60 flex items-center overflow-hidden rounded-xl px-3 transition-all duration-300 ease-in-out bg-black/30 backdrop-blur-sm">
                        <input
                            type="text"
                            placeholder="Search by movie name"
                            className="bg-transparent outline-none border-0 p-3 text-lg md:text-xl text-white placeholder:text-gray-300 flex-1"
                            value={query}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                        />
                        {query && (
                            <button
                                onClick={() => router.push(`/search?query=${query}`)}
                                className="p-2 rounded-full hover:bg-primary/20 transition-colors"
                            >
                                {searcing ? (
                                    <small>
                                        <Oval height={24} width={24} color="#fff" />
                                    </small>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6 text-primary"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                        />
                                    </svg>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
} 