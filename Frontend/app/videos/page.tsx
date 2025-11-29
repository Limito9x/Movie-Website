"use client";
import MovieList from "@/components/MovieList";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import movieApi from "@/services/movie.api";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import Pagination from "@/components/Pagination";

export default function VideosPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams.get("page") || 1;

  const { data } = useQuery({
    queryKey: ["movies"],
    queryFn: () => movieApi.getList({
      query: "",
      page: Number(page),
      limit: 10
    }),
  });

  const {data: movies, totalPages} = data || {movies: [], totalPages: 1};

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
      <Typography variant="h4">Videos</Typography>
      <MovieList movies={movies} />
      <Pagination
        page={Number(page)}
        totalPages={totalPages}
        onChange={(newPage) => {
          router.push(`/videos?page=${newPage}`);
        }}
      />
    </Box>
  );
}
