import React from "react";
import {
  Typography,
  Box,
  Container,
} from "@mui/material";
import about from "../../images/about.jpg";

export default function About() {
  return (
    <Box
      id="about"
      sx={{
        bgcolor: "#eeedecff", // Light orange/beige background
        py: { xs: 8, md: 12 },
        px: { xs: 2, md: 6 },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: { xs: 4, md: 8 },
        }}
      >
        <Box
          component="img"
          src={about}
          alt="Sapta Tarang"
          sx={{
            width: { xs: "100%", md: "45%" },
            borderRadius: "1.2rem",
            objectFit: "cover",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          }}
        />
        <Box sx={{ maxWidth: { xs: "100%", md: "50%" } }}>
          <Typography
            variant="h3"
            sx={{
              color: "#1b1b1bff", // Dark gray for heading
              fontWeight: 800,
              mb: 3,
              textAlign: { xs: "center", md: "left" },
              fontSize: { xs: "1.8rem", md: "2.4rem" },
            }}
          >
            About Sapta Tarang
          </Typography>
          <Typography
            sx={{
              fontSize: "1.05rem",
              lineHeight: 1.7,
              color: "#121111ff", // Keeping the orange text
              mb: 2,
            }}
          >
            Nestled in the heart of Andheri West, C.D. Barfiwalla Road,
            Sapta Tarang Cooperative Housing Society Limited is a cherished
            residential community comprising 93 proud homeowner members.
          </Typography>
          <Typography
            sx={{
              fontSize: "1.05rem",
              lineHeight: 1.7,
              color: "#121111ff", // Dark gray for text
            }}
          >
            With a legacy of over five decades, Sapta Tarang stands as a symbol
            of harmony, serenity, and resilience.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
