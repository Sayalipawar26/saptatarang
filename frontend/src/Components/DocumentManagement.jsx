import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import api from '../api';

const DocumentManagement = () => {
  const [documents, setDocuments] = useState([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('General');
  const [searchName, setSearchName] = useState('');
  const [searchCategory, setSearchCategory] = useState('All');
  const [searchDate, setSearchDate] = useState('');
  const [error, setError] = useState('');

  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserRole(user.role);
    }
    fetchDocuments();
  }, []);

  const categories = [
    'General',
    'Notice',
    'Minutes',
    'Invoices',
    'Maintenance',
    'Legal',
    'Redevelopment',
  ];

  const fetchDocuments = async () => {
    try {
      const { data } = await api.get('/docs');
      setDocuments(data);
      setError('');
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to load documents';
      setError(msg);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!title.trim()) {
      setError('Please enter a title before uploading.');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title.trim());
      formData.append('category', category);
      await api.post('/docs', formData);
      setTitle('');
      setCategory('General');
      setError('');
      fetchDocuments();
    } catch (err) {
      const msg = err?.response?.data?.message || 'Upload failed';
      setError(msg);
    }
  };

  const handleDeleteDocument = async (id) => {
    try {
      await api.delete(`/docs/${id}`);
      fetchDocuments();
    } catch (err) {
      const msg = err?.response?.data?.message || 'Delete failed';
      setError(msg);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ 
        mb: 4, 
        p: 3, 
        backgroundColor: '#f8f9fa', 
        borderRadius: 2,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2,
        flexWrap: 'wrap'
      }}>
        <Typography variant="h6" sx={{ color: '#1f5538', fontWeight: 'bold' }}>
          Document Management
        </Typography>
        {userRole === 'admin' && (
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              size="small"
            />
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel>Category</InputLabel>
              <Select
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((c) => (
                  <MenuItem key={c} value={c}>{c}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button 
              variant="contained" 
              component="label"
              sx={{ 
                backgroundColor: '#D32F2F',
                '&:hover': { backgroundColor: '#E57373' }
              }}
            >
              Upload New Document
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
          </Box>
        )}
      </Box>
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
      {error && (
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ color: '#d32f2f' }}>{error}</Typography>
        </Box>
      )}

      {(() => {
        const filteredDocuments = documents.filter((doc) => {
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
        });
        return (
          <TableContainer component={Paper} sx={{ mt: 4, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <Table>
              <TableHead sx={{ backgroundColor: '#D32F2F' }}>
                <TableRow>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Title</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Category</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredDocuments.map((doc) => (
                  <TableRow key={doc._id} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                    <TableCell sx={{ fontWeight: 500 }}>
                      <a href={`https://api.saptatarang.com${doc.fileUrl}`} target="_blank" rel="noopener noreferrer">
                        {doc.title}
                      </a>
                    </TableCell>
                    <TableCell>{doc.category || 'General'}</TableCell>
                    <TableCell>{new Date(doc.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Button 
                        variant="outlined" 
                        href={`https://api.saptatarang.com${doc.fileUrl}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        sx={{ mr: 1 }}
                      >
                        View
                      </Button>
                      {userRole === 'admin' && (
                        <IconButton 
                          onClick={() => handleDeleteDocument(doc._id)}
                          sx={{ color: '#d32f2f', '&:hover': { backgroundColor: '#ffebee' } }}
                        >
                          <Delete />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        );
      })()}
    </Box>
  );
};

export default DocumentManagement;
