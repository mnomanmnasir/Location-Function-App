import React from 'react';
import { TextField, InputAdornment, IconButton, Box } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const CustomTextField = ({
  label,
  type = 'text',
  value,
  onChange,
  showPassword = false,
  showConfirmPassword = false,
  onTogglePasswordVisibility,
  onToggleConfirmPasswordVisibility,
  fullWidth = true,
  required = false,
  placeholder = '',
  ...props
}) => {
  const isPasswordField = type === 'password' || type === 'confirmPassword';
  const showText = type === 'password' ? showPassword : showConfirmPassword;
  
  // Create input props object
  const inputProps = {
    ...props.InputProps,
    endAdornment: isPasswordField ? (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={type === 'password' ? onTogglePasswordVisibility : onToggleConfirmPasswordVisibility}
          edge="end"
          size="small"
          sx={{ color: '#5f6368' }}
        >
          {showText ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    ) : null
  };
  
  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        {...props}
        label={label}
        type={isPasswordField && !showText ? 'password' : 'text'}
        value={value}
        onChange={onChange}
        fullWidth={fullWidth}
        required={required}
        placeholder={placeholder}
        variant="outlined"
        size="small"
        InputProps={inputProps}
        sx={{
          '& .MuiOutlinedInput-root': {
            height: '40px',
            borderRadius: '4px',
            backgroundColor: '#fff',
            '& fieldset': {
              borderColor: '#dadce0',
            },
            '&:hover fieldset': {
              borderColor: '#1a73e8',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1a73e8',
              borderWidth: '1px',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#5f6368',
            '&.Mui-focused': {
              color: '#1a73e8',
            },
          },
        }}
        InputProps={{
          endAdornment: type === 'password' && (
            <InputAdornment position="end">
              <IconButton
                onClick={onTogglePasswordVisibility}
                edge="end"
                sx={{
                  color: '#5f6368',
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                }}
              >
                {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...props}
      />
    </Box>
  );
};

export default CustomTextField;
