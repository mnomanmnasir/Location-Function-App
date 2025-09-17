import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled, useTheme, useMediaQuery } from '@mui/material';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  useMediaQuery as useMuiMediaQuery,
} from '@mui/material';
import menuItems from '../data/menuItems';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ExitToApp as ExitToAppIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

const Main = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: 0,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMuiMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerClose = () => {
    if (isMobile) {
      setIsClosing(true);
      setMobileOpen(false);
    }
  };

  const handleLogout = () => {
    // Handle logout logic here
    navigate('/login');
  };

  // Close drawer when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      handleDrawerClose();
    }
  }, [location.pathname]);

  const drawer = (
    <div>
      <DrawerHeader>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, ml: 1 }}>
          Menu
        </Typography>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton 
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          ...(isMobile && { width: '100%' })
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Function App
          </Typography>
          <IconButton color="inherit" onClick={handleLogout} title="Logout">
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      
      {/* Desktop Drawer */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: 'none',
              boxShadow: theme.shadows[8],
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Main>
        <Toolbar /> {/* Spacer for AppBar */}
        <Box 
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3 },
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            mt: 2,
            maxWidth: '100%',
            overflowX: 'hidden',
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
            Welcome to Your Dashboard
          </Typography>
          <Typography paragraph sx={{ mb: 4, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
            This is your main dashboard where you can manage your business, employees, and settings.
          </Typography>
          
          {/* Responsive Dashboard Content */}
          <Box sx={{ 
            display: 'grid',
            gap: 3,
            gridTemplateColumns: { 
              xs: '1fr', 
              sm: 'repeat(2, 1fr)', 
              lg: 'repeat(3, 1fr)',
              xl: 'repeat(4, 1fr)'
            },
          }}>
            {/* Example Dashboard Cards */}
            {[1, 2, 3, 4].map((item) => (
              <Box 
                key={item}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: 'background.paper',
                  boxShadow: 1,
                  minHeight: '120px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 3,
                  },
                }}
              >
                <Typography variant="h6" sx={{ mb: 1 }}>Card {item}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Sample content for card {item}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Main>
    </Box>
  );
};

export default Dashboard;
