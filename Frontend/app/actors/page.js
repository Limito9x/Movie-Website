"use client";
import { Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import ActorApi from "@/services/actor.api";
import { createFormData, handleInputChange } from "@/utils/formUtils";
import RenderInput from "@/components/RenderInput";
import UpdateFile from "@/components/UpdateFile";
import { actorInput, def } from "@/utils/inputConfig";
import { useApi, deleteOne } from "@/services/useApi";
import dayjs from "dayjs";

export default function Actors() {
  const [actorData, setActorData] = useState({
    name: "",
    sex: "",
    dateOfBirth: "",
  });
  const updateActorConfig = [
    def("name", "Tên diễn viên"),
    def("sex", "Giới tính", "sex"),
    def("dateOfBirth", "Ngày sinh", "date"),
  ];
  const [openMange, setOpenManage] = useState(false);
  const toggleManage = () => {
    setOpenManage(!openMange);
  };

  const { data: actors, loading, error } = useApi(ActorApi, null);
  const [images, setImages] = useState([]);
  useEffect(() => {
    if (actors) {
      setImages(
        actors.map((actor) => {
          return { id: actor.avatarStoragePath, url: actor.avatarUrl };
        })
      );
    }
  }, [actors]);

  const handleChange = (event) => {
    handleInputChange(setActorData, event);
  };

  const [imageFile, setImageFile] = useState([]);

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
    <div>
      <div>
        <Typography variant="h4" component="h1" gutterBottom>
          Test
          <UpdateFile
            idName={"id"}
            fileType={"image"}
            label={"Hình ảnh"}
            handleChange={setActorData}
            delPropName={"deletedIds"}
            addPropName={"addImages"}
            maxFiles={images.length}
            items={images}
            urlPropName={"url"}
          ></UpdateFile>
        </Typography>
        {/* <Button onClick={toggleManage}>Quản lý dữ liệu</Button>
        <DataMange
          open={openMange}
          onClose={toggleManage}
          categoryName={"diễn viên"}
          data={actors}
          addConfig={actorInput}
          updateConfig={updateActorConfig}
          api={ActorApi}
        /> */}
      </div>
      {/* <div className="mt-3">
        <Typography variant="h4" component="h1" gutterBottom>
          Thêm diễn viên
        </Typography>
        <RenderInput inputConfig={actorInput} data={actorData} />
      </div> */}
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
