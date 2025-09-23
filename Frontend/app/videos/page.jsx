"use client";
import MovieList from "@/components/MovieList";
import { Box, Typography } from "@mui/material";
import MovieApi from "@/services/movie.api";
import { useState } from "react";
import CustomPagination from "@/components/CustomPagination";

export default function VideosPage() {
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
      <Typography variant="h4">Videos</Typography>
      <MovieList movies={movies} />
      <CustomPagination
        api={MovieApi}
        limit={4}
        onChange={(val) => setMovies(val)}
      />
    </Box>
  );
}
