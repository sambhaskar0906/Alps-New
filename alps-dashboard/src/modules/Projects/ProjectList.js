import React, { useState,useEffect } from 'react';
import {
  Paper, Typography, Box, Button, Table, TableHead, TableRow, TableCell, TableBody,
  Select, MenuItem, FormControl, InputLabel, Grid, IconButton
} from '@mui/material';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Chip from '@mui/material/Chip';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { getAllProjects } from '../../features/project/projectSlice';
import {useSelector,useDispatch} from "react-redux";
const allProjects = [
  { id: 1, title: 'Website Redesign', status: 'active', startDate: '2024-03-01', endDate: '2024-05-15', clientId: 1 },
  { id: 2, title: 'CRM Integration', status: 'on-hold', startDate: '2024-04-10', endDate: '2024-07-20', clientId: 2 },
  { id: 3, title: 'Mobile App Launch', status: 'completed', startDate: '2023-10-01', endDate: '2024-01-15', clientId: 3 }
];

const getStatusColor = (status) => {
  switch (status) {
    case 'active': return 'success';
    case 'on-hold': return 'warning';
    case 'completed': return 'default';
    default: return 'default';
  }
};

const ProjectList = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState('startDate');
  const [sortOrder, setSortOrder] = useState('asc');
  const dispatch = useDispatch();
  const { projects, loading, error } = useSelector((state) => state.project);
  const handleSortToggle = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };
  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);
  const filteredProjects = projects
    .filter(project =>
      statusFilter === 'all' ? true : project.status === statusFilter
    )
    .sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  return (
    <Paper elevation={6} sx={{ p: 4, mt: 4, borderRadius: 4 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap">
        <Typography variant="h5" fontWeight="bold" color="primary.main">
          📁 Projects List
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          href="/projects/new"
          sx={{
            textTransform: 'none',
            background: 'linear-gradient(to right, #1976d2, #42a5f5)',
            '&:hover': {
              background: 'linear-gradient(to right, #1565c0, #2196f3)',
            }
          }}
        >
          Add Project
        </Button>
      </Box>

      {/* Filters */}
      <Grid container spacing={2} mb={3}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              label="Status"
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="on-hold">On-Hold</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
              label="Sort By"
            >
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="startDate">Start Date</MenuItem>
              <MenuItem value="endDate">End Date</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Button
            variant="outlined"
            fullWidth
            onClick={handleSortToggle}
            startIcon={sortOrder === 'asc' ? <ArrowUpward /> : <ArrowDownward />}
            sx={{ height: '100%' }}
          >
            {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          </Button>
        </Grid>
      </Grid>

      {/* Table */}
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 900, borderCollapse: 'separate', borderSpacing: '0 8px' }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Start Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>End Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProjects.map(project => (
              <TableRow
                key={project.id}
                sx={{
                  backgroundColor: '#fff',
                  '&:hover': {
                    backgroundColor: '#e3f2fd',
                    transform: 'scale(1.01)',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                  },
                }}
              >
                <TableCell>{project.project_id}</TableCell>
                <TableCell>{project.title}</TableCell>
                <TableCell>
                  <Chip
                    label={project.status}
                    color={getStatusColor(project.status)}
                    size="small"
                    sx={{ textTransform: 'capitalize' }}
                  />
                </TableCell>
                <TableCell>{project.startDate}</TableCell>
                <TableCell>{project.endDate}</TableCell>
                <TableCell align="center">
                  <Box display="flex" justifyContent="center" gap={1}>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<VisibilityIcon />}
                      href={`/projects/${project.project_id}`}
                      sx={{
                        textTransform: 'none',
                        background: 'linear-gradient(to right, #1976d2, #42a5f5)',
                        color: '#fff',
                        '&:hover': {
                          background: 'linear-gradient(to right, #1565c0, #1e88e5)',
                        },
                      }}
                    >
                      View
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<EditIcon />}
                      href={`/projects/edit/${project.project_id}`}
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
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {filteredProjects.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ fontStyle: 'italic', py: 3 }}>
                  No matching projects found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
};

export default ProjectList;
