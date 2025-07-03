import React, { useEffect, useState } from 'react';
import {
  Paper, Table, TableHead, TableRow, TableCell, TableBody,
  Button, Typography, Box, TextField, IconButton
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, deleteUser } from '../../features/user/userSlice';

const ClientList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [filteredClients, setFilteredClients] = useState([]);
  const { users, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    const clientList = users
      .filter((u) => u.role === 'Client')
      .filter((u) =>
        u.fullName.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
      );
    setFilteredClients(clientList);
  }, [search, users]);

  const handleDelete = (user_id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      dispatch(deleteUser(user_id))
        .unwrap()
        .then(() => alert('Client deleted successfully'))
        .catch((err) => alert(`Failed to delete client: ${err}`));
    }
  };

  return (
    <Paper elevation={6} sx={{ p: 4, mt: 4, borderRadius: 4, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap">
        <Typography variant="h5" fontWeight="bold" color="primary.main">
          👥 Client List
        </Typography>
        <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
          <TextField
            size="small"
            variant="outlined"
            placeholder="Search clients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton>
                  <SearchIcon />
                </IconButton>
              )
            }}
          />
          <Button
            variant="contained"
            onClick={() => navigate('/clients/add')}
            sx={{
              textTransform: 'none',
              background: 'linear-gradient(to right, #4caf50, #81c784)',
              color: '#fff',
              '&:hover': {
                background: 'linear-gradient(to right, #388e3c, #66bb6a)',
              },
            }}
          >
            ➕ Add Client
          </Button>
        </Box>

      </Box>

      {error && (
        <Typography color="error" align="center" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      {loading && (
        <Typography align="center" sx={{ mb: 2 }}>
          Loading...
        </Typography>
      )}

      <Box sx={{ overflowX: 'auto' }}>
        {filteredClients.length === 0 ? (
          <Typography variant="body1" align="center" sx={{ mt: 4, color: 'gray', fontStyle: 'italic' }}>
            No matching clients found.
          </Typography>
        ) : (
          <Table sx={{ minWidth: 650, borderCollapse: 'separate', borderSpacing: '0 8px' }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f1f1f1' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>User ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow
                  key={client.user_id}
                  sx={{
                    backgroundColor: '#fff',
                    transition: '0.2s',
                    '&:hover': {
                      backgroundColor: '#e3f2fd',
                      transform: 'scale(1.01)',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.05)'
                    }
                  }}
                >
                  <TableCell>{client.user_id}</TableCell>
                  <TableCell>{client.fullName}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell align="center">
                    <Box display="flex" justifyContent="center" gap={1}>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => navigate(`/clients/${client.user_id}`)}
                        startIcon={<VisibilityIcon />}
                        sx={{
                          textTransform: 'none',
                          background: 'linear-gradient(to right, #1976d2, #2196f3)',
                          color: '#fff',
                          '&:hover': {
                            background: 'linear-gradient(to right, #1565c0, #1e88e5)'
                          }
                        }}
                      >
                        View
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => navigate(`/clients/edit/${client.user_id}`)}
                        startIcon={<EditIcon />}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(client.user_id)}
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Box>
    </Paper>
  );
};

export default ClientList;