"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import movieApi from "@/services/movie.api";
import MovieList from "@/components/MovieList"; // Tùy bạn có component này chưa

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (query) {
      movieApi
        .getList({ title: query })
        .then((res) => setMovies(res));
    }
  }, [query]);

  return (
    <div>
      <div>Kết quả tìm kiếm: "{query}"</div>
      <MovieList movies={movies} />
    </div>
  );
}
