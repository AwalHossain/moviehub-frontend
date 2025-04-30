"use client"
// import useFetch from "hooks/useFetch";
import { useRef } from "react";
import Slider from "react-slick";

import { IMovie } from "@/interface/movies";
import Thumbnail from "./Thumbnail";



const NextArrow = ({ onClick }: { onClick: () => void }) => {
    return (
        <button
            className="bg-slate-800 hover:bg-slate-900 transition-all duration-300 cursor-pointer text-slate-100 h-[40px] w-[40px] rounded-full flex justify-center items-center"
            onClick={onClick}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-[2rem] h-[2rem]"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
            </svg>
        </button>
    );
};
const settings = {
    dots: false,
    initialSlide: 0,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 2,
    speed: 500,
    cssEase: "ease-in-out",
    swipeToSlide: true,
    arrows: false,
    responsive: [
        {
            breakpoint: 1280,
            settings: {
                slidesToShow: 6,
                slidesToScroll: 22,
            },
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 2,
            },
        },
        {
            breakpoint: 800,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 2,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 2,
            },
        },
    ],
};

const PrevArrow = ({ onClick }: { onClick: () => void }) => {
    return (
        <button
            className="bg-slate-800 hover:bg-slate-900 transition-all duration-300 cursor-pointer text-slate-100 h-[40px] w-[40px] rounded-full flex justify-center items-center"
            onClick={onClick}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-[2rem] h-[2rem]"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
            </svg>
        </button>
    );
};

interface LatestMoviesProps {
    data: Partial<IMovie>[];
    title: string;
}

const LatestMovies = ({ data, title }: LatestMoviesProps) => {
    const sliderRef = useRef<Slider>(null);


    console.log(data, "From latestmovies.tsx");

    if (!data || data.length === 0) {
        return <div className="py-5 text-white text-2xl font-bold text-center">No movies available.</div>;
    }

    return (
        <>
            <div className="flex justify-between items-center py-5">
                <h4 className="text-[2rem] font-bold text-white">{title}</h4>
                <div className="flex items-center gap-5">
                    <PrevArrow onClick={() => sliderRef.current?.slickPrev()} />
                    <NextArrow onClick={() => sliderRef.current?.slickNext()} />
                </div>
            </div>
            <Slider {...settings} ref={sliderRef}>
                {data?.map((movie) => (
                    <Thumbnail movie={movie as IMovie} key={movie._id} />
                ))}
            </Slider>
        </>
    );
};

export default LatestMovies; 