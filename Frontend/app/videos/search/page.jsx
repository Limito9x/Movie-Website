"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import movieApi from "@/services/movie.api";
import MovieList from "@/components/MovieList"; // Tùy bạn có component này chưa
import CustomPagination from "@/components/CustomPagination";
import { Box } from "@mui/material";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [movies, setMovies] = useState([]);

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div>Kết quả tìm kiếm: "{query}"</div>
      <MovieList movies={movies} />
      <CustomPagination
        api={movieApi}
        limit={4}
        onChange={(val) => setMovies(val)}
      />
    </Box>
  );
}
