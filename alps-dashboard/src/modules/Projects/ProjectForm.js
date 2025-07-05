import React, { useEffect } from 'react';
import {
  Box, TextField, Button, MenuItem, Paper, Typography
} from '@mui/material';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { createProject, getProjectById, updateProject } from '../../features/project/projectSlice';

const statusOptions = ['active', 'on-hold', 'completed'];

const ProjectForm = () => {
  const { projectId } = useParams();
  const isEdit = Boolean(projectId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedProject, loading, error } = useSelector((state) => state.project);

  useEffect(() => {
    if (isEdit) {
      dispatch(getProjectById(projectId));
    }
  }, [dispatch, isEdit, projectId]);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      status: '',
      startDate: '',
      endDate: '',
      user_id: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      status: Yup.string().required('Status is required'),
      startDate: Yup.string().required('Start Date is required'),
      endDate: Yup.string().required('End Date is required'),
      user_id: Yup.string().required('User_id  is required'),
    }),
    onSubmit: async (values) => {
      try {
        if (isEdit) {
          await dispatch(updateProject({ projectId, updatedData: values })).unwrap();
        } else {
          await dispatch(createProject(values)).unwrap();
        }
        navigate('/projects');
      } catch (err) {
        console.error('Form submit failed:', err);
      }
    },
    enableReinitialize: true
  });

  useEffect(() => {
    if (isEdit && selectedProject) {
      formik.setValues({
        title: selectedProject.title || '',
        description: selectedProject.description || '',
        status: selectedProject.status || '',
        startDate: selectedProject.startDate?.split('T')[0] || '',
        endDate: selectedProject.endDate?.split('T')[0] || '',
      });
    }
  }, [selectedProject, isEdit]);

  return (
    <Paper elevation={6} sx={{ p: 4, mt: 4, borderRadius: 3, maxWidth: 700, mx: 'auto' }}>
      <Typography variant="h5" fontWeight="bold" color="primary.main" mb={3}>
        {isEdit ? '✏️ Edit Project' : '➕ Add New Project'}
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
            label="User_id"
            name="user_id"
            fullWidth
            value={formik.values.user_id}
            onChange={formik.handleChange}
            error={formik.touched.user_id && Boolean(formik.errors.user_id)}
            helperText={formik.touched.user_id && formik.errors.user_id}
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
            color="primary"
            fullWidth
            sx={{ mt: 2, textTransform: 'none' }}
          >
            {isEdit ? 'Update Project' : 'Create Project'}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default ProjectForm;
