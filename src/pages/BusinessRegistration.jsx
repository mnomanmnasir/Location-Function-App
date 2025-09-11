import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    TextField,
    Button,
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
    Paper
} from '@mui/material';
import { AddAPhotoOutlined, Visibility, VisibilityOff, Business, People } from '@mui/icons-material';
import CustomButton from '../components/UI/CustomButton';
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

            <TextField
                fullWidth
                label="Business Name"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                error={!!errors.businessName}
                helperText={errors.businessName}
                variant="outlined"
                margin="normal"
            />
            {/* <TextField
                fullWidth
                label="Business Email"
                name="businessEmail"
                type="email"
                value={formData.businessEmail}
                onChange={handleChange}
                error={!!errors.businessEmail}
                helperText={errors.businessEmail}
                variant="outlined"
                margin="normal"
            /> */}
            <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                error={!!errors.address}
                helperText={errors.address}
                variant="outlined"
                margin="normal"
                multiline
            // rows={2}
            />

            <TextField
                fullWidth
                label="Contact Person title"
                name="contactPersonTitle"
                type="text"
                value={formData.contactPersonTitle}
                onChange={handleChange}
                // error={!!errors.phoneNumber}
                // helperText={errors.phoneNumber}
                variant="outlined"
                margin="normal"
            />

            <TextField
                fullWidth
                label="Contact/Phone Number"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
                variant="outlined"
                margin="normal"
            />

            <FormControl fullWidth margin="normal" error={!!errors.businessType}>
                <InputLabel id="business-type-label">Business Type</InputLabel>
                <Select
                    labelId="business-type-label"
                    id="businessType"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    label="Business Type"
                >
                    {businessTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                </Select>
                {errors.businessType && <FormHelperText>{errors.businessType}</FormHelperText>}
            </FormControl>

            {/* Business Documents Section */}
            <Box sx={{ width: '100%', mt: 2 }}>
                {/* <Typography variant="subtitle1" sx={{ fontWeight: 500, color: 'text.primary' }}>
                    Site Photo
                </Typography> */}
                <Box
                    sx={{
                        border: '2px dashed #e0e0e0',
                        borderRadius: 1,
                        p: 3,
                        textAlign: 'center',
                        backgroundColor: '#fafafa',
                        cursor: 'pointer',
                        '&:hover': {
                            backgroundColor: '#f5f5f5',
                            borderColor: '#1976d2',
                        },
                        transition: 'all 0.3s',
                    }}
                    onClick={() => document.getElementById('document-upload').click()}
                >
                    <input
                        type="file"
                        id="document-upload"
                        accept=".pdf,.jpg,.jpeg,.png"
                        style={{ display: 'none' }}
                        onChange={handleDocumentUpload}
                    />
                    <CloudUploadIcon color="action" sx={{ fontSize: 48 }} />
                    <Typography variant="body1" sx={{}}>
                        Drag and drop files here or click to browse
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Supported formats: PDF, JPG, PNG (Max size: 5MB)
                    </Typography>
                </Box>

                {/* Display uploaded files */}
                {uploadedDocuments.length > 0 && (
                    <Box sx={{}}>
                        <Typography variant="subtitle2" sx={{}}>
                            Uploaded Documents:
                        </Typography>
                        {uploadedDocuments.map((doc, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    // p: 1.5,
                                    border: '1px solid #e0e0e0',
                                    borderRadius: 1,
                                    // mb: 1,   
                                    backgroundColor: 'white',
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <DescriptionIcon color="action" sx={{ mr: 1.5 }} />
                                    <Typography variant="body2" sx={{ color: 'text.primary' }}>
                                        {doc.name}
                                    </Typography>
                                </Box>
                                <IconButton
                                    size="small"
                                    onClick={() => handleRemoveDocument(index)}
                                    color="error"
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        ))}
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
                            component="a"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate('/business-employees');
                            }}
                        />
                    </Tabs>
                </Paper>

                {activeTab === 0 ? renderBusinessDetailsForm() : renderEmployeesForm()}

            </Box>
        </Box>
    );
};

export default BusinessRegistration;
