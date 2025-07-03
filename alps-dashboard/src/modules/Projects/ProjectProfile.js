import React, { useEffect } from 'react';
import {
  Paper,
  Typography,
  Box,
  Button,
  Chip,
  Grid,
  Divider,
  CircularProgress
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectById } from '../../features/project/projectSlice';

const getStatusColor = (status) => {
  switch (status) {
    case 'active':
      return 'success';
    case 'on-hold':
      return 'warning';
    case 'completed':
      return 'default';
    default:
      return 'default';
  }
};

const ProjectProfile = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentProject, loading, error } = useSelector((state) => state.project);

  useEffect(() => {
    if (projectId) {
      dispatch(getProjectById(projectId));
    }
  }, [dispatch, projectId]);

  if (loading) {
    return (
      <Box mt={10} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" sx={{ mt: 4, textAlign: 'center' }}>
        ❌ {error}
      </Typography>
    );
  }

  if (!currentProject) {
    return (
      <Typography variant="h6" color="error" sx={{ mt: 4, textAlign: 'center' }}>
        🚫 Project not found.
      </Typography>
    );
  }

  const project = currentProject;

  return (
    <Paper
      elevation={6}
      sx={{
        p: 4,
        mt: 4,
        borderRadius: 3,
        maxWidth: 800,
        mx: 'auto',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)'
      }}
    >
      <Typography variant="h5" fontWeight="bold" color="primary.main" mb={2}>
        📄 Project Details
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Typography variant="subtitle2" color="text.secondary">Project Title</Typography>
          <Typography variant="body1" fontWeight="500">{project.title}</Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant="subtitle2" color="text.secondary">Status</Typography>
          <Chip
            label={project.status}
            color={getStatusColor(project.status)}
            size="small"
            sx={{ textTransform: 'capitalize', mt: 0.5 }}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant="subtitle2" color="text.secondary">Description</Typography>
          <Typography variant="body1" fontWeight="400">{project.description}</Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" color="text.secondary">Start Date</Typography>
          <Typography variant="body1">{project.startDate?.split('T')[0]}</Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" color="text.secondary">End Date</Typography>
          <Typography variant="body1">{project.endDate?.split('T')[0]}</Typography>
        </Grid>
      </Grid>

      <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/projects')}
        >
          Back
        </Button>
      </Box>
    </Paper>
  );
};

export default ProjectProfile;
