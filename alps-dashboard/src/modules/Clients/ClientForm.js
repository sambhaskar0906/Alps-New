import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Paper, TextField, Typography, Button, Grid, Box, CircularProgress
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById, } from '../../features/user/userSlice';

const ClientForm = () => {
    const { user_id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { selectedUser: user, loading, error } = useSelector((state) => state.user);


    useEffect(() => {
        if (user_id) {
            dispatch(getUserById(user_id));
        }
    }, [dispatch, user_id]);

    const formik = useFormik({
        initialValues: {
            name: user?.fullName || '',
            email: user?.email || '',
            contact: user?.contact || '',
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email').required('Required'),
            contact: Yup.string().required('Required'),
        }),
        onSubmit: (values) => {
            console.log('Updated User:', values);

            navigate('/clients');
        },
    });

    if (loading) return <Box sx={{ mt: 4, textAlign: 'center' }}><CircularProgress /></Box>;
    if (error) return <Typography color="error" sx={{ mt: 4 }}>{error}</Typography>;
    if (!user) return <Typography sx={{ mt: 4 }}>Client not found</Typography>;

    return (
        <Paper elevation={6} sx={{ p: 4, mt: 4, borderRadius: 3 }}>
            <Typography variant="h5" fontWeight="bold" color="primary">✏️ Edit Client</Typography>

            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3} mt={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Contact"
                            name="contact"
                            value={formik.values.contact}
                            onChange={formik.handleChange}
                            error={formik.touched.contact && Boolean(formik.errors.contact)}
                            helperText={formik.touched.contact && formik.errors.contact}
                        />
                    </Grid>
                </Grid>

                <Box mt={4}>
                    <Button variant="contained" type="submit" color="primary">Save Changes</Button>
                    <Button sx={{ ml: 2 }} onClick={() => navigate('/clients')}>Cancel</Button>
                </Box>
            </form>
        </Paper>
    );
};

export default ClientForm;