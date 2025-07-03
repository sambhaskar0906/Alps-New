import React, { useEffect } from 'react';
import {
  TextField, MenuItem, Button, Paper, Box, Typography, Grid
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';
import {createTicket} from "../../features/ticket/ticketSlice";
import {useSelector,useDispatch} from "react-redux";

const statusOptions = ['open', 'pending', 'resolved'];
const priorityOptions = ['low', 'medium', 'high'];
const dummyTickets = [
  { id: 1, subject: 'Bug in login', details: 'Login fails on mobile', priority: 'high', status: 'open', assignedTo: 1 }
];

const TicketForm = () => {
  const dispatch = useDispatch();
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(ticketId);

  const existingTicket = isEdit
    ? dummyTickets.find(t => t.id === parseInt(ticketId))
    : null;

  const formik = useFormik({
    initialValues: {
      subject: '',
      details: '',
      priority: 'medium',
      status: 'open',
      assignedTo: '',
      comment: '',
      projectId: ''
    },
    validationSchema: Yup.object({
      subject: Yup.string().required('Required'),
      priority: Yup.string().required('Required'),
      status: Yup.string().required('Required'),
      assignedTo: Yup.string().required('Required'),
      comment:Yup.string().required('Required'),
      projectId:Yup.string().required('Required'),

    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        if (!isEdit) {
          await dispatch(createTicket(values)).unwrap();
        } else {
          // handle update logic here if needed
          console.log('Updating Ticket:', values);
        }
        resetForm();
        navigate('/tickets');
      } catch (error) {
        console.error('Error:', error);
      }
    },
    enableReinitialize: true
  });

  useEffect(() => {
    if (existingTicket) {
      formik.setValues(existingTicket);
    }
  }, [existingTicket]);

  return (
    <Paper elevation={6} sx={{ p: 4, mt: 4, borderRadius: 3, maxWidth: 700, mx: 'auto' }}>
      <Typography variant="h5" fontWeight="bold" color="primary.main" mb={3}>
        {isEdit ? '✏️ Edit Ticket' : '➕ Create New Ticket'}
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth label="Subject" name="subject"
              value={formik.values.subject}
              onChange={formik.handleChange}
              error={formik.touched.subject && Boolean(formik.errors.subject)}
              helperText={formik.touched.subject && formik.errors.subject}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth label="Details" name="details" multiline rows={4}
              value={formik.values.details}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth label="Comment" name="comment" multiline rows={4}
              value={formik.values.comment}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth label="ProjectId" name="projectId" multiline rows={4}
              value={formik.values.projectId}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth select label="Priority" name="priority"
              value={formik.values.priority}
              onChange={formik.handleChange}
            >
              {priorityOptions.map(p => (
                <MenuItem key={p} value={p}>{p}</MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth select label="Status" name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
            >
              {statusOptions.map(s => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth label="Assign To" name="assignedTo"
              value={formik.values.assignedTo}
              onChange={formik.handleChange}
            >
            </TextField>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Button type="submit" variant="contained" fullWidth>
              {isEdit ? 'Update Ticket' : 'Create Ticket'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default TicketForm;
