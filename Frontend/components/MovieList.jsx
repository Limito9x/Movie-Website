"use client";
import Link from "next/link";
import MovieApi from "@/services/movie.api";
import dayjs from "dayjs";
import "dayjs/locale/vi";
dayjs.locale("vi");
import { useApi } from "@/services/useApi";
export default function MovieList({movies}) {
      if (!movies || movies.length === 0) {
        return <div>Không có dữ liệu phim.</div>;
      }
      return (
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {movies.map((movie) => (
            <Link
              className="border p-4 rounded-md shadow-md"
              key={movie.id}
              href={`/videos/${movie.id}`}
            >
              {/* Nội dung hiển thị của liên kết */}
    
              <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
              <p className="text-gray-500 mb-2">{movie.description}</p>
              {movie.actors && (
                <p className="text-sm text-gray-500 mb-2">
                  Diễn viên: {movie.actors.map((actor) => actor.name).join(", ")}
                </p>
              )}
              {movie.releaseDate && (
                <p className="text-sm text-gray-500 mb-2">
                  Ngày phát hành: {dayjs(movie.releaseDate).format("DD/MM/YYYY")}
                </p>
              )}
              {/* Bạn có thể hiển thị thumbnail ở đây nếu có */}
              <img className="movieImg" src={movie.images[0]?.image_url} />
            </Link>
          ))}
        </div>
      );
}