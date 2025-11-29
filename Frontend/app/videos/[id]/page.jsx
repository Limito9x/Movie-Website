"use client";
import movieApi from "@/services/movie.api";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import { useApi } from "@/services/useApi";
import Carousel from "@/components/Carousel";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function Video() {
  const id = useParams().id;
  const { data: movie, isLoading: loading, error } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => movieApi.getById(id),
  });

  if (loading) {
    return <div>Đang tải dữ liệu phim...</div>;
  }

  if (error) {
    return <div>Lỗi khi tải dữ liệu phim: {error}</div>;
  }

  if (!movie) {
    return <div>Không có dữ liệu phim.</div>;
  }
  return (
    <div className="border p-4 rounded-md shadow-md max-w-2xl mx-auto flex flex-col gap-4">
      <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
      <p className="text-gray-500 mb-2">{movie.description}</p>
      {movie.actors && (
        <p className="text-md text-gray-500 mb-2">
          Diễn viên: {movie.actors.map((actor) => actor.name).join(", ")}
        </p>
      )}
      {movie.genres && (
        <p className="text-md text-gray-500 mb-2">
          Thể loại: {movie.genres.map((genre) => genre.name).join(", ")}
        </p>
      )}
      {movie.tags && (
        <p className="text-md text-gray-500 mb-2">
          Tag: {movie.tags.map((tag) => tag.name).join(", ")}
        </p>
      )}
      {movie.releaseDate && (
        <p className="text-sm text-gray-500 mb-2">
          Ngày phát hành: {dayjs(movie.releaseDate).format("DD/MM/YYYY")}
        </p>
      )}
      {movie.url && (
        <div className="video-container">
          <video src={movie.url} controls className="video-element"></video>
        </div>
      )}
      <div className="SliderContainer">
        {movie.images && <Carousel slides={movie.images} />}
      </div>
      {!movie.url && (
        <div className="bg-gray-200 aspect-w-16 aspect-h-9 rounded-md flex items-center justify-center">
          Không có video
        </div>
      )}
    </div>
  );
}
