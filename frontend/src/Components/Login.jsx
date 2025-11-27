import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Container,
  Avatar,
  Grid,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password,
      });

      login(response.data, response.data.token);

      if (response.data.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/member-dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#fbfbfb',
        fontFamily: 'Outfit, sans-serif',
      }}
    >
      <Container maxWidth="xs">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: '#D32F2F',
              fontSize: { xs: '1.8rem', sm: '2rem', md: '2.2rem' },
              letterSpacing: '0.05rem',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/')}
          >
            SAPTA TARANG
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#FFDAB9',
              fontSize: '0.9rem',
              fontWeight: 400,
            }}
          >
            Co-operative Housing Society
          </Typography>
        </Box>

        <Card sx={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)', borderRadius: 2, p: { xs: 2, sm: 3 } }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "#D32F2F" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" sx={{ color: "#D32F2F", mb: 3 }}>
                Member Login
              </Typography>
              
              {error && (
                <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
                  {error}
                </Alert>
              )}
              
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  sx={{ mb: 2 }}
                  disabled={loading}
                />
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  sx={{ mb: 2 }}
                  disabled={loading}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  sx={{
                    py: 1.5,
                    mt: 2,
                    fontWeight: 'bold',
                    bgcolor: '#D32F2F',
                    '&:hover': {
                      bgcolor: '#B71C1C',
                    },
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                </Button>
                <Grid container justifyContent="center" sx={{ mt: 2 }}>
                  <Grid item>
                    <RouterLink to="/" style={{ textDecoration: 'none', color: '#D32F2F' }}>
                      {"← Back to Home"}
                    </RouterLink>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Login;