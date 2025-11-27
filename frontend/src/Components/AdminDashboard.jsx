import React, { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Tabs,
  Tab,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MemberManagement from './MemberManagement';
import DocumentManagement from './DocumentManagement';

const AdminDashboard = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <AppBar
        position="static"
        sx={{
          bgcolor: "#FF6F00", // Orange
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        <Toolbar sx={{ px: 3 }}>
          <Typography variant="h5" component="div" sx={{ 
            flexGrow: 1, 
            fontWeight: 'bold',
            letterSpacing: '0.5px',
            color: '#FFFFFF' // White text
          }}>
            Admin Dashboard
          </Typography>
          <Button 
            color="inherit" 
            onClick={handleLogout} 
            sx={{ 
              fontWeight: 'bold',
              border: '1px solid rgba(255,255,255,0.3)',
              px: 2,
              color: '#FFFFFF', // White text
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: '#FFD54F' // Light orange on hover
              }
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ 
          backgroundColor: 'white',
          borderRadius: 3,
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          <Box sx={{ 
            borderBottom: 2, 
            borderColor: '#e0e0e0',
            backgroundColor: '#fafafa'
          }}>
            <Tabs 
              value={value} 
              onChange={handleChange} 
              aria-label="admin dashboard tabs"
              sx={{
                '& .MuiTab-root': {
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  py: 3,
                  color: '#424242', // Dark gray text
                  textTransform: 'none'
                },
                '& .Mui-selected': {
                  color: '#FF6F00 !important', // Orange for selected
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#FF6F00', // Orange indicator
                  height: 3
                }
              }}
            >
              <Tab label="Member Management" />
              <Tab label="Document Management" />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <MemberManagement />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <DocumentManagement />
          </TabPanel>
        </Box>
      </Container>
    </Box>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default AdminDashboard;
