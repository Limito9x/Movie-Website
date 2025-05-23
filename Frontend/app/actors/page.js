"use client";
import { Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import ActorApi from "@/services/actor.api";
import { createFormData, handleInputChange } from "@/utils/formUtils";
import RenderInput from "@/components/RenderInput";
import { actorInput } from "@/utils/inputConfig";
import { useApi, deleteOne } from "@/services/useApi";
import dayjs from "dayjs";

export default function Actors() {
  const [actorData, setActorData] = useState({
    name: "",
    sex: "",
    dateOfBirth: "",
  });

  const { data: actors, loading, error } = useApi(ActorApi, null);

  const handleChange = (event) => {
    handleInputChange(setActorData, event);
  };

  const [imageFile, setImageFile] = useState([]);

  useEffect(() => {
    console.log("actorData", actorData);
    console.log("images", imageFile);
  }, [actorData, imageFile]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("actorData", actorData);
    console.log("images", imageFile);
    const formData = createFormData(actorData, null, imageFile);

  if(confirm("Do you want to create actor")) try {
      const response = await ActorApi.create(formData);
      console.log("Actor created:", response);
      alert(response.message);
    } catch (error) {
      console.error("Error creating movie:", error);
    }
  };

  if (loading) {
    return <div>Đang tải dữ liệu diễn viên...</div>;
  }

  if (error) {
    return <div>Lỗi khi tải dữ liệu diễn viên: {error}</div>;
  }

  return (
    <div>
      <div className="mt-3">
        <Typography variant="h4" component="h1" gutterBottom>
          Thêm diễn viên
        </Typography>
        <RenderInput
          inputConfig={actorInput}
          data={actorData}
        />
      </div>
      <div className="mt-3">
        <Typography variant="h4" component="h1" gutterBottom>
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
              <Button
                onClick={() => {
                  if (confirm(`Bạn có muốn xóa diễn viên ${actor.name}`))
                    deleteOne(ActorApi, actor.id);
                }}
              >
                Xóa diễn viên
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
