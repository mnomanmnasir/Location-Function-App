import React, { useRef, useState } from 'react';
import {
    Box,
    Typography,
    FormControl,
    InputLabel,
    OutlinedInput,
    FormHelperText,
    InputAdornment,
    IconButton,
    Avatar,
    Select,
    MenuItem,
    Tabs,
    Tab,
    Link,
    Paper,
    Input,
    FormHelperText as MuiFormHelperText,
} from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { AddAPhotoOutlined, Visibility, VisibilityOff, Business, People } from '@mui/icons-material';
import CustomButton from '../components/UI/CustomButton';
import CustomTextField from '../components/UI/CustomTextField';
import bgImage from '../assets/bg-login-img.png';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DescriptionIcon from '@mui/icons-material/Description';
import DeleteIcon from '@mui/icons-material/Delete';

const BusinessRegistration = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [activeTab, setActiveTab] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    const handleTabChange = (event, newValue) => {
        if (newValue === 1) {
            // Navigate to BusinessEmployees when Employees tab is clicked
            navigate('/business-employees');
        } else {
            setActiveTab(newValue);
        }
    };

    const [uploadedDocuments, setUploadedDocuments] = useState([]);

    const handleDocumentUpload = (event) => {
        const files = Array.from(event.target.files);
        const newDocuments = files.map(file => ({
            name: file.name,
            file: file,
            type: file.type,
            size: file.size,
            lastModified: file.lastModified
        }));
        setUploadedDocuments(prev => [...prev, ...newDocuments]);
    };

    const handleRemoveDocument = (index) => {
        setUploadedDocuments(prev => prev.filter((_, i) => i !== index));
    };

    const [formData, setFormData] = React.useState({
        businessName: '',
        businessEmail: '',
        contactPersonTitle: '',
        phoneNumber: '',
        businessType: '',
        address: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = React.useState({});

    const businessTypes = [
        'Retail',
        'Wholesale',
        'Service',
        'Manufacturing',
        'Restaurant',
        'Healthcare',
        'Technology',
        'Other'
    ];

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
        if (!formData.businessEmail.trim()) newErrors.businessEmail = 'Business email is required';
        if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
        if (!formData.businessType) newErrors.businessType = 'Please select business type';
        if (!formData.address.trim()) newErrors.address = 'Business address is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Handle form submission (e.g., API call)
        console.log('Business registration submitted:', { ...formData, hasProfileImage: !!profileImage });
        // navigate('/dashboard');
    };

    const renderBusinessDetailsForm = () => (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                // mb: 4
            }}>
                <Box
                    sx={{
                        position: 'relative',
                        cursor: 'pointer',
                        '&:hover .MuiAvatar-root': {
                            opacity: 0.8,
                        },
                        '&:hover .camera-icon': {
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
                            border: '2px dashed #E0E0E0',
                            transition: 'all 0.3s',
                            backgroundColor: '#f9f9f9',
                            '&:hover': {
                                backgroundColor: '#f0f0f0',
                            }
                        }}
                    >
                        {!imagePreview && (
                            <Box sx={{ textAlign: 'center' }}>
                                <AddAPhotoOutlined sx={{ fontSize: 30, color: '#9E9E9E', mb: 1 }} />
                                <Typography variant="caption" display="block" color="text.secondary">
                                    Add Logo
                                </Typography>
                            </Box>
                        )}
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
                            '&:hover': {
                                backgroundColor: '#1565c0',
                            }
                        }}
                    >
                        <AddAPhotoOutlined sx={{ color: 'white', fontSize: 16 }} />
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
                            <Typography variant="caption" sx={{ color: 'white', lineHeight: 1, fontSize: '1.1rem' }}>×</Typography>
                        </Box>
                    )}
                </Box>
                {!imagePreview && (
                    <Typography variant="caption" color="textSecondary" sx={{ mt: 1, fontSize: '0.75rem' }}>
                    Click to upload your business logo
                </Typography>
            )}
        </Box>

            <CustomTextField
                fullWidth
                label="Business Name"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                error={!!errors.businessName}
                helperText={errors.businessName}
                variant="outlined"
                margin="normal"
                placeholder="Enter your business name"
            />

            <CustomTextField
                fullWidth
                label="Business Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                error={!!errors.address}
                helperText={errors.address}
                variant="outlined"
                margin="normal"
                multiline
                // rows={2}
                placeholder="Enter full business address"
            />

            <Box sx={{ gap: 2, width: '100%' }}>
                <CustomTextField
                    fullWidth
                    label="Contact Person Title"
                    name="contactPersonTitle"
                    value={formData.contactPersonTitle}
                    onChange={handleChange}
                    variant="outlined"
                    margin="normal"
                    // placeholder="e.g., Owner, Manager"
                />
                {/* <CustomTextField
                    fullWidth
                    label="Phone Number"
                    name="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber}
                    variant="outlined"
                    margin="normal"
                    placeholder="+1 (___) ___-____"
                /> */}
            </Box>

            <Box sx={{ gap: 2, width: '100%' }}>
                <CustomTextField
                    fullWidth
                    label="Business Type"
                    name="contactPersonTitle"
                    value={formData.contactPersonTitle}
                    onChange={handleChange}
                    variant="outlined"
                    margin="normal"
                    // placeholder="e.g., Owner, Manager"
                />
                {/* <CustomTextField
                    fullWidth
                    label="Phone Number"
                    name="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber}
                    variant="outlined"
                    margin="normal"
                    placeholder="+1 (___) ___-____"
                /> */}
            </Box>


            {/* Business Documents Section */}
            <Box sx={{ width: '100%' }}>
                <Typography variant="subtitle1" sx={{ 
                    fontWeight: 500, 
                    color: 'text.primary',
                    mb: 1
                }}>
                    Site Photo
                </Typography>
                <Box
                    sx={{
                        border: '2px dashed #e0e0e0',
                        borderRadius: 2,
                        p: 4,
                        textAlign: 'center',
                        backgroundColor: '#fafafa',
                        cursor: 'pointer',
                        '&:hover': {
                            backgroundColor: '#f5f5f5',
                            borderColor: '#1976d2',
                            '& .upload-icon': {
                                color: '#1976d2',
                            },
                            '& .upload-text': {
                                color: '#1976d2',
                            }
                        },
                        transition: 'all 0.3s ease-in-out',
                    }}
                    onClick={() => document.getElementById('document-upload').click()}
                >
                    <input
                        type="file"
                        id="document-upload"
                        accept=".pdf,.jpg,.jpeg,.png"
                        style={{ display: 'none' }}
                        onChange={handleDocumentUpload}
                        multiple
                    />
                    <CloudUploadIcon 
                        className="upload-icon"
                        sx={{ 
                            fontSize: 48, 
                            color: 'text.secondary',
                            mb: 1,
                            transition: 'color 0.3s ease-in-out',
                        }} 
                    />
                    <Typography 
                        variant="body1" 
                        className="upload-text"
                        sx={{
                            fontWeight: 500,
                            color: 'text.primary',
                            mb: 0.5,
                            transition: 'color 0.3s ease-in-out',
                        }}
                    >
                        Drag and drop files here or click to browse
                    </Typography>
                    <Typography 
                        variant="caption" 
                        color="text.secondary"
                        sx={{
                            fontSize: '0.75rem',
                            display: 'block',
                        }}
                    >
                        Supported formats: PDF, JPG, PNG (Max 5MB per file)
                    </Typography>
                </Box>

                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    width: '100%', 
                    mt: 1,
                    mb: 1
                }}>
                    <Link
                        component={RouterLink}
                        to="/business-employees"
                        sx={{
                            width: '100%',
                            maxWidth: '500px',
                            textDecoration: 'none',
                            '&:hover': {
                                textDecoration: 'none'
                            }
                        }}
                    >
                        <CustomButton
                            type="button"
                            variant="contained"
                            fullWidth
                            sx={{
                                py: 1.5,
                                borderRadius: '8px',
                                textTransform: 'none',
                                fontSize: '16px',
                                fontWeight: '600',
                                backgroundColor: '#1976d2',
                                '&:hover': {
                                    backgroundColor: '#1565c0',
                                    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)',
                                },
                                boxShadow: '0 2px 4px rgba(25, 118, 210, 0.15)',
                                transition: 'all 0.3s ease-in-out',
                                letterSpacing: '0.5px',
                                width: '100%',
                                color: '#fff',
                            }}
                        >
                            Next
                        </CustomButton>
                    </Link>
                </Box>
                {/* Display uploaded files */}
                {uploadedDocuments.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                        <Typography 
                            variant="subtitle2" 
                            sx={{ 
                                fontWeight: 500,
                                color: 'text.primary',
                                mb: 1,
                                display: 'block'
                            }}
                        >
                            Uploaded Documents ({uploadedDocuments.length})
                        </Typography>
                        <Box sx={{ 
                            maxHeight: '200px',
                            overflowY: 'auto',
                            border: '1px solid #e0e0e0',
                            borderRadius: 1,
                            backgroundColor: 'white',
                            '&::-webkit-scrollbar': {
                                width: '6px',
                            },
                            '&::-webkit-scrollbar-track': {
                                background: '#f1f1f1',
                                borderRadius: '10px',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                background: '#888',
                                borderRadius: '10px',
                                '&:hover': {
                                    background: '#666',
                                }
                            }
                        }}>
                            {uploadedDocuments.map((doc, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        p: 1.5,
                                        borderBottom: '1px solid #f0f0f0',
                                        '&:last-child': {
                                            borderBottom: 'none',
                                        },
                                        '&:hover': {
                                            backgroundColor: 'rgba(0, 0, 0, 0.02)',
                                        },
                                        transition: 'background-color 0.2s ease-in-out',
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', width: 'calc(100% - 40px)' }}>
                                        <DescriptionIcon 
                                            color="action" 
                                            sx={{ 
                                                mr: 1.5,
                                                color: '#757575',
                                            }} 
                                        />
                                        <Typography 
                                            variant="body2" 
                                            sx={{ 
                                                color: 'text.primary',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                maxWidth: '85%',
                                            }}
                                        >
                                            {doc.name}
                                        </Typography>
                                        <Typography 
                                            variant="caption" 
                                            sx={{ 
                                                color: 'text.secondary',
                                                ml: 'auto',
                                                fontSize: '0.7rem',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            {(doc.size / 1024).toFixed(1)} KB
                                        </Typography>
                                    </Box>
                                    <IconButton
                                        size="small"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemoveDocument(index);
                                        }}
                                        color="error"
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: 'rgba(244, 67, 54, 0.08)',
                                            },
                                            padding: '8px',
                                            marginLeft: '8px',
                                        }}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                )}
            </Box>
        </>
    );

    // Employees tab now navigates to BusinessEmployees page
    const renderEmployeesForm = () => null;

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

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    width: '100%',
                    maxWidth: '450px',
                    maxHeight: '90vh', // Limit height to 90% of viewport
                    overflowY: 'auto', // Enable vertical scrolling
                    p: { xs: 3, sm: 4 },
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    zIndex: 1,
                    position: 'relative',
                    margin: { xs: 'auto', md: '0 10% 0 auto' },
                    mx: { xs: 2, md: 0 },
                    mr: { md: '10%' },
                    my: 4,
                    '&::-webkit-scrollbar': {
                        width: '6px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: '#f1f1f1',
                        borderRadius: '10px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#888',
                        borderRadius: '10px',
                        '&:hover': {
                            background: '#555',
                        }
                    }
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        color: '#000',
                        fontSize: '24px',
                        fontWeight: 500,
                        textAlign: 'center',
                        mb: 0
                    }}
                >
                    Business Registration
                </Typography>

                <Paper sx={{ width: '100%', mb: 2, borderRadius: 2, boxShadow: 'none' }}>
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        variant="fullWidth"
                        indicatorColor="primary"
                        textColor="primary"
                        sx={{
                            '& .MuiTabs-indicator': {
                                height: '3px',
                                borderRadius: '3px 3px 0 0',
                            },
                        }}
                    >
                        <Tab
                            icon={<Business />}
                            label="Business Details"
                            iconPosition="start"
                            sx={{ textTransform: 'none', fontWeight: 500 }}
                        />
                        <Tab
                            icon={<People />}
                            label="Business Employees"
                            iconPosition="start"
                            sx={{ textTransform: 'none', fontWeight: 500 }}
                            onClick={() => navigate('/business-employees')}
                        />
                    </Tabs>
                </Paper>

                {activeTab === 0 ? renderBusinessDetailsForm() : renderEmployeesForm()}

            </Box>
        </Box>
    );
};

export default BusinessRegistration;
