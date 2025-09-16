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
import CustomTextField from '../components/UI/CustomTextField';


const BusinessEmployees = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(1); // Set to 1 for Employees tab

    // Handle tab change
    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
        navigate(newValue === 0 ? '/business-registration' : '/business-employees');
    };
    const [errors, setErrors] = React.useState({});

    // Set active tab based on route
    useEffect(() => {
        const path = window.location.pathname;
        setActiveTab(path.includes('business-employees') ? 1 : 0);
    }, [window.location.pathname]);

    const [formData, setFormData] = React.useState({
        businessName: '',
        businessEmail: '',
        contactPersonTitle: '',
        phoneNumber: '',
        businessType: '',
        address: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };



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
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <CustomTextField
                    fullWidth
                    label="Employee Name"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    error={!!errors.businessName}
                    helperText={errors.businessName}
                    variant="outlined"
                    margin="none"
                    placeholder="Enter your business name"
                />


                <CustomTextField
                    fullWidth
                    label="Employee Email"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    error={!!errors.address}
                    helperText={errors.address}
                    variant="outlined"
                    margin="none"
                    multiline
                    placeholder="Enter full business address"
                />

                <CustomTextField
                    fullWidth
                    label="Contact Person Title"
                    name="contactPersonTitle"
                    value={formData.contactPersonTitle}
                    onChange={handleChange}
                    variant="outlined"
                    margin="none"
                    placeholder="e.g., Owner, Manager"
                />

                <CustomTextField
                    fullWidth
                    label="Business Type"
                    name="contactPersonTitle"
                    value={formData.contactPersonTitle}
                    onChange={handleChange}
                    variant="outlined"
                    margin="none"
                    placeholder="Select business type"
                />
            </Box>
            </Box>
        </Box>
    );
};

export default BusinessEmployees;