import React from "react";
import {
  Typography,
  Box,
  Container,
  Grid,
  Card,
  Avatar,
} from "@mui/material";

export default function OurTeam() {
  return (
    <Box
      id="team"
      sx={{
        py: { xs: 6, md: 10 },
        px: { xs: 2, sm: 4, md: 8 },
        background:
          "linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 50%, #FFF3E0 100%)", // Light orange/beige gradient
      }}
    >
      <Container maxWidth="lg">
        {/* Title */}
        <Typography
          variant="h3"
          sx={{
            color: "#424242", // Dark gray
            fontWeight: 800,
            textAlign: "center",
            mb: { xs: 1.5, md: 2 },
            textTransform: "uppercase",
            letterSpacing: "0.08rem",
            fontSize: { xs: "1.6rem", sm: "1.9rem", md: "2.4rem" },
            fontFamily: "Poppins, sans-serif",
          }}
        >
          Meet Our Managing Committee
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            color: "#757575", // Gray
            maxWidth: "48rem",
            mx: "auto",
            mb: { xs: 4, md: 6 },
            fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.1rem" },
            lineHeight: 1.7,
            fontFamily: "Poppins, sans-serif",
            px: { xs: 2, md: 0 },
          }}
        >
          Our affairs — from daily operations to redevelopment planning — are
          guided by a dedicated team of residents elected to the Managing
          Committee. The committee stands united in ensuring transparency,
          community well-being, and a balanced vision for redevelopment.
        </Typography>

        {/* Chairman Card */}
        <Grid container justifyContent="center" sx={{ mb: { xs: 6, md: 8 } }}>
          <Grid item xs={12} sm={8} md={4}>
            <Card
              sx={{
                p: { xs: 3, md: 4 },
                textAlign: "center",
                borderRadius: "1.2rem",
                background: "#ffffff",
                boxShadow: "0 6px 22px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-0.4rem)",
                  boxShadow: "0 10px 28px rgba(0,0,0,0.12)",
                },
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "#FFF3E0", // Light orange
                  color: "#FF6F00", // Orange
                  width: { xs: 4.5, sm: 5, md: 5.5 } + "rem",
                  height: { xs: 4.5, sm: 5, md: 5.5 } + "rem",
                  fontSize: { xs: "1.4rem", sm: "1.6rem", md: "1.8rem" },
                  mx: "auto",
                  mb: 2,
                  fontWeight: 700,
                  border: "2px solid #FF6F00", // Orange border
                }}
              >
                H
              </Avatar>
              <Typography
                sx={{
                  fontWeight: 700,
                  color: "#424242", // Dark gray
                  fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Mr. Hitesh Seth
              </Typography>
              <Typography
                sx={{
                  color: "#FF6F00", // Orange
                  fontWeight: 600,
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                  mt: 0.5,
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Chairman
              </Typography>
            </Card>
          </Grid>
        </Grid>

        {/* Other Members */}
        <Grid
          container
          spacing={{ xs: 3, sm: 4, md: 5 }}
          justifyContent="center"
          sx={{
            textAlign: "center",
          }}
        >
          {[
            { name: "Mr. Mayur Dedhia", role: "Secretary" },
            { name: "Mr. Premal Mehta", role: "Treasurer" },
            { name: "Mr. Surajj Bhagchandka", role: "Committee Member" },
            { name: "Mrs. Bhakti Mistry", role: "Committee Member" },
            { name: "Mrs. Putul Bhagchandka", role: "Committee Member" },
            { name: "Mr. Sanjay Singh", role: "Committee Member" },
          ].map((member, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Card
                sx={{
                  py: { xs: 2.5, md: 3 },
                  px: { xs: 3, md: 4 },
                  borderRadius: "1rem",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-0.3rem)",
                    boxShadow: "0 8px 18px rgba(0,0,0,0.12)",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "#424242", // Dark gray
                    fontSize: { xs: "0.95rem", sm: "1rem", md: "1.05rem" },
                    mb: 0.5,
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {member.name}
                </Typography>
                <Typography
                  sx={{
                    color: "#757575", // Gray
                    fontSize: {
                      xs: "0.85rem",
                      sm: "0.9rem",
                      md: "0.95rem",
                    },
                    opacity: 0.9,
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {member.role}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
