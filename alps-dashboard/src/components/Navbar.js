import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { logoutUser } from "../features/user/userSlice";
import { useSelector, useDispatch } from 'react-redux';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const role = localStorage.getItem('role');
  const isLoggedIn = !!localStorage.getItem('token');

  const { currentUser } = useSelector((state) => state.user);
  const user = currentUser || {
    fullName: 'Guest User',
    email: 'guest@example.com',
  };

  // ✅ Conditional navigation based on role
  const navItems = [
    { label: 'Dashboard', to: '/' },
    ...(role === 'Admin'
      ? [{ label: 'Clients', to: '/clients' }]
      : [{ label: 'Client View', to: '/client-view' }]
    ),
    { label: 'Projects', to: '/projects' },
    { label: 'Tickets', to: '/tickets' },
  ];

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const handleProfileClick = (e) => setAnchorEl(e.currentTarget);
  const handleProfileClose = () => setAnchorEl(null);

  const renderNavLinks = () => (
    <Stack direction="row" spacing={3} alignItems="center">
      {navItems.map((item) => (
        <Button
          key={item.to}
          component={Link}
          to={item.to}
          sx={{
            color: '#fff',
            textTransform: 'none',
            fontWeight: 500,
            borderBottom: location.pathname === item.to ? '2px solid #ffeb3b' : 'none',
            '&:hover': {
              color: '#ffeb3b',
              backgroundColor: 'transparent',
            },
          }}
        >
          {item.label}
        </Button>
      ))}

      {isLoggedIn && (
        <>
          <Tooltip title="Account settings">
            <IconButton onClick={handleProfileClick} sx={{ p: 0 }}>
              <Avatar
                sx={{
                  bgcolor: '#ffffff',
                  color: '#1565c0',
                  fontWeight: 'bold',
                  width: 40,
                  height: 40,
                }}
              >
                {user.fullName.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileClose}
            PaperProps={{
              sx: {
                mt: 1.5,
                borderRadius: 2,
                boxShadow: '0px 6px 18px rgba(0,0,0,0.1)',
              },
            }}
          >
            <Box px={2} py={1}>
              <Typography fontWeight="bold">{user.fullName}</Typography>
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
            </Box>
            <Divider />
            <MenuItem onClick={() => { handleProfileClose(); navigate('/change-password'); }}>
              Change Password
            </MenuItem>
            <MenuItem onClick={() => { handleProfileClose(); handleLogout(); }}>
              Logout
            </MenuItem>
          </Menu>
        </>
      )}
    </Stack>
  );

  const renderMobileDrawer = () => (
    <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
      <Box sx={{ width: 250 }} onClick={() => setDrawerOpen(false)}>
        <List>
          {navItems.map((item) => (
            <ListItem
              button
              key={item.to}
              component={Link}
              to={item.to}
              selected={location.pathname === item.to}
            >
              <ListItemText primary={item.label} />
            </ListItem>
          ))}

          {isLoggedIn && (
            <>
              <Divider />
              <ListItem>
                <Box>
                  <Typography fontWeight="bold">{user.fullName}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.email}
                  </Typography>
                </Box>
              </ListItem>
              <ListItem button onClick={() => navigate('/change-password')}>
                <ListItemText primary="Change Password" />
              </ListItem>
              <ListItem button onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItem>
            </>
          )}
        </List>
      </Box>
    </Drawer>
  );

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: 'linear-gradient(to right, #1565c0, #42a5f5)',
          boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              color: '#fff',
              letterSpacing: 1,
              textTransform: 'uppercase',
            }}
          >
            Alps CRM
          </Typography>

          {isMobile ? (
            <>
              <IconButton
                edge="end"
                color="inherit"
                onClick={() => setDrawerOpen(true)}
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  p: 1.2,
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <MenuIcon sx={{ fontSize: 28 }} />
              </IconButton>
              {renderMobileDrawer()}
            </>
          ) : (
            renderNavLinks()
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
