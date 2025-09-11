import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    OutlinedInput,
    FormHelperText,
    InputAdornment,
    IconButton,
    Avatar,
    Select,
    MenuItem,
    Tabs,
    Tab,
    Paper,
    Grid
} from '@mui/material';
import { Business, People } from '@mui/icons-material';
import bgImage from '../assets/bg-login-img.png';

const BusinessEmployees = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(1); // Set to 1 for Employees tab

    // Handle tab change
    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
        navigate(newValue === 0 ? '/business-registration' : '/business-employees');
    };

    // Set active tab based on route
    useEffect(() => {
        const path = window.location.pathname;
        setActiveTab(path.includes('business-employees') ? 1 : 0);
    }, [window.location.pathname]);

    return (
        <Box
            sx={{
                minHeight: '100vh',
                width: '100%',
                p: 0,
                m: 0,
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
            }}
        >
            {/* Background */}
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    zIndex: 0,
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }}
            />
    

            {/* Main Form Container */}
            <Box
                sx={{
                    width: '100%',
                    maxWidth: '450px',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    p: { xs: 3, sm: 4 },
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                    zIndex: 1,
                    position: 'relative',
                    margin: { xs: 'auto', md: '0 10% 0 auto' },
                    mx: { xs: 2, md: 0 },
                    mr: { md: '10%' },
                    my: 4,
                    '&::-webkit-scrollbar': {
                        width: '6px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: '#f1f1f1',
                        borderRadius: '10px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#888',
                        borderRadius: '10px',
                        '&:hover': {
                            background: '#555',
                        }
                    }
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        color: '#000',
                        fontSize: '24px',
                        fontWeight: 500,
                        textAlign: 'center',
                        mb: 0
                    }}
                >
                    Business Registration
                </Typography>

                <Paper sx={{ width: '100%', mb: 2, borderRadius: 2, boxShadow: 'none' }}>
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        variant="fullWidth"
                        indicatorColor="primary"
                        textColor="primary"
                        sx={{
                            '& .MuiTabs-indicator': {
                                height: '3px',
                                borderRadius: '3px 3px 0 0',
                            },
                        }}
                    >
                        <Tab
                            icon={<Business />}
                            label="Business Details"
                            iconPosition="start"
                            sx={{ textTransform: 'none', fontWeight: 500 }}
                            onClick={() => navigate('/business-registration')}
                        />
                        <Tab
                            icon={<People />}
                            label="Business Employees"
                            iconPosition="start"
                            sx={{ textTransform: 'none', fontWeight: 500 }}
                        />
                    </Tabs>
                </Paper>

                {/* Employee List/Form Content */}
                <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
                        Employee Management
                    </Typography>

                    {/* Add your employee management UI here */}
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography color="text.secondary">
                            Employee management content will go here
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default BusinessEmployees;