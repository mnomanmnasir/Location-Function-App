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
import { Business, People, Add, Close } from '@mui/icons-material';
import bgImage from '../assets/bg-login-img.png';
import CustomTextField from '../components/UI/CustomTextField';
import CustomButton from '../components/UI/CustomButton';


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

    const [showEmployeeForm, setShowEmployeeForm] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = React.useState({
        employeeName: '',
        employeeEmail: '',
        employeeTitle: '',
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
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
                    {!showEmployeeForm ? (
                        <CustomButton
                            variant="contained"
                            startIcon={<Add />}
                            onClick={() => setShowEmployeeForm(true)}
                            fullWidth
                            sx={{ mb: 2 }}
                        >
                            Add Employee
                        </CustomButton>
                    ) : (
                        <Box sx={{ border: '1px solid #e0e0e0', p: 3, borderRadius: 2, mb: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h6">Add New Employee</Typography>
                                <IconButton onClick={() => setShowEmployeeForm(false)} size="small">
                                    <Close />
                                </IconButton>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <CustomTextField
                                    fullWidth
                                    label="Employee Name"
                                    name="employeeName"
                                    value={formData.employeeName}
                                    onChange={handleChange}
                                    variant="outlined"
                                    margin="none"
                                    placeholder="Enter employee name"
                                />

                                <CustomTextField
                                    fullWidth
                                    label="Employee Email"
                                    name="employeeEmail"
                                    type="email"
                                    value={formData.employeeEmail}
                                    onChange={handleChange}
                                    variant="outlined"
                                    margin="none"
                                    placeholder="Enter employee email"
                                />

                                <CustomTextField
                                    fullWidth
                                    label="Employee Title"
                                    name="employeeTitle"
                                    value={formData.employeeTitle}
                                    onChange={handleChange}
                                    variant="outlined"
                                    margin="none"
                                    placeholder="Enter employee title"
                                />

                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                                    <CustomButton
                                        variant="outlined"
                                        onClick={() => setShowEmployeeForm(false)}
                                    >
                                        Cancel
                                    </CustomButton>
                                    <CustomButton
                                        variant="contained"
                                        onClick={() => {
                                            if (formData.employeeName && formData.employeeEmail && formData.employeeTitle) {
                                                const newEmployee = {
                                                    name: formData.employeeName,
                                                    email: formData.employeeEmail,
                                                    title: formData.employeeTitle
                                                };
                                                setEmployees([...employees, newEmployee]);
                                                setFormData({
                                                    ...formData,
                                                    employeeName: '',
                                                    employeeEmail: '',
                                                    employeeTitle: ''
                                                });
                                                setShowEmployeeForm(false);
                                            }
                                        }}
                                    >
                                        Add Employee
                                    </CustomButton>
                                </Box>
                            </Box>
                        </Box>
                    )}

                    {/* Display added employees */}
                    {employees.length > 0 && (
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium' }}>
                                Employees ({employees.length})
                            </Typography>
                            <Box sx={{ maxHeight: '300px', overflowY: 'auto' }}>
                                {employees.map((emp, index) => (
                                    <Paper 
                                        key={index} 
                                        sx={{ 
                                            p: 2, 
                                            mb: 1, 
                                            display: 'flex', 
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Box>
                                            <Typography variant="subtitle2">{emp.name}</Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {emp.title}
                                            </Typography>
                                            <Typography variant="body2" color="primary">
                                                {emp.email}
                                            </Typography>
                                        </Box>
                                        <IconButton 
                                            size="small" 
                                            onClick={() => {
                                                const updatedEmployees = [...employees];
                                                updatedEmployees.splice(index, 1);
                                                setEmployees(updatedEmployees);
                                            }}
                                        >
                                            <Close fontSize="small" />
                                        </IconButton>
                                    </Paper>
                                ))}
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default BusinessEmployees;