"use client";
import {
  TextField,
  Box,
  Button,
  Typography,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import ActorApi from "@/services/actor.api";
import createFormData from "@/utils/createFormData";
import CustomDatePicker from "@/components/CustomDatePicker";

export default function Actors() {
  const [actorData, setActorData] = useState({
    name: "",
    sex: "",
    dateOfBirth: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setActorData((prev) => ({ ...prev, [name]: value }));
  };

  const [imageFile, setImageFile] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("actorData", actorData);
    console.log("imageFile", imageFile);
    const formData = createFormData(actorData, null, imageFile);

    try {
      const response = await ActorApi.create(formData);
      console.log("Actor created:", response);
      alert(response.message);
    } catch (error) {
      console.error("Error creating movie:", error);
    }
  };

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
            onChange={handleInputChange}
            required
          />
          <TextField
            select
            name="sex"
            label="Giới tính"
            variant="outlined"
            value={actorData.sex}
            onChange={handleInputChange}
          >
            <MenuItem value={false}>Nam</MenuItem>
            <MenuItem value={true}>Nữ</MenuItem>
          </TextField>
          <CustomDatePicker
            date={actorData.dateOfBirth}
            setDate={(newDate) =>
              setActorData((prev) => ({ ...prev, dateOfBirth: newDate }))
            }
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
            Thêm Phim
          </Button>
        </Box>
      </form>
    </main>
  );
}
