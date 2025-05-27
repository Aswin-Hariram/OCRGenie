import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, Paper, Snackbar } from '@mui/material';
import { Email, LocationOn, Phone } from '@mui/icons-material';
import axios from 'axios';
import { GithubLoginButton, InstagramLoginButton, LinkedInLoginButton } from 'react-social-login-buttons';

function Contact() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        message: '',
    });
    const [errors, setErrors] = useState({
        fullName: '',
        email: '',
        message: '',
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // success or error

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            sendSMS(formData.message);
        }
    };

    const validateForm = () => {
        let isValid = true;
        let newErrors = { fullName: '', email: '', message: '' };

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
            isValid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
            isValid = false;
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const sendSMS = async (message) => {
        try {
            const response = await axios.post('http://localhost:5001/send-sms', new URLSearchParams({
                phone_number: '+918903090599',
                message: `${formData.fullName} (${formData.email}): ${message}`,
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            if (response.status === 200) {
                console.log('SMS sent successfully:', response.data);
                setSnackbarMessage('Message sent successfully!');
                setSnackbarSeverity('success');
                clearForm();
            }
        } catch (error) {
            console.error('Error sending SMS:', error);
            setSnackbarMessage('Failed to send message. Please try again.');
            setSnackbarSeverity('error');
        } finally {
            setOpenSnackbar(true);
        }
    };

    const clearForm = () => {
        setFormData({
            fullName: '',
            email: '',
            message: '',
        });
        setErrors({
            fullName: '',
            email: '',
            message: '',
        });
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Box sx={{
                background: "#1E1E1E",
                padding: 4,
                width: "100%",
                maxWidth: 900,
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: 3,
                alignSelf: "center",
                transition: "transform 0.3s ease-in-out",
                '&:hover': {
                    transform: "scale(1.02)",
                }
            }}>
                <Grid container spacing={4} sx={{ maxWidth: '100%', width: '100%', minWidth: '70%' }}>
                    {/* Contact Info Section */}
                    <Grid item xs={12} md={6}>
                        <Paper sx={{
                            padding: 3,
                            backgroundColor: '#333333',
                            borderRadius: 2,
                            boxShadow: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 3
                        }}>
                            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: 'white' }}>Get in touch</Typography>
                            <Typography variant="body1" gutterBottom sx={{ textAlign: 'center', color: '#B0B0B0' }}>
                                Fill in the form to start a conversation
                            </Typography>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', color: '#B0B0B0' }}>
                                    <LocationOn sx={{ marginRight: 1, color: '#FFBB00' }} />
                                    <Typography>40, HP Illam, Bryant nagar 1st street, Thoothukudi</Typography>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', color: '#B0B0B0' }}>
                                    <Phone sx={{ marginRight: 1, color: '#FFBB00' }} />
                                    <Typography>+91 8903090599</Typography>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', color: '#B0B0B0' }}>
                                    <Email sx={{ marginRight: 1, color: '#FFBB00' }} />
                                    <Typography>aswincseskct@gmail.com</Typography>
                                </div>
                            </div>
                        </Paper>

                        <Paper sx={{
                            padding: 3,
                            backgroundColor: '#666',
                            borderRadius: 2,
                            boxShadow: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginTop: 3
                        }}>
                            <GithubLoginButton text='View Github Profile' onClick={() => window.open('https://github.com/aswin-hariram', '_blank')} className='bg-white-300' />
                            <LinkedInLoginButton text='View Linkedin Profile' onClick={() => window.open('https://www.linkedin.com/in/aswin-hariram/', '_blank')} className='bg-white-300' />
                            <InstagramLoginButton text='View Instagram Profile' onClick={() => window.open('https://www.instagram.com/aswin_hariram_/', '_blank')} className='bg-white-300' />
                        </Paper>
                    </Grid>

                    {/* Form Section */}
                    <Grid item xs={12} md={6}>
                        <Paper sx={{
                            padding: 4,
                            backgroundColor: '#333333',
                            borderRadius: 2,
                            boxShadow: 2
                        }}>
                            <form noValidate onSubmit={handleSubmit}>
                                <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', color: '#FFFFFF', marginBottom: 3 }}>
                                    Contact Form
                                </Typography>
                                <TextField
                                    label="Full Name"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    required
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    error={!!errors.fullName}
                                    helperText={errors.fullName}
                                    InputProps={{
                                        style: {
                                            backgroundColor: 'transparent',
                                            color: 'white',
                                        }
                                    }}
                                    InputLabelProps={{
                                        style: {
                                            color: 'white',
                                        }
                                    }}
                                    sx={{
                                        input: { color: 'white' },
                                        backgroundColor: 'transparent',
                                        marginBottom: 3,
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'white',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'white',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'white',
                                            },
                                        },
                                    }}
                                />
                                <TextField
                                    label="Email Address"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    required
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    type="email"
                                    InputProps={{
                                        style: {
                                            backgroundColor: 'transparent',
                                            color: 'white',
                                        }
                                    }}
                                    InputLabelProps={{
                                        style: {
                                            color: 'white',
                                        }
                                    }}
                                    sx={{
                                        input: { color: 'white' },
                                        backgroundColor: 'transparent',
                                        marginBottom: 3,
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'white',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'white',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'white',
                                            },
                                        },
                                    }}
                                />
                                <TextField
                                    label="Message"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    required
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    error={!!errors.message}
                                    helperText={errors.message}
                                    multiline
                                    rows={4}
                                    InputProps={{
                                        style: {
                                            backgroundColor: 'transparent',
                                            color: 'white',
                                        }
                                    }}
                                    InputLabelProps={{
                                        style: {
                                            color: 'white',
                                        }
                                    }}
                                    sx={{
                                        input: { color: 'white' },
                                        backgroundColor: 'transparent',
                                        marginBottom: 3,
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'white',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'white',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'white',
                                            },
                                        },
                                    }}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    type="submit"
                                    sx={{
                                        marginTop: 3,
                                        padding: 1.5,
                                        fontSize: '1.1rem',
                                        backgroundColor: '#6200EE',
                                        '&:hover': {
                                            backgroundColor: '#3700B3',
                                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                                        },
                                    }}
                                >
                                    Submit
                                </Button>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>

            {/* Snackbar */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
                severity={snackbarSeverity}
            />
        </div>
    );
}

export default Contact;
