import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  styled,
  Divider,
  Link,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { Google, Facebook, Apple, VisibilityOff, Visibility, CheckCircle } from '@mui/icons-material';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

import bgImage from '../assets/bg-login-img.png';
import CustomButton from '../components/UI/CustomButton';

const AccountTypeCard = styled(Card)(({ selected }) => ({
  width: '100%',
  height: 'auto',
  cursor: 'pointer',
  borderRadius: '8px',
  border: selected ? '2px solid #1976d2' : '1px solid #e0e0e0',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    borderColor: '#1976d2',
    boxShadow: '0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)'
  },
  '& .MuiCardContent-root': {
    // padding: '24px 16px',
    // display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    textAlign: 'center',
    // '&:last-child': {
    //   paddingBottom: '24px'
    // }
  }
}));

const SelectAccountType = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const navigate = useNavigate();

  const accountTypes = [
    {
      id: 'personal',
      title: 'Personal',
      // description: 'For personal use',
      icon: <PersonIcon />
    },
    {
      id: 'business',
      title: 'Business',
      // description: 'For business use',
      icon: <BusinessIcon />
    },
    {
      id: 'employee',
      title: 'Employee',
      // description: 'For business use',
      icon: <PersonOutlineIcon />
    }
  ];

  const handleSelectType = (type) => {
    setSelectedType(type);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedType) {
      // Get the selected account type title
      const selectedAccount = accountTypes.find(type => type.id === selectedType);
      // Navigate to complete profile page with the selected account type
      navigate('/complete-profile', {
        state: {
          accountType: selectedAccount.title || ''
        }
      });
    }
  };

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
    // Handle social login logic here
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

      {/* Account Type Selection Form */}
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
              fontSize: '24px',
              fontWeight: 400,
              fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
              // fontWeight: 'bold',
              mb: 1
            }}
          >
            Select Account Type
          </Typography>
        </Box>

        {/* Account Type Cards */}
        <Box sx={{
          width: '100%',
          maxWidth: '1000px',
          margin: '0 auto',
          // padding: '0 0px',
          '@media (max-width: 600px)': {
            padding: '0 0px'
          }
        }}>
          <Box sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            flexWrap: 'wrap',
            '@media (max-width: 600px)': {
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px'
            }
          }}>
            {accountTypes.map((type) => (
              <Box
                key={type.id}
                sx={{
                  position: 'relative',
                  width: 'calc(50% - 12px)',
                  minWidth: '240px',
                  '@media (max-width: 600px)': {
                    width: '100%',
                    maxWidth: '400px'
                  }
                }}
              >
                <AccountTypeCard
                  selected={selectedType === type.id}
                  onClick={() => handleSelectType(type.id)}
                  sx={{
                    '&:hover': {
                      borderColor: '#1976d2',
                      '& .check-icon': {
                        opacity: 0.7
                      }
                    }
                  }}
                >
                  <CardContent sx={{ p: 2, pr: 6 }}>
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                      gap: 2
                    }}>
                      <Box sx={{
                        color: selectedType === type.id ? '#1976d2' : '#5f6368',
                        transition: 'color 0.2s ease-in-out',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        backgroundColor: selectedType === type.id ? '#e8f0fe' : '#f5f5f5',
                        flexShrink: 0
                      }}>
                        {React.cloneElement(type.icon, {
                          sx: {
                            fontSize: 24,
                            color: selectedType === type.id ? '#1976d2' : '#5f6368',
                          }
                        })}
                      </Box>
                      <Typography
                        variant="subtitle1"
                        component="div"
                        sx={{
                          fontWeight: 500,
                          color: selectedType === type.id ? '#1976d2' : '#202124',
                          flexGrow: 1,
                          textAlign: 'left',
                          fontSize: '1rem',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {type.title}
                      </Typography>
                    </Box>
                  </CardContent>
                  {selectedType === type.id && (
                    <CheckCircle
                      className="check-icon"
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        right: '16px',
                        transform: 'translateY(-50%)',
                        color: '#1976d2',
                        fontSize: '24px',
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        boxShadow: '0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)'
                      }}
                    />
                  )}
                </AccountTypeCard>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Continue Button */}
        <Box sx={{ width: '100%', mt: 2 }}>
          <CustomButton
            type="submit"
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            disabled={!selectedType}
            sx={{
              py: 1.5,
              fontSize: '0.875rem',
              fontWeight: 500,
              textTransform: 'none',
              borderRadius: '4px',
              boxShadow: 'none',
              backgroundColor: '#1a73e8',
              '&:hover': {
                backgroundColor: '#1765cc',
                boxShadow: '0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)',
              },
              '&:disabled': {
                backgroundColor: 'rgba(0, 0, 0, 0.12)',
                color: 'rgba(0, 0, 0, 0.26)'
              }
            }}
          >
            Next
          </CustomButton>
        </Box>
      </Box>
    </Box>
  );
};

export default SelectAccountType;
