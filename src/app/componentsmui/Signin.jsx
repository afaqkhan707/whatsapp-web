/* eslint-disable react/no-unescaped-entities */
import React, { useContext, useState } from 'react';
import {
  TextField,
  Container,
  Typography,
  Box,
  ThemeProvider,
} from '@mui/material';
import { signInWithEmailAndPassword, auth } from '../firebase/friebaseConfig';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ThemeContext } from '../Contexts/ThemeContext';
import CustomButton from './BaseBtn';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInError, setSignInError] = useState('');
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const imgBgGreeen = './bg.jpg';
  const validateForm = () => {
    const errors = {};
    if (email.trim() === '') {
      errors.email = 'Please enter your email.';
    }
    if (password.trim() === '') {
      errors.password = 'Please enter your password.';
    }
    return { isValid: Object.keys(errors).length === 0, errors };
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    const validation = validateForm();
    if (!validation.isValid) {
      setSignInError(validation.errors);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Log in successful....', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      router.push('/whatsapp');
    } catch (error) {
      toast.error(error.code, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } finally {
    }
  };

  const { theme } = useContext(ThemeContext);
  const inputFieldCss = {
    marginBottom: '16px',
    color: theme.palette.text.primary,
    '& .MuiInputLabel-root': {
      color: theme.palette.text.primary,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.text.primary,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
      },
    },
  };
  const responsiveCss = {
    '@media (max-width: 440px)': {
      maxWidth: '360px',
    },
    '@media (max-width: 370px)': {
      maxWidth: '300px',
      padding: '16px',
    },
    '@media (max-width: 300px)': {
      maxWidth: '270px',
      padding: '16px',
    },
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            width: '100vw',
            height: '100vh',
            // backgroundPosition: 'center',
            // backgroundSize: 'cover',
            // backgroundRepeat: 'no-repeat',
            // backgroundImage: `url(${imgBgGreeen})`,
            bgcolor: '#01260c',
          }}
        >
          <Container
            sx={{
              backgroundColor: theme.palette.background.default,
              padding: '30px',
              width: '380px',
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              borderRadius: '16px',
              ...responsiveCss,
            }}
          >
            <Typography
              variant='h4'
              style={{
                color: theme.palette.text.primary,
                margin: 'auto',
              }}
            >
              Sign In
            </Typography>
            <TextField
              label='Email'
              type='email'
              id='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin='normal'
              variant='outlined'
              autoComplete='email'
              size='small'
              required
              sx={{
                ...inputFieldCss,
              }}
            />
            {signInError && signInError.email && (
              <Typography variant='body2' color='error'>
                {signInError.email}
              </Typography>
            )}
     

            <FormControl
              variant='outlined'
              sx={{ width: '100%', marginBottom: '10px', ...inputFieldCss }}
              margin='normal'
            >
              <InputLabel htmlFor='outlined-adornment-password' size='small'>
                {'Password'}
              </InputLabel>
              <OutlinedInput
                size='small'
                autoComplete='password'
                id='password'
                name='password'
                value={password}
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => setPassword(e.target.value)}
                required
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      edge='end'
                    >
                      {showPassword ? (
                        <VisibilityOff size='small' />
                      ) : (
                        <Visibility size='small' />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label='Password'
              />
            </FormControl>
            {signInError && signInError.password && (
              <Typography variant='body2' color='error'>
                {signInError.password}
              </Typography>
            )}
            <CustomButton text='Sign In' pressed={handleSignin} />
            <Box
              sx={{
                marginTop: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
                paddingRight: '20px',
              }}
            >
              <Typography
                sx={{
                  color: '#333',
                }}
              >
                {/* Don't have an account? */}
                No account?
              </Typography>

              <Link href={'/signup'} style={{ textDecoration: 'none' }}>
                <Typography
                  variant='contained'
                  sx={{
                    color: '#00401A',
                    fontSize: '16px',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                  }}
                >
                  {/* Sign up */}
                  Create one
                </Typography>
              </Link>
            </Box>
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default SignIn;

       {/* <TextField
              label='Password'
              type='password'
              id='password'
              name='password'
              autoComplete='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin='normal'
              variant='outlined'
              size='small'
              required
              sx={{ ...inputFieldCss }}
            /> */}