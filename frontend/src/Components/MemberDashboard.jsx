import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  AppBar,
  Toolbar,
  Button,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Description, Close } from "@mui/icons-material";
import { Document, Page, pdfjs } from "react-pdf";
import { useMediaQuery } from '@mui/material';

// Import styles for annotations and text layer
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// 🟢 Use local worker (no CDN)
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const MemberDashboard = () => {
  const [user, setUser] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [searchCategory, setSearchCategory] = useState("All");
  const [searchDate, setSearchDate] = useState("");

  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    fetchDocuments();
  }, [navigate]);

  const categories = [
    "General",
    "Notice",
    "Minutes",
    "Invoices",
    "Maintenance",
    "Legal",
    "Redevelopment",
  ];

  const fetchDocuments = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get("http://localhost:5000/api/docs", config);
      setDocuments(response.data);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleViewDocument = (doc) => {
    setSelectedDoc(doc);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedDoc(null);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Top App Bar */}
      <AppBar
        position="static"
        sx={{
          bgcolor: "#FF6F00", // Orange
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        <Toolbar sx={{ px: 3 }}>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold", letterSpacing: "0.5px", color: "#FFFFFF" }}
          >
            Member Dashboard
          </Typography>
          <Button
            color="inherit"
            onClick={handleLogout}
            sx={{
              fontWeight: "bold",
              border: "1px solid rgba(255,255,255,0.3)",
              px: 2,
              color: "#FFFFFF",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.1)", color: "#FFD54F" },
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Content */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Welcome Card */}
          <Grid size={12}>
            <Card
              sx={{
                background: "linear-gradient(135deg, #FF6F00, #FFD54F)",
                color: "#000000", // Black text for contrast
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                borderRadius: 3,
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
                  Welcome to Sapta Tarang Housing Society
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                  Hello {user.name}, you are logged in as a {user.role}.
                  Here you can access society documents and information.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Documents Stats */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                backgroundColor: "#ffffff",
                "&:hover": { transform: "translateY(-4px)" },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography color="#FF6F00" gutterBottom sx={{ fontWeight: "bold" }}>
                  Available Documents
                </Typography>
                <Typography variant="h4" sx={{ color: "#424242", fontWeight: "bold" }}>
                  {documents.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Role */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                backgroundColor: "#ffffff",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography color="#FF6F00" gutterBottom sx={{ fontWeight: "bold" }}>
                  Your Role
                </Typography>
                <Chip
                  label={user.role}
                  sx={{
                    fontSize: "1rem",
                    px: 2,
                    py: 1,
                    backgroundColor: "#FF6F00",
                    color: "#FFFFFF",
                    fontWeight: "bold",
                  }}
                />
              </CardContent>
            </Card>
          </Grid>

          {/* Member Since */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                backgroundColor: "#ffffff",
              }}
            >
              {/* <CardContent sx={{ p: 3 }}>
                <Typography color="#FF6F00" gutterBottom sx={{ fontWeight: "bold" }}>
                  Member Since
                </Typography>
                <Typography variant="h5" sx={{ color: "#424242", fontWeight: "bold" }}>
                  {new Date(user.createdAt).toLocaleDateString()}
                </Typography>
              </CardContent> */}
            </Card>
          </Grid>

          {/* Document List */}
          <Grid size={12}>
            <Card sx={{ borderRadius: 3, backgroundColor: "#ffffff" }}>
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ color: "#FF6F00", fontWeight: "bold" }}
                >
                  Society Documents
                </Typography>

                {/* Upload Section removed for members (view-only) */}

                {/* Search Bar */}
                <Box sx={{ mb: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <TextField
                    label="Search by name"
                    size="small"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                  />
                  <FormControl size="small" sx={{ minWidth: 160 }}>
                    <InputLabel>Category</InputLabel>
                    <Select
                      label="Category"
                      value={searchCategory}
                      onChange={(e) => setSearchCategory(e.target.value)}
                    >
                      <MenuItem value="All">All</MenuItem>
                      {categories.map((c) => (
                        <MenuItem key={c} value={c}>{c}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    label="Date"
                    type="date"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                  />
                </Box>

                {/* No error state since uploads are disabled for members */}

                <List sx={{ mt: 2 }}>
                  {documents.filter((doc) => {
                    const matchesName = searchName
                      ? doc.title.toLowerCase().includes(searchName.toLowerCase())
                      : true;
                    const matchesCategory = searchCategory === 'All'
                      ? true
                      : (doc.category || 'General') === searchCategory;
                    const matchesDate = searchDate
                      ? new Date(doc.createdAt).toISOString().slice(0, 10) === searchDate
                      : true;
                    return matchesName && matchesCategory && matchesDate;
                  }).length > 0 ? (
                    documents.filter((doc) => {
                      const matchesName = searchName
                        ? doc.title.toLowerCase().includes(searchName.toLowerCase())
                        : true;
                      const matchesCategory = searchCategory === 'All'
                        ? true
                        : (doc.category || 'General') === searchCategory;
                      const matchesDate = searchDate
                        ? new Date(doc.createdAt).toISOString().slice(0, 10) === searchDate
                        : true;
                      return matchesName && matchesCategory && matchesDate;
                    }).map((doc) => (
                      <ListItem
                        key={doc._id}
                        divider
                        sx={{
                          borderRadius: 2,
                          mb: 1,
                          "&:hover": { backgroundColor: "#FFF3E0" }, // Light orange hover
                        }}
                      >
                        <ListItemIcon sx={{ color: "#FF6F00" }}>
                          <Description />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography
                              variant="h6"
                              sx={{ color: "#424242", fontWeight: 500 }}
                            >
                              {doc.title}
                            </Typography>
                          }
                          secondary={
                            <Typography variant="body2" sx={{ color: "#757575" }}>
                              Category: {doc.category || 'General'} • Uploaded: {new Date(doc.createdAt).toLocaleDateString()}
                            </Typography>
                          }
                        />
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleViewDocument(doc)}
                          sx={{
                            backgroundColor: "#FF6F00",
                            color: "#FFFFFF",
                            "&:hover": { backgroundColor: "#FF8A65" },
                          }}
                        >
                          View Document
                        </Button>
                      </ListItem>
                    ))
                  ) : (
                    <Typography
                      variant="h6"
                      align="center"
                      sx={{ color: "#757575", py: 4 }}
                    >
                      No documents available yet.
                    </Typography>
                  )}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* PDF Modal */}
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="lg" fullWidth fullScreen={isMobile}>
        <DialogTitle sx={{ backgroundColor: "#FF6F00", color: "#FFFFFF" }}>
          {selectedDoc?.title}
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseModal}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ height: "80vh", backgroundColor: "#f5f5f5" }}>
          {selectedDoc && (
            <Box sx={{ display: "flex", justifyContent: "center", p: 2, overflow: "auto" }}>
              <div style={{ maxWidth: "100%", overflowX: "auto" }}>
                <Document
                  file={`http://localhost:5000${selectedDoc.fileUrl}`}
                  onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                >
                  {Array.from(new Array(numPages), (el, index) => (
                    <Page key={`page_${index + 1}`} pageNumber={index + 1} scale={isMobile ? 0.7 : 1} />
                  ))}
                </Document>
              </div>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default MemberDashboard;
