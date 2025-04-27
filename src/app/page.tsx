import Hero from "@/components/hero/Hero";
import LatestMovies from "@/components/Movie/LatestMovies";
export default function Home() {
  return (
    <div className="bg-custom-dark">
      <Hero />
      <div className="max-w-screen mx-auto relative mt-[-120px] z-[10] px-3">
        <LatestMovies />
      </div>
      <div className="max-w-screen mx-auto relative z-[10] p-3">
        <LatestMovies />
      </div>
    </div>
  );
}
