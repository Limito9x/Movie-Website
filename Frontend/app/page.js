"use client";
import Link from "next/link";
import MovieApi from "@/services/movie.api";
import dayjs from "dayjs";
import "dayjs/locale/vi";
dayjs.locale("vi");
import { useApi } from "@/services/useApi";

export default function Home() {
  const { data: movies, loading, error } = useApi(MovieApi, null);

  if (loading) {
    return <div>Đang tải dữ liệu phim...</div>;
  }

  if (error) {
    return <div>Lỗi khi tải dữ liệu phim: {error}</div>;
  }

  if (!movies || movies.length === 0) {
    return <div>Không có dữ liệu phim.</div>;
  }
  console.log(movies);
  return (
    <main className="container flex flex-col items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.map((movie) => (
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
                Ngày phát hành: {dayjs(movie.releaseDate).format("DD/MM/YYYY")}
              </p>
            )}
            {/* Bạn có thể hiển thị thumbnail ở đây nếu có */}
            <img className="movieImg" src={movie.images[0].image_url}/>
          </Link>
        ))}
      </div>
    </main>
  );
}
