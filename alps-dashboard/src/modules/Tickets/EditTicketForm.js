import React, { useEffect } from 'react';
import {
    Box, TextField, Button, MenuItem, Paper, Typography,Grid
} from '@mui/material';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getTicketById, updateTicket } from '../../features/ticket/ticketSlice';

const statusOptions = ['open', 'pending', 'resolved'];
const priorityOptions = ['low', 'medium', 'high'];

const EditTicketForm = () => {
    const { ticket_id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(ticket_id);
    const dispatch = useDispatch();
    const { currentTicket, loading, error } = useSelector(state => state.ticket);
    useEffect(() => {
    if (ticket_id) {
      dispatch(getTicketById(ticket_id));
    }
  }, [dispatch, ticket_id]);
    const formik = useFormik({
        initialValues: {
            subject: '',
            details: '',
            status: '',
            priority: '',
            assignedTo: '',
            comment: '',
            projectId: ''
        },
        validationSchema: Yup.object({
            subject: Yup.string().required('Required'),
            status: Yup.string().required('Required'),
            priority: Yup.string().required('Required'),
            assignedTo: Yup.number().required('Required'),
             comment:Yup.string().required('Required'),
             projectId:Yup.string().required('Required'),
        }),
        onSubmit: async (values) => {
      try {
        await dispatch(updateTicket({ ticket_id, updatedData: values })).unwrap();
        navigate('/tickets');
      } catch (err) {
        console.error('Update failed:', err);
      }
    },
    enableReinitialize: true,
  });

    useEffect(() => {
    if (currentTicket) {
      formik.setValues({
        subject: currentTicket.subject || '',
        details: currentTicket.details || '',
        status: currentTicket.status || '',
        priority: currentTicket.priority || '',
        assignedTo: currentTicket.assignedTo || '',
        comment:currentTicket.comment || '',
        projectId:currentTicket.projectId || ''
      });
    }
  }, [currentTicket]);
    return (
        <Paper elevation={6} sx={{ p: 4, mt: 4, borderRadius: 3, maxWidth: 600, mx: 'auto' }}>
            <Typography variant="h5" fontWeight="bold" color="primary.main" mb={3}>
                📝 Edit Ticket
            </Typography>

            <form onSubmit={formik.handleSubmit}>
                <Box display="flex" flexDirection="column" gap={2}>
                    <TextField
                        label="Subject"
                        name="subject"
                        fullWidth
                        value={formik.values.subject}
                        onChange={formik.handleChange}
                        error={formik.touched.subject && Boolean(formik.errors.subject)}
                        helperText={formik.touched.subject && formik.errors.subject}
                    />

                    <TextField
                        label="Details"
                        name="details"
                        multiline
                        rows={3}
                        fullWidth
                        value={formik.values.details}
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
                        {statusOptions.map(status => (
                            <MenuItem key={status} value={status}>
                                {status}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        select
                        label="Priority"
                        name="priority"
                        fullWidth
                        value={formik.values.priority}
                        onChange={formik.handleChange}
                        error={formik.touched.priority && Boolean(formik.errors.priority)}
                        helperText={formik.touched.priority && formik.errors.priority}
                    >
                        {priorityOptions.map(priority => (
                            <MenuItem key={priority} value={priority}>
                                {priority}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        label="Assigned To (User ID)"
                        name="assignedTo"
                        type="number"
                        fullWidth
                        value={formik.values.assignedTo}
                        onChange={formik.handleChange}
                        error={formik.touched.assignedTo && Boolean(formik.errors.assignedTo)}
                        helperText={formik.touched.assignedTo && formik.errors.assignedTo}
                    />
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
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Update Ticket
                    </Button>
                </Box>
            </form>
        </Paper>
    );
};

export default EditTicketForm;
