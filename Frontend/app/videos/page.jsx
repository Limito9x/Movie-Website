"use client";
import MovieList from "@/components/MovieList";
import { Box, Typography } from "@mui/material";
import MovieApi from "@/services/movie.api";
import { useEffect, useState } from "react";
import CustomPagination from "@/components/CustomPagination";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function VideosPage() {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const router = useRouter();
  const limit = 4;

  const fetchData = async () => {
    const data = await MovieApi.getList({ page, limit });
    setMovies(data);
  }

  const [movies, setMovies] = useState({ data: [], total: 0 });

  useEffect(() => {
    fetchData();
    setPage(Number(searchParams.get("page")) || 1);
  }, [searchParams, page]);
  const handleChangePage = (newPage) => {
    router.push(`/videos?page=${newPage}`);
  };
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
      <Typography variant="h4">
        Videos
      </Typography>
      <MovieList movies={movies.data} />
      <CustomPagination page={page} count={Math.ceil(movies.total / limit)} onChange={(val) => handleChangePage(val)} />
    </Box>
  );
}
