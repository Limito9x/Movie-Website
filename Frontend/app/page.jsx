"use client";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default function Home() {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "fit-content",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Typography variant="h3" gutterBottom sx={{ p: 2 }} textAlign={"center"}>
        Welcome to Movie Web
      </Typography>
      <Image
        src="/HomeBackground2.webp"
        alt="Background"
        width={1920}
        height={1080}
      />
    </Box>
  );
}
