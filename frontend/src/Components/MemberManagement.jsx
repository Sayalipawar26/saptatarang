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
  Modal,
  Backdrop,
  Fade,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import api from '../api';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const MemberManagement = () => {
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState({ 
    firstName: '', 
    lastName: '', 
    email: '', 
    password: '', 
    wing: '', 
    flatNo: '', 
    mobileNumber: '' 
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const handleOpen = (member) => {
    setSelectedMember(member);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMember(null);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const { data } = await api.get('https://api.saptatarang.com/api/members');
      setMembers(data);
      setError('');
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to load members';
      setError(msg);
    }
  };

  const handleAddMember = async () => {
    const { firstName, lastName, email, password, wing, flatNo, mobileNumber } = newMember;
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim() || !wing.trim() || !flatNo.trim() || !mobileNumber.trim()) {
      setError('All fields are required.');
      return;
    }
    try {
      await api.post('https://api.saptatarang.com/api/members', { 
        firstName: firstName.trim(), 
        lastName: lastName.trim(), 
        email: email.trim(), 
        password: password.trim(), 
        wing: wing.trim(), 
        flatNo: flatNo.trim(), 
        mobileNumber: mobileNumber.trim() 
      });
      setSuccess('Member added successfully');
      setError('');
      setNewMember({ 
        firstName: '', 
        lastName: '', 
        email: '', 
        password: '', 
        wing: '', 
        flatNo: '', 
        mobileNumber: '' 
      });
      fetchMembers();
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to add member';
      setError(msg);
      setSuccess('');
    }
  };

  const handleDeleteMember = async (id) => {
    try {
      await api.delete(`https://api.saptatarang.com/api/members/${id}`);
      setSuccess('Member deleted successfully');
      setError('');
      fetchMembers();
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to delete member';
      setError(msg);
      setSuccess('');
    }
  };

  const handleUpdateMember = async () => {
    try {
      await api.put(`https://api.saptatarang.com/api/members/${selectedMember._id}`, { 
        firstName: selectedMember.firstName, 
        lastName: selectedMember.lastName, 
        email: selectedMember.email,
        wing: selectedMember.wing,
        flatNo: selectedMember.flatNo,
        mobileNumber: selectedMember.mobileNumber
      });
      setSuccess('Member updated successfully');
      setError('');
      handleClose();
      fetchMembers();
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to update member';
      setError(msg);
      setSuccess('');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {error && (
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ color: '#d32f2f' }}>{error}</Typography>
        </Box>
      )}
      {success && (
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ color: '#D32F2F' }}>{success}</Typography>
        </Box>
      )}
      <Box sx={{ 
        mb: 4, 
        p: 3, 
        backgroundColor: '#f8f9fa', 
        borderRadius: 2,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <Typography variant="h6" sx={{ mb: 3, color: '#D32F2F', fontWeight: 'bold' }}>
          Add New Member
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField
            label="First Name"
            value={newMember.firstName}
            onChange={(e) => setNewMember({ ...newMember, firstName: e.target.value })}
            sx={{ minWidth: 150 }}
            size="small"
          />
          <TextField
            label="Last Name"
            value={newMember.lastName}
            onChange={(e) => setNewMember({ ...newMember, lastName: e.target.value })}
            sx={{ minWidth: 150 }}
            size="small"
          />
          <TextField
            label="Email"
            value={newMember.email}
            onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
            sx={{ minWidth: 200 }}
            size="small"
          />
          <TextField
            label="Password"
            type="password"
            value={newMember.password}
            onChange={(e) => setNewMember({ ...newMember, password: e.target.value })}
            sx={{ minWidth: 180 }}
            size="small"
          />
          <TextField
            label="Wing"
            value={newMember.wing}
            onChange={(e) => setNewMember({ ...newMember, wing: e.target.value })}
            sx={{ minWidth: 100 }}
            size="small"
          />
          <TextField
            label="Flat No"
            value={newMember.flatNo}
            onChange={(e) => setNewMember({ ...newMember, flatNo: e.target.value })}
            sx={{ minWidth: 100 }}
            size="small"
          />
          <TextField
            label="Mobile Number"
            value={newMember.mobileNumber}
            onChange={(e) => setNewMember({ ...newMember, mobileNumber: e.target.value })}
            sx={{ minWidth: 150 }}
            size="small"
          />
          <Button 
            variant="contained" 
            onClick={handleAddMember}
            sx={{ 
              backgroundColor: '#D32F2F',
              '&:hover': { backgroundColor: '#E57373' },
              height: 40
            }}
          >
            Add Member
          </Button>
        </Box>
      </Box>
      
      <TableContainer component={Paper} sx={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#D32F2F' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>First Name</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Last Name</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Wing</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Flat No</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Mobile</TableCell>
              {/* <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell> */}
              <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member._id} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                <TableCell sx={{ fontWeight: 500 }}>{member.firstName}</TableCell>
                <TableCell sx={{ fontWeight: 500 }}>{member.lastName}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.wing}</TableCell>
                <TableCell>{member.flatNo}</TableCell>
                <TableCell>{member.mobileNumber}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <IconButton onClick={() => handleOpen(member)} sx={{ color: '#D32F2F', '&:hover': { backgroundColor: '#FFEBEE' } }}>
                    <Edit />
                  </IconButton>
                  <IconButton 
                    onClick={() => handleDeleteMember(member._id)}
                    sx={{ color: '#d32f2f', '&:hover': { backgroundColor: '#ffebee' } }}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedMember && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={modalStyle}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Edit Member
              </Typography>
              <TextField
                label="First Name"
                value={selectedMember.firstName}
                onChange={(e) => setSelectedMember({ ...selectedMember, firstName: e.target.value })}
                fullWidth
                sx={{ mt: 2 }}
              />
              <TextField
                label="Last Name"
                value={selectedMember.lastName}
                onChange={(e) => setSelectedMember({ ...selectedMember, lastName: e.target.value })}
                fullWidth
                sx={{ mt: 2 }}
              />
              <TextField
                label="Email"
                value={selectedMember.email}
                onChange={(e) => setSelectedMember({ ...selectedMember, email: e.target.value })}
                fullWidth
                sx={{ mt: 2 }}
              />
              <TextField
                label="Wing"
                value={selectedMember.wing}
                onChange={(e) => setSelectedMember({ ...selectedMember, wing: e.target.value })}
                fullWidth
                sx={{ mt: 2 }}
              />
              <TextField
                label="Flat No"
                value={selectedMember.flatNo}
                onChange={(e) => setSelectedMember({ ...selectedMember, flatNo: e.target.value })}
                fullWidth
                sx={{ mt: 2 }}
              />
              <TextField
                label="Mobile Number"
                value={selectedMember.mobileNumber}
                onChange={(e) => setSelectedMember({ ...selectedMember, mobileNumber: e.target.value })}
                fullWidth
                sx={{ mt: 2 }}
              />
              <Button onClick={handleUpdateMember} sx={{ mt: 2 }}>Update</Button>
            </Box>
          </Fade>
        </Modal>
      )}
    </Box>
  );
};

export default MemberManagement;
