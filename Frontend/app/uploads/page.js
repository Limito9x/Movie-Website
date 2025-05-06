"use client";
import { TextField, Box, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import MovieApi from "@/services/movie.api";
import ActorApi from "@/services/actor.api";
import GenreApi from "@/services/genre.api";
import TagApi from "@/services/tag.api";
import { createFormData, handleInputChange } from "@/utils/formUtils";
import CustomDatePicker from "@/components/CustomDatePicker";
import CustomAutoComplete from "@/components/CustomAutoComplete";
import { genreInput, tagInput } from "@/utils/inputConfig";

export default function Uploads() {
  const [movieData, setMovieData] = useState({
    title: "",
    description: "",
    releaseDate: "", // ISO string
    selectedActors: [],
    selectedGenres: [],
    selectedTags: [],
  });

  const [videoFile, setVideoFile] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);

  const handleChange = (event, values, propName) => {
    handleInputChange(setMovieData, event, values, propName);
  };

  useEffect(() => {
    console.log("Thông tin phim:", movieData);
  }, [movieData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
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
    <main style={{ padding: "20px" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Thêm Phim Mới
      </Typography>
      <form autoComplete="off" className="mt-3" onSubmit={handleSubmit}>
        <Box className="flex flex-col gap-3" maxWidth="500px">
          <TextField
            label="Tên phim"
            variant="outlined"
            name="title"
            value={movieData.title}
            onChange={handleChange}
            required
          />
          <TextField
            label="Mô tả"
            variant="outlined"
            name="description"
            value={movieData.description}
            onChange={handleChange}
            multiline
            rows={4}
          />
          <CustomAutoComplete
            serviceType={ActorApi}
            name="selectedActors"
            handleChange={handleChange}
            label="Diễn viên"
          />
          <CustomAutoComplete
            serviceType={GenreApi}
            name="selectedGenres"
            inputs={genreInput}
            handleChange={handleChange}
            label="Thể loại"
          />
          <CustomAutoComplete
            serviceType={TagApi}
            name="selectedTags"
            handleChange={handleChange}
            inputs={tagInput}
            label="Tag"
          />
          <CustomDatePicker
            date={movieData.releaseDate}
            setDate={(newDate) =>
              setMovieData((prev) => ({ ...prev, releaseDate: newDate }))
            }
            label={"Ngày phát hành"}
          />
          Video
          <input
            type="file"
            name="video"
            accept="video/*"
            onChange={(event) => {
              setVideoFile(event.target.files[0]);
            }}
          ></input>
          Hình ảnh
          <input
            type="file"
            name="images"
            multiple
            accept="image/*"
            onChange={(event) => {
              setImageFiles([...event.target.files]);
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
