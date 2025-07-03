import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Paper,
    Typography,
    Box,
    Button,
    Grid,
    Divider,
    Avatar,
    CircularProgress
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById } from '../../features/user/userSlice';

const ClientProfile = () => {
    const { user_id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { selectedUser: client, loading, error } = useSelector((state) => state.user);

    useEffect(() => {
        if (user_id) {
            dispatch(getUserById(user_id));
        }
    }, [dispatch, user_id]);

    if (loading) return <Box sx={{ mt: 4, textAlign: 'center' }}><CircularProgress /></Box>;
    if (error) return <Typography color="error" align="center" sx={{ mt: 4 }}>{error}</Typography>;
    if (!client) return <Typography align="center" sx={{ mt: 4 }}>Client not found</Typography>;

    return (
        <Paper
            elevation={6}
            sx={{
                p: 4,
                mt: 4,
                borderRadius: 4,
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                maxWidth: 700,
                mx: 'auto',
            }}
        >
            {/* Header with Avatar and Title */}
            <Box display="flex" alignItems="center" gap={2} mb={3}>
                <Avatar
                    src={client.profilePhoto}
                    alt={client.fullName}
                    sx={{ width: 64, height: 64 }}
                />
                <Box>
                    <Typography variant="h5" fontWeight="bold" color="primary.main">
                        Client Profile
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        View client details below
                    </Typography>
                </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Client Details */}
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">Full Name</Typography>
                    <Typography variant="body1" fontWeight="500">{client.fullName}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">Email Address</Typography>
                    <Typography variant="body1" fontWeight="500">{client.email}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">Contact Number</Typography>
                    <Typography variant="body1" fontWeight="500">{client.contact}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">Role</Typography>
                    <Typography variant="body1" fontWeight="500">{client.role}</Typography>
                </Grid>
            </Grid>

            {/* Back Button */}
            <Box mt={4}>
                <Button
                    variant="contained"
                    size="medium"
                    sx={{
                        background: 'linear-gradient(to right, #1976d2, #42a5f5)',
                        textTransform: 'none',
                        px: 3,
                        '&:hover': {
                            background: 'linear-gradient(to right, #1565c0, #2196f3)',
                            transform: 'translateY(-1px)',
                        },
                    }}
                    onClick={() => navigate(`/clients`)}
                >
                    Back
                </Button>
            </Box>
        </Paper>
    );
};

export default ClientProfile;