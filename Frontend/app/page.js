"use client";
import { useState, useEffect } from "react";
import movieApi from "@/services/movie.api";
import dayjs from "dayjs";
import "dayjs/locale/vi"; // Import ngôn ngữ tiếng Việt cho dayjs
dayjs.locale("vi"); // Thiết lập ngôn ngữ tiếng Việt

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await movieApi.getAll();
        setMovies(response.data); // Giả sử API trả về một object có thuộc tính 'data' là mảng movies
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError("Không thể tải dữ liệu phim.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Đang tải dữ liệu phim...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <main>
        <h1>Danh Sách Phim</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {movies.map((movie) => (
            <div key={movie._id} className="border p-4 rounded-md shadow-md">
              <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
              <p className="text-gray-700 mb-2">{movie.description}</p>
              {movie.releaseDate && (
                <p className="text-sm text-gray-500 mb-2">
                  Ngày phát hành:{" "}
                  {dayjs(movie.releaseDate).format("DD/MM/YYYY")}
                </p>
              )}
              {movie.url && (
                <div className="aspect-w-16 aspect-h-9">
                  <video
                    src={movie.url}
                    controls
                    className="w-full h-full rounded-md"
                  ></video>
                </div>
              )}
              {!movie.url && (
                <div className="bg-gray-200 aspect-w-16 aspect-h-9 rounded-md flex items-center justify-center">
                  Không có video
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
