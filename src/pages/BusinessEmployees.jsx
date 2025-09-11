import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    TextField,
    Button,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Avatar,
    InputAdornment
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon } from '@mui/icons-material';
import CustomButton from '../components/UI/CustomButton';
import bgImage from '../assets/bg-login-img.png';

const BusinessEmployees = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    // Sample employee data
    const [employees, setEmployees] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', position: 'Manager' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', position: 'Developer' },
    ]);

    const handleAddEmployee = () => {
        // Navigate to add employee form
        // navigate('/add-employee');
        console.log('Add new employee');
    };

    const handleEdit = (id) => {
        // Navigate to edit employee form
        // navigate(`/edit-employee/${id}`);
        console.log('Edit employee:', id);
    };

    const handleDelete = (id) => {
        // Delete employee logic
        setEmployees(employees.filter(emp => emp.id !== id));
    };

    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.position.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                sx={{
                    width: '100%',
                    maxWidth: '800px',
                    p: { xs: 3, sm: 4 },
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                    zIndex: 1,
                    position: 'relative',
                    margin: { xs: '20px', md: '40px' },
                    mx: { xs: 2, md: 4 },
                    mr: { md: '10%' },
                    my: 4
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h5" sx={{ color: '#000', fontWeight: 500 }}>
                        Employee Management
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={handleAddEmployee}
                        sx={{ textTransform: 'none' }}
                    >
                        Add Employee
                    </Button>
                </Box>

                <TextField
                    fullWidth
                    placeholder="Search employees..."
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ mb: 3 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />

                <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableCell>Employee</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Position</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredEmployees.map((employee) => (
                                <TableRow key={employee.id} hover>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Avatar sx={{ width: 40, height: 40 }}>
                                                {employee.name.charAt(0)}
                                            </Avatar>
                                            {employee.name}
                                        </Box>
                                    </TableCell>
                                    <TableCell>{employee.email}</TableCell>
                                    <TableCell>{employee.position}</TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={() => handleEdit(employee.id)} color="primary">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => handleDelete(employee.id)}
                                            color="error"
                                            sx={{ ml: 1 }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {filteredEmployees.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                                        <Typography color="textSecondary">
                                            {searchTerm ? 'No matching employees found' : 'No employees added yet'}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        variant="outlined"
                        onClick={() => navigate(-1)}
                        sx={{ mr: 2, textTransform: 'none' }}
                    >
                        Back
                    </Button>
                    <CustomButton
                        variant="contained"
                        onClick={() => console.log('Save Changes')}
                    >
                        Save Changes
                    </CustomButton>
                </Box>
            </Box>
        </Box>
    );
};

export default BusinessEmployees;
