import React, { useRef } from 'react';
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
    MenuItem,
    Avatar,
    Stack
} from '@mui/material';
import { Visibility, VisibilityOff, AddAPhotoOutlined } from '@mui/icons-material';
import CustomButton from '../components/UI/CustomButton';
import bgImage from '../assets/bg-login-img.png';
import CustomTextField from '../components/UI/CustomTextField';


const CompleteProfile = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [showPassword, setShowPassword] = React.useState(false);
    // Get the selected account type from the location state
    const accountType = location.state?.accountType || '';
    const [profileImage, setProfileImage] = React.useState(null);
    const [imagePreview, setImagePreview] = React.useState('');


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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleRemoveImage = (e) => {
        e.stopPropagation();
        setProfileImage(null);
        setImagePreview('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
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

        // Create form data for file upload
        const submitData = new FormData();
        submitData.append('username', formData.username);
        submitData.append('title', formData.title);
        submitData.append('expertise', formData.expertise);
        submitData.append('accountType', formData.accountType);
        if (profileImage) {
            submitData.append('profileImage', profileImage);
        }

        // Handle form submission (e.g., API call)
        console.log('Form submitted:', { ...formData, accountType, hasProfileImage: !!profileImage });

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

                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box
                        sx={{
                            position: 'relative',
                            cursor: 'pointer',
                            '&:hover .MuiAvatar-root': {
                                opacity: 0.8,
                            },
                            '&:hover .camera-icon': {
                                opacity: 1,
                            },
                            '&:hover .remove-icon': {
                                opacity: 1,
                            }
                        }}
                        onClick={handleImageClick}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            accept="image/*"
                            style={{ display: 'none' }}
                        />
                        <Avatar
                            src={imagePreview}
                            sx={{
                                width: 120,
                                height: 120,
                                border: '2px solid #E0E0E0',
                                transition: 'opacity 0.3s',
                            }}
                        >
                            {!imagePreview && <AddAPhotoOutlined sx={{ fontSize: 40, color: '#9E9E9E' }} />}
                        </Avatar>
                        <Box
                            className="camera-icon"
                            sx={{
                                position: 'absolute',
                                bottom: 8,
                                right: 8,
                                backgroundColor: '#1976d2',
                                borderRadius: '50%',
                                width: 32,
                                height: 32,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: imagePreview ? 1 : 0.7,
                                transition: 'opacity 0.3s',
                            }}
                        >
                            <AddAPhotoOutlined sx={{ color: 'white', fontSize: 18 }} />
                        </Box>
                        {imagePreview && (
                            <Box
                                className="remove-icon"
                                onClick={handleRemoveImage}
                                sx={{
                                    position: 'absolute',
                                    top: 8,
                                    right: 8,
                                    backgroundColor: '#f44336',
                                    borderRadius: '50%',
                                    width: 24,
                                    height: 24,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    opacity: 0,
                                    transition: 'opacity 0.3s',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor: '#d32f2f',
                                    }
                                }}
                            >
                                <Typography variant="caption" sx={{ color: 'white', lineHeight: 1 }}>×</Typography>
                            </Box>
                        )}
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <CustomTextField
                        fullWidth
                        label="Username (Optional)"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        error={!!errors.username}
                        helperText={errors.username}
                        variant="outlined"
                        margin="none"
                    />

                    <CustomTextField
                        fullWidth
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        error={!!errors.title}
                        helperText={errors.title}
                        variant="outlined"
                        margin="none"
                    />
                </Box>

                {/* <Box> */}
                    <CustomTextField
                        fullWidth
                        value={formData.expertise}
                        // disabled={!!accountType}
                        label="Expertise"
                        name="expertise"
                        onChange={handleChange}
                    />
                {/* </Box> */}

                {/* <Box sx={{ mt: 3 }}> */}
                    <CustomTextField
                        fullWidth
                        value={formData.accountType}
                        disabled={!!accountType}
                        label="Account Type"
                        name="accountType"
                        onChange={handleChange}
                        input={<OutlinedInput label="Account Type" />}
                    // displayEmpty
                    />
                {/* </Box> */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <CustomButton
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                            // py: 1.5,
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
