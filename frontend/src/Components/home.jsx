import React from "react";
import { Box } from "@mui/material";
import Navbar from "./Home/Navbar";
import Hero from "./Home/Hero";
import About from "./Home/About";
import Vision from "./Home/Vision";
import GallerySection from "../Components/GallerySection";
import OurTeam from "./Home/OurTeam";
import Contact from "./Home/Contact";
import Footer from "./Home/Footer";

export default function HomePage() {
  return (
    <Box sx={{ fontFamily: "Outfit, sans-serif", bgcolor: "#fbfbfb" }}>
      <Navbar />
      <Hero />
      <About />
      <Vision />
      <GallerySection />
      <OurTeam />
      <Contact />
      <Footer />
    </Box>
  );
}
