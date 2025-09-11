import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Link,
  IconButton,
  InputAdornment,
  Divider
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import bgImage from '../assets/bg-login-img.png';
import CustomButton from '../components/UI/CustomButton';

const VerificationCode = () => {
  const [code, setCode] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const inputRefs = useRef([]);
  const { email } = location.state || {};

  useEffect(() => {
    // Auto focus first input
    inputRefs.current[0]?.focus();

    // Set up countdown timer
    const timer = countdown > 0 && setInterval(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleCodeChange = (index, value) => {
    if (value === '' || /^[0-9]$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Move to next input if there's a value
      if (value !== '' && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && code[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendCode = () => {
    // Reset countdown and resend code logic here
    setCountdown(30);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Here you would typically verify the code with your backend
    const verificationCode = code.join('');
    console.log('Verification code:', verificationCode);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // On successful verification, redirect to login or dashboard
      navigate('/login', {
        state: {
          message: 'Verification successful! Please login with your credentials.'
        }
      });
    }, 1000);
  };

  const isCodeComplete = code.every(digit => digit !== '');

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

      {/* Verification Form */}
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
          gap: '24px',
          zIndex: 1,
          position: 'relative',
          margin: 0,
          height: '60vh',
          margin: { xs: 0, md: 1 },
          overflowY: 'auto',
          margin: { xs: 2, md: 15 },
          overflowY: 'auto'
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h5"
            sx={{
              color: '#000',
              fontWeight: 'bold',
              mb: 1,
              fontSize: '24px',
              fontFamily: 'Google Sans, Roboto, Arial, sans-serif'
            }}
          >
            Enter Verification Code
          </Typography>
        </Box>

        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '16px',
          mb: 3,
          '& .MuiOutlinedInput-root': {
            width: '56px',
            height: '56px',
            '& input': {
              textAlign: 'center',
              fontSize: '24px',
              padding: '8px',
            },
            '& fieldset': {
              borderRadius: '8px',
              borderColor: '#e0e0e0',
            },
            '&:hover fieldset': {
              borderColor: '#1a73e8',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1a73e8',
              borderWidth: '1px',
            },
          },
        }}>
          {code.map((digit, index) => (
            <TextField
              key={index}
              inputRef={el => inputRefs.current[index] = el}
              value={digit}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              variant="outlined"
              inputProps={{
                maxLength: 1,
                type: 'tel',
                pattern: '[0-9]*',
                inputMode: 'numeric',
                'aria-label': `Digit ${index + 1} of verification code`
              }}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: digit ? '#1a73e8' : '#e0e0e0',
                },
              }}
            />
          ))}
        </Box>


        <CustomButton
          type="submit"
          variant="contained"
          fullWidth
          //   disabled={!isCodeComplete || isLoading}
          sx={{
            py: 1.5,
            borderRadius: '8px',
            textTransform: 'none',
            fontSize: '16px',
            fontWeight: '500',
            backgroundColor: '#1a73e8',
            '&:hover': {
              backgroundColor: '#1b66c9',
            },
          }}
        >
          {/* {isLoading ? 'Verifying...' : 'Verify'} */}
          Confirm Code
        </CustomButton>
      </Box>
    </Box>
  );
};

export default VerificationCode;
