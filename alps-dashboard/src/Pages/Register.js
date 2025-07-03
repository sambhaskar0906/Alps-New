import React, { useState, useEffect } from 'react';
import {
  Avatar, Button, TextField, Box, Typography, Container, Paper,
  IconButton, InputAdornment, Link as MuiLink, CircularProgress
} from '@mui/material';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../features/user/userSlice';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [serverError, setServerError] = useState('');

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      contact: '',
      password: '',
      confirmPassword: '',
      profilePhoto: null,
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Full Name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      contact: Yup.string()
        .matches(/^[0-9]{10}$/, 'Enter a valid 10-digit contact number')
        .required('Contact is required'),
      password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
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

      try {
        await dispatch(createUser(formData)).unwrap();
        navigate('/'); // redirect after success
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
        background: 'linear-gradient(135deg, #512DA8, #D32F2F)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={10}
          sx={{
            p: 4,
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 56, height: 56 }}>
              <PersonAddAltIcon fontSize="large" />
            </Avatar>
            <Typography variant="h5" fontWeight="bold" sx={{ color: '#333', mb: 2 }}>
              Create Your Account
            </Typography>

            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                margin="normal"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                helperText={formik.touched.fullName && formik.errors.fullName}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                margin="normal"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                fullWidth
                label="Contact"
                name="contact"
                margin="normal"
                value={formik.values.contact}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.contact && Boolean(formik.errors.contact)}
                helperText={formik.touched.contact && formik.errors.contact}
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                margin="normal"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
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
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type={showCPassword ? 'text' : 'password'}
                margin="normal"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowCPassword(!showCPassword)} edge="end">
                        {showCPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Box sx={{ mb: 2 }}>
                <Button
                  variant="contained"
                  component="label"
                  fullWidth
                  sx={{ textTransform: 'none', py: 1 }}
                >
                  Upload Profile Photo
                  <input
                    type="file"
                    hidden
                    accept="image/png, image/jpeg"
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      formik.setFieldValue('profilePhoto', file);
                    }}
                  />
                </Button>
                {formik.touched.profilePhoto && formik.errors.profilePhoto && (
                  <Typography color="error" variant="body2">
                    {formik.errors.profilePhoto}
                  </Typography>
                )}
                {formik.values.profilePhoto && (
                  <Box
                    component="img"
                    src={URL.createObjectURL(formik.values.profilePhoto)}
                    alt="Preview"
                    sx={{
                      mt: 2,
                      width: '100%',
                      height: 200,
                      objectFit: 'cover',
                      borderRadius: 2,
                      border: '1px solid #ccc',
                    }}
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
                  mb: 2,
                  py: 1.4,
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  borderRadius: '8px',
                  textTransform: 'none',
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
              </Button>

              <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                Already have an account?{' '}
                <MuiLink component={Link} to="/login" underline="hover" color="primary">
                  Login here
                </MuiLink>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
