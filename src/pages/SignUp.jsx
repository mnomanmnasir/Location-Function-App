import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
    Box,
    Typography,
    Button,
    Link,
    Divider,
    FormControlLabel,
    TextField,
    InputAdornment,
    IconButton,

    Checkbox,
} from '@mui/material';
import { Google, Facebook, Apple } from '@mui/icons-material';
import CustomTextField from '../components/UI/CustomTextField';
import bgImage from '../assets/bg-login-img.png';
import CustomButton from '../components/UI/CustomButton';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false
    });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match!");
            return;
        }
        console.log('Sign up form submitted:', formData);
        // Handle signup logic here
    };

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

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
            {/* Full Screen Background */}
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

            {/* Sign Up Form */}
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
                    margin: { xs: 'auto', md: '0 10% 0 auto' },
                    mx: { xs: 2, md: 0 },
                    mr: { md: '10%' }
                }}
            >
                {/* Header */}
                <Box sx={{ textAlign: 'center' }}>
                    <Typography
                        variant="h5"
                        sx={{
                            color: '#000',
                            fontWeight: 'bold',
                            mb: 1,
                            fontFamily: 'Google Sans, Roboto, Arial, sans-serif'
                        }}
                    >
                        Create an Account
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            color: 'text.secondary',
                            fontSize: '16px',
                            fontWeight: 400,
                            mb: 3,
                            fontFamily: 'Roboto, Arial, sans-serif'
                        }}
                    >
                        Create account for Function at Location
                    </Typography>
                </Box>

                {/* Name Fields */}
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <CustomTextField
                        label="First name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter your first name"
                    />
                    <CustomTextField
                        label="Last name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter your last name"
                    />
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>

                    {/* Email Field */}
                    <CustomTextField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                    />

                    <CustomTextField
                        label="Phone Number"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Enter your Phone Number"
                    />

                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>

                    {/* Confirm Password Field */}
                    <CustomTextField
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        showPassword={showConfirmPassword}
                        onTogglePasswordVisibility={toggleConfirmPasswordVisibility}
                        placeholder="Confirm your password"
                    />

                    {/* Password Field */}
                    <CustomTextField
                        label="Re-enter Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        showPassword={showPassword}
                        onTogglePasswordVisibility={togglePasswordVisibility}
                        placeholder="Re-enter your password"
                    />
                </Box>

                {/* Sign Up Button */}
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <CustomButton
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                            maxWidth: '200px',
                            backgroundColor: '#1a73e8',
                            '&:hover': {
                                backgroundColor: '#1b66c9',
                            }
                        }}
                    >
                      <Link component={RouterLink} to="/verification-code" sx={{ color: '#fff' }}>Create Account</Link>
                    </CustomButton>
                </Box>

                {/* Divider with text */}
                <Box sx={{ textAlign: 'center', mb: 1 }}>

                    <Typography variant="body2" color="#000">
                        Have an account? <Link component={RouterLink} to="/login" sx={{ color: '#1a73e8' }}>Sign in</Link>
                    </Typography>
                </Box>
                <Box sx={{ position: 'relative', my: 1 }}>
                    <Divider sx={{ borderColor: '#e0e0e0' }}>
                        <Box
                            component="span"
                            sx={{
                                position: 'absolute',
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)',
                                px: 2,
                                backgroundColor: 'white',
                                color: '#5f6368',
                                fontSize: '14px',
                                fontFamily: 'Roboto, Arial, sans-serif'
                            }}
                        >
                            or
                        </Box>
                    </Divider>
                </Box>


                {/* Social Icon */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px', mb: 3 }}>
                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.67 15.63 16.89 16.83 15.72 17.62V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4" />
                                <path d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.72 17.62C14.74 18.27 13.48 18.75 12 18.75C9.14 18.75 6.71 16.88 5.86 14.27H2.18V17.05C3.99 20.59 7.7 23 12 23Z" fill="#34A853" />
                                <path d="M5.86 14.27C5.46 13.09 5.46 11.83 5.86 10.65V7.87H2.18C0.79 10.58 0.79 13.65 2.18 16.36L5.86 14.27Z" fill="#FBBC05" />
                                <path d="M12 5.25C13.53 5.25 14.91 5.8 15.98 6.88L19.36 3.5C17.45 1.69 14.96 0.5 12 0.5C7.7 0.5 3.99 2.9 2.18 6.87L5.86 9.96C6.71 7.35 9.14 5.25 12 5.25Z" fill="#EA4335" />
                            </svg>
                        }
                        sx={{
                            height: '40px',
                            borderRadius: '10px',
                            borderColor: '#dadce0',
                            color: '#000',
                            textTransform: 'none',
                            fontSize: '14px',
                            // fontWeight: 'bold',
                            fontFamily: 'Roboto, Arial, sans-serif',
                            backgroundColor: 'white',
                            display: 'flex',
                            justifyContent: 'center',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                borderColor: '#d2e3fc',
                            },
                            '& .MuiButton-startIcon': {
                                margin: 0,
                                marginRight: '8px',
                                '& > *': {
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '20px',
                                    height: '20px',
                                    overflow: 'visible'
                                }
                            }
                        }}
                    >
                        Continue with Google
                    </Button>


                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={
                            <Apple sx={{ color: '#000' }} />
                        }
                        sx={{
                            height: '40px',
                            borderRadius: '10px',
                            borderColor: '#dadce0',
                            // color: '#3c4043',
                            color: '#000000',

                            textTransform: 'none',
                            fontSize: '14px',
                            // fontWeight: 'bold',
                            fontFamily: 'Roboto, Arial, sans-serif',
                            backgroundColor: 'white',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                borderColor: '#d2e3fc',
                            },
                            '& .MuiButton-startIcon': {
                                margin: 0,
                                marginRight: '8px',
                                '& > *': {
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '20px',
                                    height: '20px',
                                    overflow: 'visible'
                                }
                            }
                        }}
                    >
                        Continue with Apple
                    </Button>

                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 12.06C22 6.57 17.5 2.06 12 2.06C6.5 2.06 2 6.57 2 12.06C2 16.98 5.66 21.03 10.38 21.8V14.81H7.9V12.06H10.38V9.91C10.38 7.43 11.86 6.06 14.1 6.06C15.17 6.06 16.29 6.26 16.29 6.26V8.56H15.04C13.83 8.56 13.48 9.26 13.48 9.98V12.06H16.16L15.73 14.81H13.48V21.8C18.34 21.03 22 16.98 22 12.06Z" fill="#1877F2" />
                            </svg>
                        }
                        sx={{
                            height: '40px',
                            borderRadius: '10px',
                            borderColor: '#dadce0',
                            color: '#000000',
                            textTransform: 'none',
                            fontSize: '14px',
                            // fontWeight: 'bold',
                            fontFamily: 'Roboto, Arial, sans-serif',
                            backgroundColor: 'white',
                            display: 'flex',
                            justifyContent: 'center',

                            '&:hover': {
                                backgroundColor: 'rgba(24, 119, 242, 0.04)',
                                borderColor: '#d2e3fc',
                            },
                            '& .MuiButton-startIcon': {
                                margin: 0,
                                marginRight: '8px',
                                '& > *': {
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '20px',
                                    height: '20px',
                                    overflow: 'visible'
                                }
                            }
                        }}
                    >
                        Continue with Facebook
                    </Button>

                </Box>
            </Box>
        </Box>
    );
};

export default SignUp;
