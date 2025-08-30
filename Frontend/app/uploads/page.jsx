"use client";
import { TextField, Box, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import MovieApi from "@/services/movie.api";
import ActorApi from "@/services/actor.api";
import GenreApi from "@/services/genre.api";
import TagApi from "@/services/tag.api";
import CustomDatePicker from "@/components/CustomDatePicker";
import CustomAutoComplete from "@/components/CustomAutoComplete";
import { actorConfig, tagConfig, genreConfig } from "@/utils/inputConfig";
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
    images: [],
  });

  const cateName = ["selectedActors", "selectedGenres", "selectedTags"];
  const handleChange = (values, propName) => {
    setMovieData((prev) => ({
      ...prev,
      [propName]: values,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(movieData);
    if (!confirm("Xác nhận tạo phim ?")) return;
    try {
      const response = await MovieApi.create(movieData);
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
          api={ActorApi}
          config={actorConfig}
          value={movieData[cateName[0]]}
          onChange={(v) => handleChange(v, cateName[0])}
          label="Diễn viên"
          optionLabel={"name"}
        />
        <CustomAutoComplete
          api={GenreApi}
          name="selectedGenres"
          config={genreConfig}
          value={movieData[cateName[1]]}
          onChange={(v) => handleChange(v, cateName[1])}
          label="Thể loại"
          optionLabel={"name"}
        />
        <CustomAutoComplete
          api={TagApi}
          name="selectedTags"
          value={movieData[cateName[2]]}
          onChange={(v) => handleChange(v, cateName[2])}
          config={tagConfig}
          label="Tag"
          optionLabel={"name"}
        />
        <CustomDatePicker
          value={movieData.releaseDate}
          onChange={(v) => handleChange(v, "releaseDate")}
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
