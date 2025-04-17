"use client";
import { useState, useEffect } from "react";
import MovieApi from "@/services/movie.api";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { useParams } from "next/navigation";
dayjs.locale("vi");
import useApi from "@/services/useApi";
import { Button } from "@mui/material";
export default function Video() {
  const id = useParams().id;
  const [movieApi] = useState(() => new useApi(MovieApi));
  const [movie, setMovie] = useState(); // Khởi tạo movies là một mảng rỗng
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadMovie = async () => {
    setLoading(true);
    setError(null);
    await movieApi.fetchDataByID(id);

    setMovie(movieApi.data);
    setLoading(false);
    if (movieApi.error) {
      setError(movieApi.error);
    }
    
  };

  useEffect(() => {
    loadMovie();
  }, []); // Dependency array rỗng để loadMovies chỉ chạy một lần sau khi component mount

  if (loading) {
    return <div>Đang tải dữ liệu phim...</div>;
  }

  if (error) {
    return <div>Lỗi khi tải dữ liệu phim: {error}</div>;
  }

  if (!movie ) {
    return <div>Không có dữ liệu phim.</div>;
  }
  return (
    <div className="border p-4 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
      <p className="text-gray-500 mb-2">{movie.description}</p>
      {movie.releaseDate && (
        <p className="text-sm text-gray-500 mb-2">
          Ngày phát hành: {dayjs(movie.releaseDate).format("DD/MM/YYYY")}
        </p>
      )}
      {movie.url && (
        <div className="video-container">
          <video
            src={movie.url}
            controls
            className="video-element"
          ></video>
        </div>
      )}
      {!movie.url && (
        <div className="bg-gray-200 aspect-w-16 aspect-h-9 rounded-md flex items-center justify-center">
          Không có video
        </div>
      )}
      <Button
        onClick={() => {
          if (confirm("Bạn có muốn xóa video?"))
            movieApi.deleteOne(id);
        }}
        variant="error"
      >
        Xóa
      </Button>
    </div>
  );
}
