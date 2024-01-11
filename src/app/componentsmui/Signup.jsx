import React, { useContext, useState } from 'react';
import {
  TextField,
  Container,
  Typography,
  Box,
  ThemeProvider,
} from '@mui/material';
import {
  createUserWithEmailAndPassword,
  auth,
  db,
  doc,
  setDoc,
} from '../firebase/friebaseConfig';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
import { Phone } from '@mui/icons-material';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [number, setNumber] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // const validateForm = () => {
  //   return (
  //     name.trim() !== '' &&
  //     email.trim() !== '' &&
  //     number.trim() !== '' &&
  //     password.trim() !== '' &&
  //     confirmPassword.trim() !== ''
  //   );
  // };

  const handleSignup = async () => {
    try {
      if (
        !name.trim() ||
        !email.trim() ||
        !number.trim() ||
        !password.trim() ||
        !confirmPassword.trim()
      ) {
        setError('Please fill in all fields.');
        return;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        userId: user.uid,
        name,
        email,
        number,
      });

      toast.success('Account created successfully!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      router.push('/signin');
    } catch (error) {
      // console.error('Error signing up:', error.message);
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
      setError(error.code);
    } finally {
    }
  };
  const { theme } = useContext(ThemeContext);

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
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          // backgroundPosition: 'center',
          // backgroundSize: 'cover',
          // backgroundRepeat: 'no-repeat',
          // backgroundImage: `url(${imgBgGreeen})`,
          overflow: 'hidden',
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
            gutterBottom
            style={{ color: theme.palette.text.primary, margin: 'auto' }}
          >
            Signup
          </Typography>
          <TextField
            label='Name'
            type='text'
            value={name}
            size='small'
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin='normal'
            variant='outlined'
            required
            error={!name.trim() && error.includes('name')}
            helperText={!name.trim() && error.includes('name') && error}
            sx={{ ...inputFieldCss }}
          />
          <TextField
            label='Email'
            type='email'
            value={email}
            size='small'
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin='normal'
            variant='outlined'
            required
            error={!email.trim() && error.includes('email')}
            helperText={!email.trim() && error.includes('email') && error}
            sx={{ ...inputFieldCss }}
          />
          <TextField
            label='Number'
            type='tel'
            value={number}
            size='small'
            onChange={(e) => setNumber(e.target.value)}
            fullWidth
            margin='normal'
            variant='outlined'
            required
            error={!number.trim() && error.includes('number')}
            helperText={!number.trim() && error.includes('number') && error}
            sx={{ ...inputFieldCss }}
          />

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

          <FormControl
            variant='outlined'
            sx={{ width: '100%', marginBottom: '10px', ...inputFieldCss }}
            margin='normal'
          >
            <InputLabel htmlFor='outlined-adornment-password' size='small'>
              {'Confirm Password'}
            </InputLabel>
            <OutlinedInput
              size='small'
              autoComplete='password'
              id='confirm_password'
              name='conftirm_password'
              value={confirmPassword}
              type={showPassword ? 'text' : 'password'}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              label='Confirm Password'
            />
          </FormControl>
          {error &&
            !error.includes('name') &&
            !error.includes('email') &&
            !error.includes('number') &&
            !error.includes('password') &&
            !error.includes('confirmPassword') && (
              <Typography
                variant='body2'
                color='error'
                style={{ marginBottom: '12px' }}
              >
                {error}
              </Typography>
            )}
          <CustomButton text='Sign up' pressed={handleSignup} />
          <Box
            sx={{
              marginTop: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              paddingRight: '20px',
            }}
          >
            <Typography
              sx={{
                color: '#333',
              }}
            >
              Already have an account?
            </Typography>
            <Link href={'/signin'} style={{ textDecoration: 'none' }}>
              <Typography
                variant='contained'
                sx={{
                  color: '#00401A',
                  fontSize: '16px',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                }}
              >
                Sign in
              </Typography>
            </Link>
          </Box>
          <Box
            sx={{
              marginTop: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              paddingRight: '20px',
            }}
          >
            <Typography
              sx={{
                color: '#333',
              }}
            >
              Sign In With Phone <Phone />
            </Typography>
            <Link href={'/signinphone'} style={{ textDecoration: 'none' }}>
              <Typography
                variant='contained'
                sx={{
                  color: '#00401A',
                  fontSize: '16px',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                }}
              >
                Phone
              </Typography>
            </Link>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Signup;
