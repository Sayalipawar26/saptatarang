import React from "react";
import {
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";

export default function Hero() {
  return (
    <Box
      id="home"
      sx={{
        position: "relative",
        minHeight: "100vh",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1920&q=80')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#000",
        backgroundAttachment: { xs: "scroll", md: "fixed" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "#fff",
        px: { xs: "1rem", sm: "2rem", md: "4rem" },
        py: { xs: "4rem", sm: "6rem", md: "8rem" },
        overflow: "hidden",
      }}
    >
      {/* ✨ Overlay for better readability */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(to bottom right, rgba(0,0,0,0.65), rgba(0,0,0,0.3))",
          zIndex: 1,
        }}
      />

      <Container
        maxWidth="lg"
        sx={{ position: "relative", zIndex: 2, textAlign: "center" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3.2rem" },
              textShadow: "0 4px 15px rgba(0,0,0,0.6)",
              mb: "1rem",
            }}
          >
            Preserving Legacy, Embracing the Future
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
        >
          <Typography
            sx={{
              mx: "auto",
              maxWidth: "50rem",
              fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" },
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.95)",
              px: { xs: "1rem", sm: "2rem" },
            }}
          >
            A cherished residential community comprising 93 proud homeowner
            members — Sapta Tarang is a green, serene refuge in Andheri West
            with a legacy of over five decades.
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
        >
          <Box
            sx={{
              mt: "2rem",
              display: "flex",
              gap: { xs: "1rem", sm: "1.5rem" },
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              component={ScrollLink}
              to="about"
              smooth
              duration={650}
              offset={-80}
              variant="contained"
              sx={{
                backgroundColor: "#fff",
                color: "#274827",
                borderRadius: "2rem",
                px: "1.5rem",
                py: "0.6rem",
                fontWeight: 700,
                fontSize: "1rem",
                "&:hover": { backgroundColor: "#e4e4e4" },
              }}
            >
              Learn More
            </Button>

            <Button
              component={ScrollLink}
              to="contact"
              smooth
              duration={650}
              offset={-80}
              variant="outlined"
              sx={{
                borderColor: "#fff",
                color: "#fff",
                borderRadius: "2rem",
                px: "1.5rem",
                py: "0.6rem",
                fontSize: "1rem",
                "&:hover": {
                  borderColor: "#e4e4e4",
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              Contact
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}