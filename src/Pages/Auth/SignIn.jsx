import React, { useState } from 'react';
import { TextField, IconButton, Snackbar, InputAdornment, Button ,Alert} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import MuiAlert from '@mui/material/Alert';
import api from '../../Utils/axios';
import { useNavigate } from 'react-router-dom';
import signin from '../../assets/signin.png'


const SigninForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const navigate = useNavigate();

  const handleTogglePassword = () => setShowPassword(!showPassword);

  const handleSnackClose = () => {
    setSnackOpen(false);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email) || !isValidPassword(password)) {
      setErrorMessage("Please enter a valid email and secure password.");
      setOpenSnackbar(true);
      return;
    }

    try {
      const res = await api.post('/auth/sign-in', { email, password });
      console.log(res)
      console.log(res.data.token)
      navigate('/verify-otp', { state: { email, token: res.data.token } });
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Something went wrong.');
      setOpenSnackbar(true);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex w-[900px] h-[500px] shadow-lg rounded-3xl overflow-hidden">
        {/* Left Side */}
        <div className="w-1/2 bg-[#ff564f] p-6 flex flex-col justify-center items-center relative">
          <h2 className="text-white text-2xl font-semibold mb-4">Welcome Back</h2>
          <div className="bg-white rounded-xl p-6 m-4 w-[90%]">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <TextField
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                size="small"
              />
              <div className="relative">
                <TextField
                  label="Password"
                  variant="outlined"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  size="small"
                  InputProps={{
                    // disableUnderline: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleTogglePassword} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {/* <IconButton
                  className="absolute top-2 right-2"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton> */}
              </div>
              <p className="text-right text-sm text-[#ff564f] cursor-pointer">Forgot Password ?</p>
              <button
                type="submit"
                className={`text-white py-2 rounded-full transition duration-300 ${isValidEmail(email) && isValidPassword(password)
                  ? 'bg-[#ff564f]'
                  : 'bg-gray-400 cursor-not-allowed'
                  }`}
                disabled={!(isValidEmail(email) && isValidPassword(password))}
              >
                Sign In
              </button>
            </form>
          </div>
          <div className="absolute bottom-4 text-sm text-center w-full text-white">
            Don’t Have An Account ? <span className="text-white underline cursor-pointer">Sign Up</span>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-1/2 bg-white flex justify-center items-center">
          <img src={signin} className="w-[80%]" />
        </div>

        {/* Snackbar */}
        <Snackbar
          open={openSnackbar}
          // autoHideDuration={5000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          sx={{
            "& .MuiPaper-root": {
              fontSize: "1.05rem",
              padding: "15px",
              minWidth: "180px",
            }
          }}
        >
          <Alert onClose={() => setOpenSnackbar(false)} severity="error">
            {errorMessage}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default SigninForm;
