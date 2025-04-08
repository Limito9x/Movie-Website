"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import movieApi from "@/services/movie.api";
import dayjs from "dayjs";
import "dayjs/locale/vi";
dayjs.locale("vi");
import { fetchAllAPI } from "@/services/fetchData";

export default function Home() {
  const [movies, setMovies] = useState({
    data: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    const loadMovies = async () => {
      const result = await fetchAllAPI(movieApi);
      setMovies(result);
    };
    loadMovies();
  }, [movieApi]); // Thêm movieApi vào dependencies để useEffect chạy lại nếu nó thay đổi

  if (movies.loading) {
    return <div>Đang tải dữ liệu phim...</div>;
  }

  if (movies.error) {
    return <div>Lỗi khi tải dữ liệu phim: {movies.error}</div>;
  }

  if (!movies.data) {
    return <div>Không có dữ liệu phim.</div>;
  }

  return (
    <main className="container flex flex-col items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.data.map((movie) => (
            <Link
              className="border p-4 rounded-md shadow-md"
              key={movie.id}
              href={`/videos/${movie.id}`}
            >
              {/* Nội dung hiển thị của liên kết */}

                <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
                <p className="text-gray-500 mb-2">{movie.description}</p>
                {movie.releaseDate && (
                  <p className="text-sm text-gray-500 mb-2">
                    Ngày phát hành:{" "}
                    {dayjs(movie.releaseDate).format("DD/MM/YYYY")}
                  </p>
                )}
                {/* Bạn có thể hiển thị thumbnail ở đây nếu có */}
            </Link>
        ))}
      </div>
    </main>
  );
}
