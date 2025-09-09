import React from 'react';
import {
  TextField,
  Button,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const CustomForm = ({
  fields = [],
  onSubmit,
  submitButtonText = 'Submit',
  submitButtonProps = {},
  formStyles = {},
  children,
  showPassword = false,
  onTogglePassword,
}) => {
  const [formData, setFormData] = React.useState({});
  const [errors, setErrors] = React.useState({});

  React.useEffect(() => {
    // Initialize form data with default values
    const initialData = {};
    fields.forEach((field) => {
      initialData[field.name] = field.defaultValue || '';
    });
    setFormData(initialData);
  }, [fields]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    let isValid = true;

    fields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = 'This field is required';
        isValid = false;
      } else if (field.validate) {
        const error = field.validate(formData[field.name], formData);
        if (error) {
          newErrors[field.name] = error;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const renderField = (field) => {
    const commonProps = {
      fullWidth: true,
      name: field.name,
      label: field.label,
      value: formData[field.name] ?? '',
      onChange: handleChange,
      error: !!errors[field.name],
      helperText: errors[field.name] || field.helperText,
      disabled: field.disabled,
      required: field.required,
      placeholder: field.placeholder,
      variant: 'outlined',
      margin: 'normal',
      sx: { mb: 2, ...field.sx },
      InputProps: {
        ...field.InputProps,
        ...(field.type === 'password' && {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={onTogglePassword}
                edge="end"
                size="large"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        })
      },
      inputProps: field.inputProps,
    };

    switch (field.type) {
      case 'select':
        return (
          <FormControl fullWidth error={!!errors[field.name]}>
            <InputLabel>{field.label}</InputLabel>
            <Select
              {...commonProps}
              value={formData[field.name] || ''}
              label={field.label}
            >
              {field.options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {errors[field.name] && (
              <FormHelperText>{errors[field.name]}</FormHelperText>
            )}
          </FormControl>
        );

      case 'checkbox':
        return (
          <FormControl component="fieldset" error={!!errors[field.name]}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData[field.name] || false}
                    onChange={handleChange}
                    name={field.name}
                    color="primary"
                  />
                }
                label={field.label}
              />
            </FormGroup>
            {errors[field.name] && (
              <FormHelperText>{errors[field.name]}</FormHelperText>
            )}
          </FormControl>
        );

      case 'multiline':
        return (
          <TextField
            {...commonProps}
            multiline
            rows={field.rows || 4}
          />
        );

      case 'password':
        return (
          <TextField
            {...commonProps}
            type="password"
          />
        );

      case 'number':
        return (
          <TextField
            {...commonProps}
            type="number"
            inputProps={{ min: field.min, max: field.max, step: field.step }}
          />
        );

      default:
        return <TextField {...commonProps} type={field.type || 'text'} />;
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ 
        width: '100%', 
        '& .MuiFormControl-root': {
          mb: 2
        },
        ...formStyles 
      }}
      noValidate
    >
      <Grid container spacing={2}>
        {fields.map((field) => (
          <Grid
            item
            xs={12}
            sm={field.grid?.sm || 12}
            md={field.grid?.md}
            lg={field.grid?.lg}
            key={field.name}
          >
            {renderField(field)}
          </Grid>
        ))}
      </Grid>

      {children}

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          {...submitButtonProps}
        >
          {submitButtonText}
        </Button>
      </Box>
    </Box>
  );
};

export default CustomForm;
