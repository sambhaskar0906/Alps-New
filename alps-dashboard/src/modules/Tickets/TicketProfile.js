import React ,{useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Paper,
    Typography,
    Box,
    Button,
    Chip,
    Grid
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector,useDispatch } from 'react-redux';
import {getTicketById} from "../../features/ticket/ticketSlice";


const getStatusColor = (status) => {
    switch (status) {
        case 'open': return 'error';
        case 'pending': return 'warning';
        case 'resolved': return 'success';
        default: return 'default';
    }
};

const TicketProfile = () => {
    const { ticketId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentTicket, loading, error } = useSelector(state => state.ticket);

  useEffect(() => {
    dispatch(getTicketById(ticketId));
  }, [dispatch, ticketId]);
    

    if (loading || !currentTicket) {
  return <Typography sx={{ mt: 4, textAlign: 'center' }}>Loading ticket details...</Typography>;
}

    const ticket = currentTicket;
    return (
        <Paper elevation={6} sx={{ p: 4, mt: 4, borderRadius: 3, maxWidth: 800, mx: 'auto' }}>
            <Typography variant="h5" fontWeight="bold" color="primary.main" mb={3}>
                🎫 Ticket Details
            </Typography>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="subtitle1" fontWeight="bold">Subject:</Typography>
                    <Typography variant="body1">{ticket.subject}</Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="subtitle1" fontWeight="bold">Status:</Typography>
                    <Chip
                        label={ticket.status}
                        color={getStatusColor(ticket.status)}
                        size="small"
                        sx={{ textTransform: 'capitalize', mt: 1 }}
                    />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <Typography variant="subtitle1" fontWeight="bold">Details:</Typography>
                    <Typography variant="body1">{ticket.details}</Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="subtitle1" fontWeight="bold">Priority:</Typography>
                    <Typography variant="body1" textTransform="capitalize">{ticket.priority}</Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="subtitle1" fontWeight="bold">Assigned To:</Typography>
                    <Typography variant="body1">User #{ticket.assignedTo}</Typography>
                </Grid>
            </Grid>

            <Box mt={4}>
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/tickets')}
                    sx={{
                        borderColor: '#1976d2',
                        color: '#1976d2',
                        '&:hover': {
                            backgroundColor: '#e3f2fd',
                            borderColor: '#1565c0'
                        }
                    }}
                >
                    Back
                </Button>
            </Box>
        </Paper>
    );
};

export default TicketProfile;
