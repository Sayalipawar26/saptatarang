import React from "react";
import {
  Typography,
  Box,
  Container,
  Card,
} from "@mui/material";

export default function Vision() {
  return (
    <Box
      sx={{
        py: { xs: "6rem", md: "8rem" },
        px: { xs: "1.5rem", md: "6rem" },
        backgroundImage:
          "url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1400&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      {/* Overlay for contrast */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          bgcolor: "rgba(20, 50, 20, 0.65)",
          zIndex: 1,
        }}
      />

      <Container
        maxWidth="lg"
        sx={{ position: "relative", zIndex: 2, textAlign: "center" }}
      >
        {/* Title */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.1rem",
            mb: "1.5rem",
            fontSize: { xs: "2rem", md: "2.8rem" },
            fontFamily: "Poppins, sans-serif",
          }}
        >
          Our Vision
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: "1rem", md: "1.2rem" },
            maxWidth: "700px",
            mx: "auto",
            mb: "4rem",
            color: "rgba(255,255,255,0.9)",
            lineHeight: 1.8,
            fontFamily: "Poppins, sans-serif",
          }}
        >
          At Sapta Tarang, we envision a future where tradition and modernity
          coexist — where green spaces, sustainability, and a close-knit
          community create a truly harmonious living environment.
        </Typography>

        {/* Cards Row */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "stretch",
            gap: { xs: "2rem", md: "2.5rem" },
          }}
        >
          {[
            {
              icon: "🌳",
              title: "Preserve Greenery",
              desc: "Protecting every tree and garden space that defines our community’s heart.",
            },
            {
              icon: "🏗️",
              title: "Thoughtful Redevelopment",
              desc: "Building a modern, safe, and sustainable society while respecting our legacy.",
            },
            {
              icon: "🌿",
              title: "Sustainable Living",
              desc: "Encouraging energy efficiency and eco-conscious practices for generations to come.",
            },
          ].map((item, index) => (
            <Card
              key={index}
              sx={{
                flex: "1 1 280px",
                maxWidth: "340px",
                textAlign: "center",
                p: "2rem",
                borderRadius: "1rem",
                backdropFilter: "blur(10px)",
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.25)",
                transition: "transform 0.4s ease, background 0.3s ease",
                "&:hover": {
                  transform: "translateY(-0.5rem)",
                  background: "rgba(255,255,255,0.22)",
                },
              }}
            >
              <Typography sx={{ fontSize: "2.5rem" }}>{item.icon}</Typography>
              <Typography
                sx={{
                  mt: "0.8rem",
                  fontWeight: 700,
                  fontSize: "1.3rem",
                  color: "#fff",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {item.title}
              </Typography>
              <Typography
                sx={{
                  mt: "0.6rem",
                  fontSize: "1.05rem",
                  color: "rgba(255,255,255,0.9)",
                  lineHeight: 1.7,
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {item.desc}
              </Typography>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}