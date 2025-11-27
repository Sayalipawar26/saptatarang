import React from "react";
import {
  Typography,
  Box,
  Container,
} from "@mui/material";

export default function Contact() {
  return (
    <Box
      id="contact"
      sx={{
        position: "relative",
        py: { xs: "6rem", md: "8rem" },
        px: { xs: "1.5rem", md: "6rem" },
        backgroundImage: `
      linear-gradient(rgba(27, 67, 50, 0.75), rgba(27, 67, 50, 0.75)),
      url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80')
    `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <Container maxWidth="lg">
        {/* Title */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            color: "#ffffff",
            mb: "1.5rem",
            textTransform: "uppercase",
            letterSpacing: "0.1rem",
            fontSize: { xs: "2rem", md: "2.8rem" },
            fontFamily: "Poppins, sans-serif",
          }}
        >
          Get in Touch
        </Typography>

        <Typography
          sx={{
            color: "#e6f2e6",
            mb: "4rem",
            fontSize: { xs: "1rem", md: "1.2rem" },
            lineHeight: 1.8,
            fontFamily: "Poppins, sans-serif",
            maxWidth: "700px",
            mx: "auto",
          }}
        >
          For updates, redevelopment news, or to get in touch with the
          Managing Committee, please reach out using the details below.
        </Typography>

        {/* Contact Info */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
            alignItems: "stretch",
            textAlign: "center",
            gap: { xs: "3rem", md: "2rem" },
            fontFamily: "Poppins, sans-serif",
          }}
        >
          {/* Address */}
          <Box sx={{ flex: 1, px: "1.5rem" }}>
            <Typography sx={{ fontSize: "2.5rem", mb: "0.5rem" }}>
              📍
            </Typography>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "1.3rem",
                mb: "0.8rem",
                color: "#fff",
              }}
            >
              Address
            </Typography>
            <Typography
              sx={{
                color: "#d9e9d9",
                fontSize: "1.05rem",
                lineHeight: 1.7,
              }}
            >
              The Manager, Society Office,
              <br />
              Roop Darshan A & B,
              <br />
              Andheri West, Mumbai – 400058
            </Typography>
          </Box>

          {/* Glowing Divider */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "center",
              px: "1.5rem",
            }}
          >
            <Box
              sx={{
                height: "6rem",
                width: "0.15rem",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)",
                boxShadow: "0 0 0.6rem rgba(255,255,255,0.4)",
                borderRadius: "1rem",
              }}
            />
          </Box>

          {/* Email */}
          <Box sx={{ flex: 1, px: "1.5rem" }}>
            <Typography sx={{ fontSize: "2.5rem", mb: "0.5rem" }}>
              ✉️
            </Typography>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "1.3rem",
                mb: "0.8rem",
                color: "#fff",
              }}
            >
              Email
            </Typography>
            <Typography sx={{ color: "#d9e9d9", fontSize: "1.05rem" }}>
              info@sapta tarang.com
            </Typography>
          </Box>

          {/* Glowing Divider */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "center",
              px: "1.5rem",
            }}
          >
            <Box
              sx={{
                height: "6rem",
                width: "0.15rem",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)",
                boxShadow: "0 0 0.6rem rgba(255,255,255,0.4)",
                borderRadius: "1rem",
              }}
            />
          </Box>

          {/* Contact */}
          <Box sx={{ flex: 1, px: "1.5rem" }}>
            <Typography sx={{ fontSize: "2.5rem", mb: "0.5rem" }}>
              📞
            </Typography>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "1.3rem",
                mb: "0.8rem",
                color: "#fff",
              }}
            >
              Contact
            </Typography>
            <Typography sx={{ color: "#d9e9d9", fontSize: "1.05rem" }}>
              +91 90000 00000 <br /> (Mon–Sat, 10 AM–6 PM)
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}