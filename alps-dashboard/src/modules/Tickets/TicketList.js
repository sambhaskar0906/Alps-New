import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Box,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Stack,
  TextField,
  InputAdornment,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import { getAllTickets } from "../../features/ticket/ticketSlice";
import { useSelector, useDispatch } from "react-redux";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


const getStatusColor = (status) => {
  switch (status) {
    case 'open': return 'error';
    case 'pending': return 'warning';
    case 'resolved': return 'success';
    default: return 'default';
  }
};

const TicketList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const { tickets, loading, error } = useSelector((state) => state.ticket);
  useEffect(() => {
    dispatch(getAllTickets());
  }, [dispatch]);
  const filteredTickets = tickets.filter(ticket =>
    ticket.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMenuOpen = (event, ticket) => {
    setAnchorEl(event.currentTarget);
    setSelectedTicket(ticket);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTicket(null);
  };
  const handleStatusChange = (status) => {
    if (selectedTicket) {
      // Dispatch action to update ticket status here
      // dispatch(updateTicketStatus({ id: selectedTicket.ticket_id, status }));
      console.log('Update:', selectedTicket.ticket_id, 'to', status);
    }
    handleMenuClose();
  };

  return (
    <Paper elevation={6} sx={{ p: 4, mt: 4, borderRadius: 4 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" mb={3} gap={2}>
        <Typography variant="h5" fontWeight="bold" color="primary.main">
          🎫 Ticket List
        </Typography>
        <TextField
          size="small"
          placeholder="Search tickets..."
          variant="outlined"
          sx={{ minWidth: 250 }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          href="/tickets/new"
          sx={{
            textTransform: 'none',
            background: 'linear-gradient(to right, #1976d2, #42a5f5)',
            '&:hover': {
              background: 'linear-gradient(to right, #1565c0, #2196f3)',
            },
          }}
        >
          New Ticket
        </Button>
      </Box>

      {/* Table */}
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 650, borderCollapse: 'separate', borderSpacing: '0 8px' }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Subject</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTickets.map((ticket) => (
              <TableRow
                key={ticket.id}
                sx={{
                  backgroundColor: '#fff',
                  '&:hover': {
                    backgroundColor: '#e3f2fd',
                    transform: 'scale(1.01)',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                  },
                }}
              >
                <TableCell>{ticket.ticket_id}</TableCell>
                <TableCell>{ticket.projectId}</TableCell>
                <TableCell>{ticket.subject}</TableCell>
                <TableCell>
                  <Chip
                    label={ticket.status}
                    color={getStatusColor(ticket.status)}
                    size="small"
                    sx={{ textTransform: 'capitalize' }}
                  />
                </TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<VisibilityIcon />}
                      href={`/tickets/${ticket.ticket_id}`}
                      sx={{
                        textTransform: 'none',
                        borderColor: '#43a047',
                        color: '#43a047',
                        '&:hover': {
                          backgroundColor: '#e8f5e9',
                          borderColor: '#2e7d32',
                        },
                      }}
                    >
                      View
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<EditIcon />}
                      href={`/tickets/edit/${ticket.ticket_id}`}
                      sx={{
                        textTransform: 'none',
                        borderColor: '#1976d2',
                        color: '#1976d2',
                        '&:hover': {
                          backgroundColor: '#e3f2fd',
                          borderColor: '#1565c0',
                        },
                      }}
                    >
                      Edit
                    </Button>
                    <IconButton onClick={(e) => handleMenuOpen(e, ticket)}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      {['open', 'pending', 'resolved'].map((status) => (
                        <MenuItem key={status} onClick={() => handleStatusChange(status)}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Stack>
                </TableCell>

              </TableRow>
            ))}
            {filteredTickets.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ fontStyle: 'italic', py: 3 }}>
                  No tickets match your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
};

export default TicketList;
