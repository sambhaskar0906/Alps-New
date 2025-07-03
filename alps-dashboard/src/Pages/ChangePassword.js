import React from 'react';
import {
    Box,
    Button,
    Paper,
    Typography,
    TextField,
    InputAdornment,
    IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ChangePassword = () => {
    const [showOld, setShowOld] = React.useState(false);
    const [showNew, setShowNew] = React.useState(false);
    const [showConfirm, setShowConfirm] = React.useState(false);

    const formik = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            oldPassword: Yup.string().required('Old password is required'),
            newPassword: Yup.string()
                .min(6, 'Minimum 6 characters')
                .required('New password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
                .required('Confirm your new password'),
        }),
        onSubmit: (values) => {
            // Simulate password update
            console.log('Password Updated:', values);
            alert('Password updated successfully!');
        },
    });

    return (
        <Paper elevation={6} sx={{ maxWidth: 500, mx: 'auto', mt: 5, p: 4, borderRadius: 3 }}>
            <Typography variant="h5" color="primary.main" fontWeight="bold" gutterBottom>
                🔒 Change Password
            </Typography>

            <form onSubmit={formik.handleSubmit}>
                <Box display="flex" flexDirection="column" gap={3}>
                    <TextField
                        label="Old Password"
                        type={showOld ? 'text' : 'password'}
                        name="oldPassword"
                        fullWidth
                        value={formik.values.oldPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
                        helperText={formik.touched.oldPassword && formik.errors.oldPassword}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowOld(!showOld)} edge="end">
                                        {showOld ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        label="New Password"
                        type={showNew ? 'text' : 'password'}
                        name="newPassword"
                        fullWidth
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                        helperText={formik.touched.newPassword && formik.errors.newPassword}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowNew(!showNew)} edge="end">
                                        {showNew ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        label="Confirm New Password"
                        type={showConfirm ? 'text' : 'password'}
                        name="confirmPassword"
                        fullWidth
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowConfirm(!showConfirm)} edge="end">
                                        {showConfirm ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
                        Update Password
                    </Button>
                </Box>
            </form>
        </Paper>
    );
};

export default ChangePassword;
