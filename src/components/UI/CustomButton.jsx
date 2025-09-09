import React from 'react';
import { Button } from '@mui/material';

const CustomButton = ({
  children,
  variant = 'contained',
  type = 'button',
  fullWidth = false,
  onClick,
  disabled = false,
  sx = {},
  ...props
}) => {
  return (
    <Button
      variant={variant}
      type={type}
      fullWidth={fullWidth}
      onClick={onClick}
      disabled={disabled}
      sx={{
        minWidth: '20px',
        height: '40px',
        borderRadius: '4px',
        textTransform: 'none',
        fontSize: '14px',
        fontWeight: 500,
        fontFamily: 'Roboto, Arial, sans-serif',
        boxShadow: 'none',
        '&:hover': {
          boxShadow: '0 1px 2px 0 rgba(66,133,244,0.3), 0 1px 3px 1px rgba(66,133,244,0.15)'
        },
        // ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
