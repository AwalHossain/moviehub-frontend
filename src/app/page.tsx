import Hero from "@/components/hero/Hero";
import LatestMovies from "@/components/Movies/LatestMovies";
import { getMovies } from "@/services/server-fetch";

export default async function Home() {
  const { data } = await getMovies({
    page: 1,
    limit: 10,
    filter: {
      genres: "Action"
    },
    sortBy: "title",
    sortOrder: "desc"
  });
  const { data: fantasyData } = await getMovies({
    page: 1,
    limit: 10,
    filter: {
      genres: "Fantasy"
    },
    sortBy: "title",
    sortOrder: "desc"
  });
  const { data: comedyData } = await getMovies({
    page: 1,
    limit: 10,
    filter: {
      genres: "Comedy"
    },
    sortBy: "title",
    sortOrder: "desc"
  });
  const { data: Popular } = await getMovies({
    page: 1,
    limit: 10,
    filter: {
      source_category: "popular"
    },
    sortBy: "title",
    sortOrder: "desc"
  });
  const { data: NewMovies } = await getMovies({
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "desc"
  });

  return (
    <div className="bg-custom-dark">
      <Hero />
      <div className="max-w-screen mx-auto relative mt-[-120px] z-[10] p-3">
        <LatestMovies data={NewMovies?.data} title="New Movies" />
      </div>
      <div className="max-w-screen mx-auto relative z-[10] p-3">
        <LatestMovies data={data?.data} title="Latest Movies" />
      </div>
      <div className="max-w-screen mx-auto relative z-[10] p-3">
        <LatestMovies data={Popular?.data} title="Popular Movies" />
      </div>
      <div className="max-w-screen mx-auto relative z-[10] p-3">
        <LatestMovies data={fantasyData?.data} title="Fantasy Movies" />
      </div>
      <div className="max-w-screen mx-auto relative z-[10] p-3">
        <LatestMovies data={comedyData?.data} title="Comedy Movies" />
      </div>
    </div>
  );
}
