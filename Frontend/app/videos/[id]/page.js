"use client";
import { useState, useEffect } from "react";
import movieApi from "@/services/movie.api";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { useParams } from "next/navigation";
dayjs.locale("vi");
import { fetchOneAPI } from "@/services/fetchData";
export default function Video() {
    const id = useParams().id;
  const [movie, setMovie] = useState({
    data: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    const loadMovie = async () => {
      const result = await fetchOneAPI(movieApi,id);
      setMovie(result);
    };
    loadMovie();
  }, [movieApi]); // Thêm movieApi vào dependencies để useEffect chạy lại nếu nó thay đổi

  if (movie.loading) {
    return <div>Đang tải dữ liệu phim...</div>;
  }

  if (movie.error) {
    return <div>Lỗi khi tải dữ liệu phim: {movie.error}</div>;
  }

  if (!movie.data) {
    return <div>Không có dữ liệu phim.</div>;
  }
  return (
    <div className="border p-4 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-2">{movie.data.title}</h2>
      <p className="text-gray-500 mb-2">{movie.data.description}</p>
      {movie.data.releaseDate && (
        <p className="text-sm text-gray-500 mb-2">
          Ngày phát hành: {dayjs(movie.releaseDate).format("DD/MM/YYYY")}
        </p>
      )}
      {movie.data.url && (
        <div className="video-container">
          <video src={movie.data.url} controls className="video-element"></video>
        </div>
      )}
      {!movie.data.url && (
        <div className="bg-gray-200 aspect-w-16 aspect-h-9 rounded-md flex items-center justify-center">
          Không có video
        </div>
      )}
    </div>
  );
}
