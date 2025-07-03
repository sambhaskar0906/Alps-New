import React from 'react';
import {
    Paper,
    Typography,
    Box,
    Grid,
    Card,
    CardContent,
    Divider,
} from '@mui/material';

// Mock data (replace with actual API data)
const assignedProjects = [
    { projectId: 'PROJ_1012' },
    { projectId: 'PROJ_1045' },
];

const assignedTickets = [
    { ticketId: 'TKT_5001' },
    { ticketId: 'TKT_5047' },
];

const ClientView = () => {
    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                👤 Welcome, Client
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={3}>
                Below are your assigned project and ticket IDs.
            </Typography>

            <Grid container spacing={4}>
                {/* Projects */}
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            🗂 Assigned Projects
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        {assignedProjects.length > 0 ? (
                            assignedProjects.map((project, index) => (
                                <Card
                                    key={index}
                                    sx={{
                                        mb: 2,
                                        borderLeft: '5px solid #1976d2',
                                        backgroundColor: '#f0f4ff',
                                    }}
                                >
                                    <CardContent>
                                        <Typography fontWeight={600}>Project ID:</Typography>
                                        <Typography variant="body1">{project.projectId}</Typography>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <Typography>No projects assigned.</Typography>
                        )}
                    </Paper>
                </Grid>

                {/* Tickets */}
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            🎫 Assigned Tickets
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        {assignedTickets.length > 0 ? (
                            assignedTickets.map((ticket, index) => (
                                <Card
                                    key={index}
                                    sx={{
                                        mb: 2,
                                        borderLeft: '5px solid #2e7d32',
                                        backgroundColor: '#e8f5e9',
                                    }}
                                >
                                    <CardContent>
                                        <Typography fontWeight={600}>Ticket ID:</Typography>
                                        <Typography variant="body1">{ticket.ticketId}</Typography>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <Typography>No tickets assigned.</Typography>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ClientView;
