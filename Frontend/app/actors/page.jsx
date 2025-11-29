"use client";
import { Typography} from "@mui/material";
import ActorApi from "@/services/actor.api";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";


export default function Actors() {

  const { data: actors, isLoading: loading, error } = useQuery({
    queryKey: ["actors"],
    queryFn: () => ActorApi.getAll(),
  });

  

  if (loading) {
    return <div>Đang tải dữ liệu diễn viên...</div>;
  }

  if (error) {
    return <div>Lỗi khi tải dữ liệu diễn viên: {error}</div>;
  }

  return (
      <div className="flex flex-col justify-center items-center">
        <Typography sx={{ mb: 2}} variant="h4" component="h1" gutterBottom>
          Danh sách diễn viên
        </Typography>
        {actors.length === 0 && <div>Không có dữ liệu diễn viên.</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {actors.map((actor) => (
            <div key={actor.id} className="border p-4 rounded-md shadow-md">
              <h2 className="text-xl font-bold">{actor.name}</h2>
              <p className="text-gray-500">
                Giới tính: {actor.sex ? "Nữ" : "Nam"}
              </p>
              <p className="text-sm text-gray-500">
                Ngày sinh: {dayjs(actor.dateOfBirth).format("DD/MM/YYYY")}
              </p>
              <img
                className="movieImg"
                src={actor.avatarUrl}
                alt={actor.name}
              />
            </div>
          ))}
        </div>
      </div>
  );
}
