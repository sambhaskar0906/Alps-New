import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

const StatCard = ({ label, value, icon, gradient }) => {
  return (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        borderRadius: 3,
        background: gradient,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        height: 150,
        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease-in-out',
        cursor: 'pointer',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
        },
      }}
    >
      <Box sx={{ mr: 3 }}>{icon}</Box>
      <Box>
        <Typography variant="body1" sx={{ opacity: 0.9 }}>
          {label}
        </Typography>
        <Typography variant="h4" fontWeight="bold">
          {value}
        </Typography>
      </Box>
    </Paper>
  );
};

const Dashboard = () => {
  const role = localStorage.getItem('role');

  return (
    <Grid container spacing={3}>
      {/* Only show Clients StatCard if role is Admin */}
      {role === 'Admin' && (
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatCard
            label="# Clients"
            value={12}
            icon={<PeopleAltIcon sx={{ fontSize: 40 }} />}
            gradient="linear-gradient(135deg, #2196F3, #21CBF3)"
          />
        </Grid>
      )}

      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <StatCard
          label="# Active Projects"
          value={8}
          icon={<WorkOutlineIcon sx={{ fontSize: 40 }} />}
          gradient="linear-gradient(135deg, #66BB6A, #43A047)"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <StatCard
          label="# Pending Tickets"
          value={5}
          icon={<ReportProblemIcon sx={{ fontSize: 40 }} />}
          gradient="linear-gradient(135deg, #FF7043, #F44336)"
        />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
