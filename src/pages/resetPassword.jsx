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
import { Google, Facebook, Apple, VisibilityOff, Visibility } from '@mui/icons-material';
import CustomTextField from '../components/UI/CustomTextField';
import bgImage from '../assets/bg-login-img.png';
import CustomButton from '../components/UI/CustomButton';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login form submitted:', { email, password,confirmPassword });
    // Handle login logic here
  };

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
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

      {/* Login Form */}
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
        {/* Header */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h5"
            sx={{
              color: '#000',
              // fontSize: '24px',
              fontWeight: 'bold',
              mb: 1,
              fontFamily: 'Google Sans, Roboto, Arial, sans-serif'
            }}
          >
           Enter New Password
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
           Set Complex passwords to protect
          </Typography>
        </Box>

        {/* Password Field */}
        <CustomTextField
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          showPassword={showPassword}
          onTogglePasswordVisibility={togglePasswordVisibility}
          placeholder="Enter your password"
        />
        
        {/* Confirm Password Field */}
        <CustomTextField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          showPassword={showConfirmPassword}
          onTogglePasswordVisibility={toggleConfirmPasswordVisibility}
          placeholder="Confirm your password"
        />

  

        {/* Sign In Button */}
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
           Set new Password
          </CustomButton>
        </Box>
      </Box>

     


    </Box>
  );
};

export default Login;