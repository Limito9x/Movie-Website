"use client";
import { FormControl, TextField, Box, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import MovieApi from "@/services/movie.api";
import ActorApi from "@/services/actor.api";
import GenreApi from "@/services/genre.api";
import TagApi from "@/services/tag.api";
import { createFormData, handleInputChange } from "@/utils/formUtils";
import CustomDatePicker from "@/components/CustomDatePicker";
import CustomAutoComplete from "@/components/CustomAutoComplete";
import { actorInput,genreInput, tagInput } from "@/utils/inputConfig";
import Dropzone from "@/components/Dropzone";

export default function Uploads() {
  const [movieData, setMovieData] = useState({
    title: "",
    description: "",
    releaseDate: "", // ISO string
    selectedActors: [],
    selectedGenres: [],
    selectedTags: [],
    video: [],
    images: []
  });

  const cateName=["selectedActors","selectedGenres","selectedTags"];
  const handleChange = (values, propName) => {
    setMovieData((prev) => ({
      ...prev,
      [propName]: values
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(movieData);
    if(!confirm("Xác nhận tạo phim ?")) return;
    const formData = createFormData(movieData, videoFile, imageFiles);
    try {
      const response = await MovieApi.create(formData);
      console.log("Movie created:", response);
      alert(response.message);
    } catch (error) {
      console.error("Error creating movie:", error);
    }
  };

  return (
    <main className="flex flex-col max-w-full">
      <Typography variant="h4" component="h1" gutterBottom>
        Thêm Phim Mới
      </Typography>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-96">
        <TextField
          label="Tên phim"
          variant="outlined"
          name="title"
          value={movieData.title}
          onChange={(event) =>
            handleChange(event.target.value, event.target.name)
          }
          required
        />
        <TextField
          label="Mô tả"
          variant="outlined"
          name="description"
          value={movieData.description}
          onChange={(event) =>
            handleChange(event.target.value, event.target.name)
          }
          multiline
          rows={4}
        />
        <CustomAutoComplete
          serviceType={ActorApi}
          inputs={actorInput}
          ids={movieData[cateName[0]]}
          onChange={(v) => handleChange(v, cateName[0])}
          label="Diễn viên"
        />
        <CustomAutoComplete
          serviceType={GenreApi}
          name="selectedGenres"
          inputs={genreInput}
          ids={movieData[cateName[1]]}
          onChange={(v) => handleChange(v, cateName[1])}
          label="Thể loại"
        />
        <CustomAutoComplete
          serviceType={TagApi}
          name="selectedTags"
          ids={movieData[cateName[2]]}
          onChange={(v) => handleChange(v, cateName[2])}
          inputs={tagInput}
          label="Tag"
        />
        <CustomDatePicker
          date={movieData.releaseDate}
          onChange={handleChange}
          name="releaseDate"
          label={"Ngày phát hành"}
        />
        Video
        <Dropzone
          value={movieData["video"]}
          onChange={(value) => handleChange(value, "video")}
          name={"video"}
          fileType="video"
          maxFiles={1}
          label={"Video"}
        />
        Hình ảnh
        <Dropzone
          value={movieData["images"]}
          onChange={(value) => handleChange(value, "images")}
          fileType="image"
          name={"images"}
          maxFiles={5}
          label={"Hình ảnh"}
        />
        <Button type="submit" variant="contained" color="primary">
          Thêm Phim
        </Button>
      </form>
    </main>
  );
}
