import React from 'react';
import { TextField, InputAdornment, IconButton, Box } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const CustomTextField = ({
  label,
  type = 'text',
  value,
  onChange,
  showPassword = false,
  onTogglePasswordVisibility,
  fullWidth = true,
  required = false,
  placeholder = '',
  ...props
}) => {
  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        label={label}
        type={type === 'password' && showPassword ? 'text' : type}
        value={value}
        onChange={onChange}
        fullWidth={fullWidth}
        required={required}
        placeholder={placeholder}
        variant="outlined"
        size="small"
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
