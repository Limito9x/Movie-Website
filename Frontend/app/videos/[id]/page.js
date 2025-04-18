"use client";
import MovieApi from "@/services/movie.api";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { useParams } from "next/navigation";
dayjs.locale("vi");
import {useApi,deleteOne} from "@/services/useApi";
import { Button } from "@mui/material";
import Carousel from "@/components/Carousel";
import FormDialog from "@/components/FormDialog";

export default function Video() {
  const id = useParams().id;
  const {data: movie,loading,error} = useApi(MovieApi,id);
  console.log(movie);

  const inputs = [
    {key: 'title',label: 'Tên phim'},
    {key: 'descriptioon',label: 'Mô tả'},
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
      <Button variant="outlined"
        onClick={() => {
          if (confirm("Bạn có muốn xóa video?")) deleteOne(MovieApi, id);
        }}
      >
        Xóa
      </Button>
      <FormDialog inputConfig={inputs}/>
    </div>
  );
}
