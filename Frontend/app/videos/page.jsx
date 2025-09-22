"use client";
import MovieList from "@/components/MovieList";
import { Box, Typography } from "@mui/material";
import MovieApi from "@/services/movie.api";
import { useApi } from "@/services/useApi";

export default function VideosPage() {
        const { data: movies, loading, error } = useApi(MovieApi, null);
        if (loading) {
          return <div>Đang tải dữ liệu phim...</div>;
        }

        if (error) {
          return <div>Lỗi khi tải dữ liệu phim: {error}</div>;
        }
    return (
        <Box sx={{p:2, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
            <Typography variant="h4" gutterBottom>
                Videos
            </Typography>
            <MovieList movies={movies} />
        </Box>
    );
}
