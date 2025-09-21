"use client";
import { Button, Typography} from "@mui/material";
import { useState, useEffect } from "react";
import ActorApi from "@/services/actor.api";
import { createFormData } from "@/utils/formUtils";
import UpdateItemDialog from "@/components/UpdateItemDialog";
import { actorConfig } from "@/utils/inputConfig";
import { useApi, deleteOne } from "@/services/useApi";
import dayjs from "dayjs";
import actorApi from "@/services/actor.api";

export default function Actors() {
  const [actorData, setActorData] = useState({});
  const [selectedActor, setSelectedActor] = useState(null);

  const [openUpdate, setOpenUpdate] = useState(false);
  const toggleUpdate = () => {
    setOpenUpdate(!openUpdate);
  };

  const { data: actors, loading, error, refetch } = useApi(ActorApi, null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = createFormData(actorData, null, imageFile);

    if (confirm("Do you want to create actor"))
      try {
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
      <div className="flex flex-col justify-center items-center">
        <Typography sx={{fontWeight: 'bold', mb: 2}} variant="h4" component="h1" gutterBottom>
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
              <div className="flex gap-2">
                {" "}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    if (confirm(`Bạn có muốn xóa diễn viên ${actor.name}`))
                      deleteOne(ActorApi, actor.id);
                  }}
                >
                  Xóa diễn viên
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setSelectedActor(actor);
                    toggleUpdate();
                  }}
                >
                  Cập nhật
                </Button>
              </div>
              <UpdateItemDialog
                openState={openUpdate}
                handleClose={toggleUpdate}
                inputConfig={actorConfig.update}
                dataValue={selectedActor}
                instance={actorApi}
                refetch={refetch}
                label={"Diễn viên"}
              ></UpdateItemDialog>
            </div>
          ))}
        </div>
      </div>
  );
}
