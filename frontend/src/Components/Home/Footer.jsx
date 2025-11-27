import React from "react";
import {
  Typography,
  Box,
} from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{ py: 3, textAlign: "center", bgcolor: "#0a0b0aff", color: "#fff" }}
    >
      <Typography variant="body2" sx={{ fontSize: "0.9rem" }}>
        © {new Date().getFullYear()} Sapta Tarang Co-operative Housing Society
        | All Rights Reserved
      </Typography>
    </Box>
  );
}