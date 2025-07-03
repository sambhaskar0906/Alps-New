import React, { useState } from 'react';
import {
    Avatar, Button, TextField, Box, Typography, Container, Paper,
    IconButton, InputAdornment, CircularProgress
} from '@mui/material';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../features/user/userSlice';

const AddClient = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.user);

    const [showPassword, setShowPassword] = useState(false);
    const [serverError, setServerError] = useState('');

    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            contact: '',
            password: '',
            profilePhoto: null,
        },
        validationSchema: Yup.object({
            fullName: Yup.string().required('Full Name is required'),
            email: Yup.string().email('Invalid email').required('Email is required'),
            contact: Yup.string()
                .matches(/^[0-9]{10}$/, 'Enter a valid 10-digit contact number')
                .required('Contact is required'),
            password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
            profilePhoto: Yup.mixed()
                .required('Profile photo is required')
                .test('fileType', 'Only JPG/PNG allowed', (value) => {
                    return value && ['image/jpeg', 'image/jpg', 'image/png'].includes(value.type);
                })
                .test('fileSize', 'File too large (max 2MB)', (value) => {
                    return value && value.size <= 2 * 1024 * 1024;
                }),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            setServerError('');
            const formData = new FormData();
            formData.append('fullName', values.fullName);
            formData.append('email', values.email);
            formData.append('contact', values.contact);
            formData.append('password', values.password);
            formData.append('profilePhoto', values.profilePhoto);
            formData.append('role', 'Client'); // Important for filtering in ClientList

            try {
                await dispatch(createUser(formData)).unwrap();
                navigate('/clients'); // Redirect to client list after adding
            } catch (err) {
                setServerError(err);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #00796B, #43A047)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: 4,
            }}
        >
            <Container maxWidth="sm">
                <Paper elevation={10} sx={{ p: 4, borderRadius: 4, background: '#fff' }}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Avatar sx={{ bgcolor: 'primary.main', mb: 1, width: 56, height: 56 }}>
                            <PersonAddAltIcon fontSize="large" />
                        </Avatar>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                            Add New Client
                        </Typography>

                        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
                            <TextField
                                fullWidth
                                label="Full Name"
                                name="fullName"
                                value={formik.values.fullName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                                helperText={formik.touched.fullName && formik.errors.fullName}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Contact"
                                name="contact"
                                value={formik.values.contact}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.contact && Boolean(formik.errors.contact)}
                                helperText={formik.touched.contact && formik.errors.contact}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                                margin="normal"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <Box sx={{ mb: 2, mt: 1 }}>
                                <Button
                                    variant="contained"
                                    component="label"
                                    fullWidth
                                    sx={{ textTransform: 'none' }}
                                >
                                    Upload Profile Photo
                                    <input
                                        type="file"
                                        hidden
                                        accept="image/png, image/jpeg"
                                        onChange={(e) => formik.setFieldValue('profilePhoto', e.currentTarget.files[0])}
                                    />
                                </Button>
                                {formik.touched.profilePhoto && formik.errors.profilePhoto && (
                                    <Typography variant="body2" color="error">
                                        {formik.errors.profilePhoto}
                                    </Typography>
                                )}
                                {formik.values.profilePhoto && (
                                    <Box
                                        component="img"
                                        src={URL.createObjectURL(formik.values.profilePhoto)}
                                        alt="preview"
                                        sx={{ mt: 2, width: '100%', height: 200, objectFit: 'cover', borderRadius: 2 }}
                                    />
                                )}
                            </Box>

                            {serverError && (
                                <Typography color="error" align="center" sx={{ mb: 1 }}>
                                    {serverError}
                                </Typography>
                            )}

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                disabled={formik.isSubmitting || loading}
                                sx={{
                                    py: 1.3,
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    mt: 2,
                                }}
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : 'Add Client'}
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default AddClient;
