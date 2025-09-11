import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Button,
    TextField,
    InputAdornment,
    IconButton,
    FormControl,
    InputLabel,
    OutlinedInput,
    FormHelperText,
    Select,
    MenuItem
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CustomButton from '../components/UI/CustomButton';
import bgImage from '../assets/bg-login-img.png';


const CompleteProfile = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);
    // Get the selected account type from the location state
    const accountType = location.state?.accountType || '';


    const accountTypeOptions = [
        'Freelancer',
        'Agency',
        'Personal',
        'Employee',
        'Business',
        'Individual'
    ];

    const [formData, setFormData] = React.useState({
        username: '',
        title: '',
        expertise: '',
        accountType: accountType || ''
    });
    const [errors, setErrors] = React.useState({});


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add form validation here
        const newErrors = {};

        if (!formData.username.trim()) newErrors.username = 'Username is required';
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.expertise) newErrors.expertise = 'Please select your expertise';
        if (!formData.accountType) newErrors.accountType = 'Please select account type';


        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Handle form submission (e.g., API call)
        console.log('Form submitted:', { ...formData, accountType });

        // Redirect to dashboard or next step
        // navigate('/dashboard');
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

            {/* Herder */}

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    width: '100%',
                    maxWidth: '450px',
                    p: { xs: 3, sm: 4 },
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    zIndex: 1,
                    position: 'relative',
                    // Center on mobile, right on desktop
                    margin: { xs: 'auto', md: '0 10% 0 auto' },
                    // Horizontal margin for mobile
                    mx: { xs: 2, md: 0 },
                    // Right margin for desktop
                    mr: { md: '10%' }
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        color: '#000',
                        fontSize: '24px',
                        fontWeight: 500,
                        // mb: 3,
                        textAlign: 'center'
                    }}
                >
                    Complete Your Profile
                </Typography>

                {/* <Box sx={{ gap: 2 }}> */}
                <TextField
                    fullWidth
                    label="Username (Optional)"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    error={!!errors.username}
                    helperText={errors.username}
                    variant="outlined"
                    margin="normal"
                />

                <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    error={!!errors.title}
                    helperText={errors.title}
                    variant="outlined"
                    margin="normal"
                />

                <TextField
                    fullWidth
                    label="Expertise"
                    name="Expertise"
                    value={formData.expertise}
                    onChange={handleChange}
                    error={!!errors.expertise}
                    helperText={errors.expertise}
                    variant="outlined"
                    margin="normal"
                />

                <Box sx={{ mt: 2 }}>

                    <TextField
                        fullWidth
                        value={formData.accountType}
                        disabled={!!accountType}
                        label="Account Type"
                        name="accountType"
                        onChange={handleChange}
                        input={<OutlinedInput label="Account Type" />}
                        displayEmpty
                    />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <CustomButton
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                            py: 1.5,
                            fontSize: '1rem',
                            fontWeight: 500,
                            textTransform: 'none',
                            borderRadius: '4px',
                            boxShadow: 'none',
                            backgroundColor: '#1a73e8',
                            '&:hover': {
                                backgroundColor: '#1765cc',
                                boxShadow: 'none',
                            },
                        }}
                    >
                        Submit
                    </CustomButton>

                    <Button
                        fullWidth
                        sx={{
                            textTransform: 'none',
                            color: '#1a73e8',
                            '&:hover': {
                                backgroundColor: 'rgba(26, 115, 232, 0.04)',
                            },
                        }}
                        onClick={() => navigate(-1)}
                    >
                        Back
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default CompleteProfile;
