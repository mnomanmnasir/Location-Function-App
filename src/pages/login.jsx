import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Link,
  TextField,
  InputAdornment,
  IconButton,
  Divider,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { Google, Visibility, VisibilityOff } from '@mui/icons-material';
import bgImage from '../assets/bg-login-img.png';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login form submitted:', { email, password });
    // Handle login logic here
  };

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

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
          maxWidth: '448px',
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: { xs: '24px 20px 36px', sm: '48px 40px 36px' },
          margin: { xs: '20px', sm: '40px' },
          zIndex: 1,
          boxShadow: '0 2px 6px 0 rgba(0,0,0,0.12)',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
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
            Welcome Back
          </Typography>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              color: '#202124',
              fontSize: '16px',
              fontWeight: 400,
              mb: 3,
              fontFamily: 'Roboto, Arial, sans-serif'
            }}
          >
           Let’s login to continue for Feedback Work
          </Typography>
        </Box>

        {/* Social Login Buttons */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px', mb: 3 }}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: '24px',
                height: '24px',
                '& svg': {
                  width: '20px',
                  height: '20px'
                }
              }}>
                <Google />
              </Box>
            }
            sx={{
              height: '40px',
              borderRadius: '20px',
              borderColor: '#dadce0',
              color: '#3c4043',
              textTransform: 'none',
              fontSize: '14px',
              fontWeight: 500,
              fontFamily: 'Roboto, Arial, sans-serif',
              backgroundColor: 'white',
              '&:hover': {
                backgroundColor: 'rgba(66, 133, 244, 0.04)',
                borderColor: '#d2e3fc',
              },
              '& .MuiButton-startIcon': {
                marginRight: '8px',
                marginLeft: 0,
                '& > *': {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%'
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
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: '24px',
                height: '24px',
                '& svg': {
                  width: '20px',
                  height: '20px',
                  display: 'block'
                }
              }}>
                <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 0C4.477 0 0 4.477 0 10C0 15.523 4.477 20 10 20C15.523 20 20 15.523 20 10C20 4.477 15.523 0 10 0Z" fill="#1877F2"/>
                  <path d="M13.5 10.25C13.5 9.01 12.66 8 11.5 8H9.5V12.5H11.5C12.66 12.5 13.5 11.49 13.5 10.25Z" fill="white"/>
                  <path d="M11.5 8H9.5V12.5H11.5C12.66 12.5 13.5 11.49 13.5 10.25C13.5 9.01 12.66 8 11.5 8Z" fill="white"/>
                </svg>
              </Box>
            }
            sx={{
              height: '40px',
              borderRadius: '20px',
              borderColor: '#dadce0',
              color: '#3c4043',
              textTransform: 'none',
              fontSize: '14px',
              fontWeight: 500,
              fontFamily: 'Roboto, Arial, sans-serif',
              backgroundColor: 'white',
              '&:hover': {
                backgroundColor: 'rgba(24, 119, 242, 0.04)',
                borderColor: '#d2e3fc',
              },
              '& .MuiButton-startIcon': {
                marginRight: '8px',
                marginLeft: 0,
                '& > *': {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%'
                }
              }
            }}
          >
            Continue with Facebook
          </Button>
          
          <Button
            fullWidth
            variant="outlined"
            startIcon={
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: '24px',
                height: '24px',
                '& svg': {
                  width: '20px',
                  height: '20px',
                  display: 'block'
                }
              }}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.67 15.63 16.89 16.83 15.72 17.62V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
                  <path d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.72 17.62C14.74 18.27 13.48 18.75 12 18.75C9.14 18.75 6.71 16.88 5.86 14.27H2.18V17.05C3.99 20.59 7.7 23 12 23Z" fill="#34A853"/>
                  <path d="M5.86 14.27C5.46 13.09 5.46 11.83 5.86 10.65V7.87H2.18C0.79 10.58 0.79 13.65 2.18 16.36L5.86 14.27Z" fill="#FBBC05"/>
                  <path d="M12 5.25C13.53 5.25 14.91 5.8 15.98 6.88L19.36 3.5C17.45 1.69 14.96 0.5 12 0.5C7.7 0.5 3.99 2.9 2.18 6.87L5.86 9.96C6.71 7.35 9.14 5.25 12 5.25Z" fill="#EA4335"/>
                </svg>
              </Box>
            }
            sx={{
              height: '40px',
              borderRadius: '20px',
              borderColor: '#dadce0',
              color: '#3c4043',
              textTransform: 'none',
              fontSize: '14px',
              fontWeight: 500,
              fontFamily: 'Roboto, Arial, sans-serif',
              backgroundColor: 'white',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                borderColor: '#d2e3fc',
              },
              '& .MuiButton-startIcon': {
                marginRight: '8px',
                marginLeft: 0,
                '& > *': {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%'
                }
              }
            }}
          >
            Continue with Apple
          </Button>
        </Box>

        {/* Divider with "or" */}
        <Box sx={{ position: 'relative', my: 2 }}>
          <Divider sx={{ borderColor: '#e0e0e0' }}>
            <Box 
              component="span" 
              sx={{ 
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                px: 2,
                bgcolor: 'white',
                color: '#5f6368',
                fontSize: '14px',
                fontFamily: 'Roboto, Arial, sans-serif'
              }}
            >
              or
            </Box>
          </Divider>
        </Box>

        {/* Email Field */}
        <Box>
          <TextField
            fullWidth
            label="Email or phone"
            variant="outlined"
            value={email}
            onChange={handleEmailChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                height: '56px',
                '& fieldset': {
                  borderColor: '#e0e0e0',
                  borderRadius: '4px',
                },
                '&:hover fieldset': {
                  borderColor: '#bdbdbd',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1a73e8',
                  borderWidth: '2px',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#5f6368',
                '&.Mui-focused': {
                  color: '#1a73e8',
                },
              },
            }}
          />
        </Box>
        
        {/* Password Field */}
        <Box>
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            value={password}
            onChange={handlePasswordChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={togglePasswordVisibility}
                    edge="end"
                    sx={{ color: '#5f6368' }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                height: '56px',
                '& fieldset': {
                  borderColor: '#e0e0e0',
                  borderRadius: '4px',
                },
                '&:hover fieldset': {
                  borderColor: '#bdbdbd',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1a73e8',
                  borderWidth: '2px',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#5f6368',
                '&.Mui-focused': {
                  color: '#1a73e8',
                },
              },
            }}
          />
          
          <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <FormControlLabel
              control={
                <Checkbox
                  // checked={showPassword}
                  // onChange={togglePasswordVisibility}
                  size="small"
                  sx={{
                    color: '#5f6368',
                    p: '4px',
                    '&.Mui-checked': {
                      color: '#1a73e8',
                    },
                  }}
                />
              }
              label={
                <Typography sx={{ 
                  fontSize: '14px',
                  color: '#000',
                  fontFamily: 'Roboto, Arial, sans-serif'
                }}>
                  Keep me signed in 
                </Typography>
              }
              sx={{ m: 0 }}
            />
            <Link 
              href="#" 
              sx={{ 
                color: '#1a73e8',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 500,
                fontFamily: 'Roboto, Arial, sans-serif',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              Forgot password?
            </Link>
          </Box>
        </Box>

        {/* Password Field - Initially Hidden */}
        <Box sx={{ display: 'none', mb: 2 }}>
          <TextField
            fullWidth
            label="Enter your password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            value={password}
            onChange={handlePasswordChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={togglePasswordVisibility}
                    edge="end"
                    sx={{ color: '#5f6368' }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                height: '54px',
                '& fieldset': {
                  borderColor: '#e0e0e0',
                  borderRadius: '4px',
                },
                '&:hover fieldset': {
                  borderColor: '#bdbdbd',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1a73e8',
                  borderWidth: '2px',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#5f6368',
                '&.Mui-focused': {
                  color: '#1a73e8',
                },
              },
            }}
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <FormControlLabel
              control={
                <Checkbox 
                  checked={showPassword}
                  onChange={togglePasswordVisibility}
                  size="small"
                  sx={{ 
                    color: '#5f6368',
                    p: '4px',
                    '&.Mui-checked': {
                      color: '#1a73e8',
                    },
                  }}
                />
              }
              label={
                <Typography sx={{ 
                  fontSize: '14px',
                  color: '#5f6368',
                  fontFamily: 'Roboto, Arial, sans-serif'
                }}>
                  Show password
                </Typography>
              }
              sx={{ m: 0 }}
            />
            <Link 
              href="#" 
              sx={{ 
                color: '#1a73e8',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 500,
                fontFamily: 'Roboto, Arial, sans-serif',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              Forgot password?
            </Link>
          </Box>
        </Box>

        {/* Sign In Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Button
            variant="contained"
            type="submit"
            sx={{
              width: '450px',
              height: '40px',
              borderRadius: '4px',
              backgroundColor: '#1a73e8',
              color: 'white',
              fontSize: '14px',
              fontWeight: 500,
              fontFamily: 'Roboto, Arial, sans-serif',
              textTransform: 'none',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: '#1b66c9',
                boxShadow: '0 1px 2px 0 rgba(66,133,244,0.3), 0 1px 3px 1px rgba(66,133,244,0.15)'
              },
              '&.Mui-disabled': {
                backgroundColor: 'rgba(0, 0, 0, 0.12)',
                color: 'rgba(0, 0, 0, 0.26)'
              }
            }}
          >
            Sign in
          </Button>
        </Box>
      </Box>
    </Box>
  );  
};

export default Login;