"use client";
import MovieApi from "@/services/movie.api";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import {useApi,deleteOne} from "@/services/useApi";
import { Button } from "@mui/material";
import Carousel from "@/components/Carousel";
import UpdateItemDialog from "@/components/UpdateItemDialog";
import movieApi from "@/services/movie.api";

export default function Video() {
  const id = useParams().id;
  const {data: movie,loading,error,refetch} = useApi(MovieApi,id);

  const inputs = [
    {key: 'title',label: 'Tên phim'},
    {key: 'description',label: 'Mô tả'},
    {key: 'releaseDate',label: 'Ngày phát hành',type: 'date'},
  ]

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
      <Button
        variant="outlined"
        onClick={() => {
          if (confirm("Bạn có muốn xóa video?")) deleteOne(MovieApi, id);
        }}
      >
        Xóa
      </Button>
      <UpdateItemDialog
        inputConfig={inputs}
        dataValue={movie}
        instance={movieApi}
        refetch={refetch}
      />
    </div>
  );
}
