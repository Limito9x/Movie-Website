"use client";
import { TextField, Box, Button, Typography, MenuItem } from "@mui/material";
import { useState, useEffect, use } from "react";
import ActorApi from "@/services/actor.api";
import { createFormData, handleInputChange } from "@/utils/formUtils";
import CustomDatePicker from "@/components/CustomDatePicker";
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

  useEffect(() => {
    console.log("actorData", actorData);
  }, [actorData]);

  const { data: actors, loading, error } = useApi(ActorApi, null);

  const handleChange = (event) => {
    handleInputChange(setActorData, event);
  };

  const [imageFile, setImageFile] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = createFormData(actorData, null, imageFile);

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
    <main style={{ padding: "20px" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Thêm Diễn Viên Mới
      </Typography>
      <form className="mt-3" onSubmit={handleSubmit}>
        <Box className="flex flex-col gap-3" maxWidth="500px">
          <TextField
            label="Tên diễn viên"
            variant="outlined"
            name="name"
            value={actorData.name}
            onChange={handleChange}
            required
          />
          <TextField
            select
            name="sex"
            label="Giới tính"
            variant="outlined"
            value={actorData.sex}
            onChange={handleChange}
          >
            <MenuItem value={false}>Nam</MenuItem>
            <MenuItem value={true}>Nữ</MenuItem>
          </TextField>
          <CustomDatePicker
            date={actorData.dateOfBirth}
            setDate={setActorData}
            name="dateOfBirth"
            label="Ngày sinh"
          ></CustomDatePicker>
          Ảnh đại diện:
          <input
            type="file"
            name="images"
            accept="image/*"
            onChange={(event) => {
              setImageFile([event.target.files[0]]);
            }}
          ></input>
          <Button type="submit" variant="contained" color="primary">
            Thêm Diễn Viên
          </Button>
        </Box>
      </form>
      <div className="mt-3">
        <Typography variant="h4" component="h1" gutterBottom>
          Test
        </Typography>
        <RenderInput
          inputConfig={actorInput}
          data={actorData}
          setData={setActorData}
          setFile={setImageFile}
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
    </main>
  );
}
