"use client";
import MovieList from "@/components/MovieList";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import CustomPagination from "@/components/CustomPagination";
import { movieReduxApi } from "@/redux/api/movie.reduxApi";

export default function VideosPage() {
  const [movies, setMovies] = useState([]);
  const { data } = movieReduxApi.useGetQuery(movies);

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
      <MovieList movies={data} />
      
    </Box>
  );
}
