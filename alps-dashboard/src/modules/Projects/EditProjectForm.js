// modules/Projects/EditProjectForm.js
import React, { useEffect } from 'react';
import {
  Box, TextField, Button, MenuItem, Paper, Typography, CircularProgress
} from '@mui/material';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectById, updateProject } from '../../features/project/projectSlice';

const statusOptions = ['active', 'on-hold', 'completed'];

const EditProjectForm = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentProject, loading, error } = useSelector((state) => state.project);

  useEffect(() => {
    if (projectId) {
      dispatch(getProjectById(projectId));
    }
  }, [dispatch, projectId]);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      status: '',
      startDate: '',
      endDate: ''
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      status: Yup.string().required('Status is required'),
      startDate: Yup.string().required('Start Date is required'),
      endDate: Yup.string().required('End Date is required')
    }),
    onSubmit: async (values) => {
      await dispatch(updateProject({ project_id: projectId, updatedData: values }));
      navigate('/projects');
    },
    enableReinitialize: true
  });

  useEffect(() => {
    if (currentProject) {
      formik.setValues({
        title: currentProject.title || '',
        description: currentProject.description || '',
        status: currentProject.status || '',
        startDate: currentProject.startDate?.split('T')[0] || '',
        endDate: currentProject.endDate?.split('T')[0] || ''
      });
    }
  }, [currentProject]);

  if (loading) {
    return (
      <Box mt={10} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" mt={4} textAlign="center">
        ❌ {error}
      </Typography>
    );
  }

  if (!currentProject) {
    return (
      <Typography variant="h6" textAlign="center" mt={4}>
        🚫 Project not found.
      </Typography>
    );
  }

  return (
    <Paper elevation={6} sx={{ p: 4, mt: 4, borderRadius: 3, maxWidth: 700, mx: 'auto' }}>
      <Typography variant="h5" fontWeight="bold" color="primary.main" mb={3}>
        ✏️ Edit Project
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Title"
            name="title"
            fullWidth
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />

          <TextField
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={3}
            value={formik.values.description}
            onChange={formik.handleChange}
          />

          <TextField
            select
            label="Status"
            name="status"
            fullWidth
            value={formik.values.status}
            onChange={formik.handleChange}
            error={formik.touched.status && Boolean(formik.errors.status)}
            helperText={formik.touched.status && formik.errors.status}
          >
            {statusOptions.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Start Date"
            name="startDate"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formik.values.startDate}
            onChange={formik.handleChange}
            error={formik.touched.startDate && Boolean(formik.errors.startDate)}
            helperText={formik.touched.startDate && formik.errors.startDate}
          />

          <TextField
            label="End Date"
            name="endDate"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formik.values.endDate}
            onChange={formik.handleChange}
            error={formik.touched.endDate && Boolean(formik.errors.endDate)}
            helperText={formik.touched.endDate && formik.errors.endDate}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, textTransform: 'none' }}
          >
            Update Project
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default EditProjectForm;
