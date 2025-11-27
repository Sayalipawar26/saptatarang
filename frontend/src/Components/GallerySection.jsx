import React, { useState } from "react";
import {
  Box,
  Dialog,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Slider from "react-slick";
import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import gallery1 from "../images/gallery1.jpeg";
import gallery2 from "../images/gallery2.jpeg";
import gallery3 from "../images/gallery3.jpeg";
import gallery4 from "../images/gallery4.jpeg";
import gallery5 from "../images/gallery5.jpeg";
import gallery6 from "../images/gallery6.jpeg";
import gallery7 from "../images/gallery7.jpeg";
import gallery8 from "../images/gallery8.jpeg";

const images = [
  { src: gallery1 },
  { src: gallery2 },
  { src: gallery3 },
  { src: gallery4 },
  { src: gallery5 },
  { src: gallery6 },
  { src: gallery7 },
  { src: gallery8 },
];

const GallerySection = () => {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleOpen = (index) => {
    setSelectedIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedIndex(null);
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <Box
      id="gallery"
      sx={{
        py: { xs: 6, md: 8 },
        px: { xs: 2, sm: 4, md: 8 },
        textAlign: "center",
        bgcolor: "#f8faf8",
        backgroundImage:
          "linear-gradient(to bottom right, #f0fff4 10%, #e6f4ea 90%)",
        overflowX: "hidden", // ✅ prevents horizontal scroll on mobile
      }}
    >
      {/* Title */}
      <Box
        sx={{
          display: "inline-block",
          position: "relative",
          mb: 5,
          "&::after": {
            content: '""',
            position: "absolute",
            left: 0,
            bottom: "-0.4rem",
            width: "100%",
            height: "0.25rem",
            bgcolor: "#607069ff",
            borderRadius: "1rem",
          },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "1.8rem", md: "2.4rem" },
            background: "linear-gradient(90deg, #0d231aff, #373e3bff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "0.05rem",
          }}
        >
          Our Gallery
        </Typography>
      </Box>

      <Typography
        sx={{
          color: "text.secondary",
          maxWidth: "700px",
          mx: "auto",
          mb: 4,
          fontSize: "1.05rem",
        }}
      >
        Explore some glimpses of Sapta Tarang — where togetherness, celebration,
        and community thrive.
      </Typography>

      {/* Slider */}
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          width: "100%",
          "& .slick-list": {
            overflow: "hidden",
          },
          "& .slick-slide": {
            px: { xs: 1, sm: 2, md: 3 },
            boxSizing: "border-box",
          },
          "& .slick-dots": {
            bottom: "-5px",
          },
          "& .slick-dots li button:before": {
            color: "#2d6a4f",
            fontSize: "10px",
          },
        }}
      >
        <Slider {...sliderSettings}>
          {images.map((img, i) => (
            <Box key={i}>
              <Box
                component="img"
                src={img.src}
                alt={`Gallery ${i + 1}`}
                onClick={() => handleOpen(i)}
                sx={{
                  width: "100%",
                  height: { xs: 180, sm: 240, md: 280 },
                  borderRadius: "14px",
                  objectFit: "cover",
                  cursor: "pointer",
                  border: "2px solid #fff",
                  boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: "0 8px 18px rgba(0,0,0,0.25)",
                  },
                }}
              />
            </Box>
          ))}
        </Slider>
      </Box>

      {/* Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen
        PaperProps={{
          sx: {
            backgroundColor: "rgba(0,0,0,0.95)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            color: "white",
            zIndex: 10,
          }}
        >
          <CloseIcon sx={{ fontSize: "2rem" }} />
        </IconButton>

        <AnimatePresence>
          {selectedIndex !== null && (
            <motion.div
              {...handlers}
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                padding: "1rem",
              }}
            >
              {/* Prev Button */}
              {!isMobile && (
                <IconButton
                  onClick={handlePrev}
                  sx={{
                    position: "absolute",
                    left: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "white",
                    "&:hover": { transform: "translateY(-50%) scale(1.2)" },
                  }}
                >
                  <ArrowBackIosNewIcon sx={{ fontSize: "2rem" }} />
                </IconButton>
              )}

              {/* Image */}
              <Box
                component="img"
                src={images[selectedIndex].src}
                alt="Selected"
                sx={{
                  width: { xs: "100%", sm: "90%", md: "80%", lg: "70%" }, // ✅ Responsive width
                  height: "auto",
                  maxHeight: { xs: "75vh", md: "80vh" },
                  borderRadius: "12px",
                  objectFit: "contain",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
                }}
              />

              {/* Caption */}
              <Typography
                variant="h6"
                sx={{
                  position: "absolute",
                  bottom: "60px",
                  color: "#ffffff",
                  fontSize: "1.1rem",
                  fontWeight: 400,
                  textAlign: "center",
                  px: 2,
                }}
              >
                {`Photo ${selectedIndex + 1}`}
              </Typography>

              {/* Next Button */}
              {!isMobile && (
                <IconButton
                  onClick={handleNext}
                  sx={{
                    position: "absolute",
                    right: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "white",
                    "&:hover": { transform: "translateY(-50%) scale(1.2)" },
                  }}
                >
                  <ArrowForwardIosIcon sx={{ fontSize: "2rem" }} />
                </IconButton>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </Dialog>
    </Box>
  );
};

export default GallerySection;
