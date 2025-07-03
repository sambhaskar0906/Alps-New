import React from 'react';
import {
    Avatar,
    Button,
    TextField,
    Box,
    Typography,
    Container,
    Paper,
    Link as MuiLink,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from "../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";

const Login = () => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email').required('Required'),
            password: Yup.string().min(6, 'Min 6 characters').required('Required'),
        }),
        onSubmit: async (values) => {
            try {
                const result = await dispatch(loginUser(values)).unwrap();

                if (result?.user) {
                    // ✅ Save token and role in localStorage
                    localStorage.setItem('token', result.token);
                    localStorage.setItem('role', result.user.role); // role saved

                    navigate('/');
                }
            } catch (err) {
                alert(err);
            }
        },
    });

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #D32F2F, #512DA8)',
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
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56 }}>
                            <LockOutlinedIcon fontSize="large" />
                        </Avatar>
                        <Typography variant="h5" fontWeight="bold" sx={{ mt: 1, color: '#333' }}>
                            Sign In to Your Account
                        </Typography>

                        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                            <TextField
                                fullWidth
                                label="Email Address"
                                name="email"
                                variant="outlined"
                                margin="normal"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                name="password"
                                variant="outlined"
                                margin="normal"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    py: 1.4,
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                    borderRadius: '8px',
                                    textTransform: 'none',
                                }}
                            >
                                Sign In
                            </Button>

                            {/* <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                                Don't have an account?{' '}
                                <MuiLink component={Link} to="/register" underline="hover" color="primary">
                                    Register here
                                </MuiLink>
                            </Typography> */}
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default Login;
