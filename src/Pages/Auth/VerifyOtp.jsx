import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Snackbar,
    Alert,
} from '@mui/material';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import optImg from '../../assets/opt-illus.png'
import { useLocation } from 'react-router-dom';

const VerifyOtp = () => {

    const location = useLocation();
    const { email, token } = location.state || {};
    const isLogin = location.state || true

    // console.log("Email:", email);
    // console.log("Token:", token);

    const [generatedOTP, setGeneratedOTP] = useState('');
    const [otpTimestamp, setOtpTimestamp] = useState(null);
    const [inputOTP, setInputOTP] = useState('');
    const [resendCount, setResendCount] = useState(0);
    const [timer, setTimer] = useState(30);
    const [resendDisabled, setResendDisabled] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const navigate = useNavigate();

    // Fetch OTP on load
    useEffect(() => {
        generateOtp();
    }, []);

    // Countdown timer
    useEffect(() => {
        let interval;
        if (resendDisabled && timer > 0) {
            interval = setInterval(() => setTimer(prev => prev - 1), 1000);
        } else if (timer === 0) {
            setResendDisabled(false);
        }
        return () => clearInterval(interval);
    }, [timer, resendDisabled]);

    const generateOtp = async () => {
        try {
            const res = await axios.get(`https://wo2gjev1b6.execute-api.ap-south-1.amazonaws.com/InitDeploy/genrateOTP?email=${email}`);
            const { otp, timestamp } = res.data;
            
            setGeneratedOTP(otp);
            setOtpTimestamp(timestamp);
            setTimer(30);
            setResendDisabled(true);
            console.log(otp, timestamp)
        } catch (err) {
            console.log(err)
            setErrorMessage(err.response?.data?.message || 'Something went wrong.');
            setOpenSnackbar(true);
        }
    };

    const fetchNewOtp = async () => {
        if (resendCount >= 3) return;
        try {
            await generateOtp();
            setResendCount(prev => prev + 1);
        } catch (err) {
            console.log(err)
            setErrorMessage(err.response?.data?.message || 'Something went wrong.');
            setOpenSnackbar(true);
        }
    };

    const handleVerify = () => {
        const currentTimestamp = new Date();
        const otpTime = new Date(otpTimestamp);
        const timeDiff = (currentTimestamp - otpTime) / 1000 / 60; // in minutes

        if (timeDiff >= 5) {
            setErrorMessage('OTP expired.');
            setOpenSnackbar(true);
            return;
        }

        if (inputOTP === generatedOTP) {
            if (isLogin) {
                localStorage.setItem("token", token);
                navigate('/home');
            } else {
                navigate('/sign-in');
            }

        } else {
            setErrorMessage('Invalid OTP.');
            setOpenSnackbar(true);
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="#f9f9f9"
            px={2}
        >
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 420,
                    bgcolor: 'white',
                    borderRadius: 4,
                    boxShadow: 3,
                    p: 4,
                    textAlign: 'center',
                }}
            >
                {/* Top Image */}
                <Box display="flex" justifyContent="center" mb={2}>
                    <img
                        src={optImg}
                        alt="OTP"
                        style={{ width: 280, height: 180 }}
                    />
                </Box>

                {/* Heading */}
                <Typography variant="h5" fontWeight={600} gutterBottom>
                    Verify OTP
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>
                    We have sent you an OTP on your email
                </Typography>

                {/* OTP Input */}
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Enter OTP"
                    inputProps={{ maxLength: 4, style: { letterSpacing: '0.5em', textAlign: 'center' } }}
                    value={inputOTP}
                    onChange={(e) => setInputOTP(e.target.value)}
                    sx={{ mb: 2 }}
                />

                {/* Countdown / Resend */}
                {resendDisabled ? (
                    <Typography variant="caption" color="textSecondary" sx={{ mb: 5 }}>
                        Resend OTP in {timer} seconds
                    </Typography>
                ) : (
                    <Button
                        variant="text"
                        disabled={resendCount >= 3}
                        onClick={fetchNewOtp}
                        sx={{
                            mb: 2,
                            color: resendCount >= 3 ? 'grey.500' : '#FD735D',
                            cursor: resendCount >= 3 ? 'not-allowed' : 'pointer',
                            textTransform: 'none',
                            margin: '8px'
                        }}
                    >
                        Resend OTP
                    </Button>
                )}

                {/* Verify Button */}
                <Button
                    fullWidth
                    variant="contained"
                    onClick={handleVerify}
                    sx={{
                        backgroundColor: '#FD735D',
                        marginTop: '15px',
                        '&:hover': {
                            backgroundColor: '#fd5a3d',
                        },
                    }}
                >
                    Verify
                </Button>

                {/* Snackbar for errors */}
                <Snackbar
                    open={openSnackbar}
                    onClose={() => setOpenSnackbar(false)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    sx={{
                        '& .MuiPaper-root': {
                            fontSize: '1.05rem',
                            padding: '15px',
                            minWidth: '180px',
                        },
                    }}
                >
                    <Alert onClose={() => setOpenSnackbar(false)} severity="error">
                        {errorMessage}
                    </Alert>
                </Snackbar>
            </Box>
        </Box>
    );

};

export default VerifyOtp;
