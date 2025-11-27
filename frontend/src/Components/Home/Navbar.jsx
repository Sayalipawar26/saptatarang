import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";

export default function Navbar() {
  const [elevated, setElevated] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const sections = [
    { label: "Home", to: "home" },
    { label: "About", to: "about" },
    { label: "Our Team", to: "team" },
    { label: "Contact", to: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setElevated(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={elevated ? 3 : 0}
        sx={{
          bgcolor: elevated ? "rgba(255,255,255,0.96)" : "transparent",
          color: "#FF6F00",
          borderBottom: elevated ? "1px solid #e9ecef" : "none",
          backdropFilter: elevated ? "blur(6px)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <Toolbar
          sx={{
            px: { xs: 2, md: 6 },
            py: { xs: 1, md: 1.3 },
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {/* LOGO */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: "#FF6F00",
              fontSize: { xs: "1.4rem", sm: "1.6rem", md: "1.8rem" },
              letterSpacing: "0.05rem",
            }}
          >
            SAPTA TARANG
            <Typography
              variant="body2"
              sx={{
                display: { xs: "none", sm: "block" },
                color: "#FF6F00",
                fontSize: "0.9rem",
                fontWeight: 400,
              }}
            >
              Co-operative Housing Society
            </Typography>
          </Typography>

          {/* DESKTOP NAV (Centered) */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flexGrow: 1,
              justifyContent: "center",
              gap: "2rem",
            }}
          >
            {sections.map((s) => (
              <Button
                key={s.to}
                component={ScrollLink}
                to={s.to}
                smooth
                duration={650}
                offset={-80}
                sx={{
                  color: "#0a0909ff",
                  fontWeight: 600,
                  fontSize: "1rem",
                  textTransform: "none",
                  "&:hover": { color: "#FF6F00" },
                }}
              >
                {s.label}
              </Button>
            ))}
          </Box>

          {/* LOGIN BUTTON (Desktop only) */}
          <Button
            component={RouterLink}
            to="/login"
            variant="contained"
            sx={{
              background: "linear-gradient(90deg,#FF6F00,#FFD54F)",
              color: "#fff",
              borderRadius: "2rem",
              px: "1.5rem",
              py: "0.6rem",
              fontWeight: 700,
              textTransform: "none",
              fontSize: "1rem",
              display: { xs: "none", md: "flex" },
              "&:hover": {
                background: "linear-gradient(90deg,#FF8A65,#FFE082)",
              },
            }}
          >
            Member Login
          </Button>

          {/* MOBILE MENU BUTTON */}
          <IconButton
            sx={{ display: { xs: "flex", md: "none" }, color: "#FF6F00" }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* MOBILE DRAWER */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            width: "75%",
            bgcolor: "#fafafa",
            color: "#FF6F00",
            p: 2,
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            mb: 2,
            textAlign: "center",
            fontSize: "1.4rem",
          }}
        >
          SAPTA TARANG
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <List>
          {sections.map((s) => (
            <ListItem key={s.to} disablePadding>
              <ListItemButton
                component={ScrollLink}
                to={s.to}
                smooth
                duration={650}
                offset={-80}
                onClick={handleDrawerToggle}
              >
                <ListItemText
                  primary={s.label}
                  primaryTypographyProps={{
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    color: "#0b0b0bff",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        <Button
          component={RouterLink}
          to="/login"
          variant="contained"
          fullWidth
          sx={{
            background: "linear-gradient(90deg,#FF6F00,#FFD54F)",
            color: "#fff",
            borderRadius: "2rem",
            py: "0.7rem",
            fontWeight: 700,
            textTransform: "none",
            fontSize: "1rem",
            "&:hover": {
              background: "linear-gradient(90deg,#FF8A65,#FFE082)",
            },
          }}
        >
          Member Login
        </Button>
      </Drawer>
    </>
  );
}
