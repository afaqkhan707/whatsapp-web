import React, { useContext, useState, useEffect, useRef } from 'react';
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  CircularProgress,
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
import { useTheme } from '@mui/system';
import { ThemeContext } from '../Contexts/ThemeContext';
import CustomButton from './BaseBtn';
import PasswordInputWithIcon from './CustomInputIcon';

const SignupEmail = () => {
  // const theme = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [number, setNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const bgImg =
    'https://img.freepik.com/premium-photo/3d-rendering-bunch-square-badges-with-whatsapp-logo-green-background_284880-352.jpg?size=626&ext=jpg&ga=GA1.1.1803636316.1701302400&semt=ais';
  const bgGreenImg = './bggreen.jpeg';
  const imgBgGreeen = './bg.jpg';

  const handleSignup = async () => {
    try {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      setLoading(true);
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

      // console.log('User registered successfully:', user);
      router.push('/signin');
    } catch (error) {
      console.error('Error signing up:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  // const [name, setName] = useState('');
  const [nameValid, setNameValid] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus the input on initial render
    if (inputRef.current && !name) {
      inputRef.current.focus();
    }
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
    setNameValid(e.target.value.trim() !== '');
  };

  const { theme, toggleDarkMode, isDarkMode } = useContext(ThemeContext);
  const sx = {
    marginBottom: '12px',
    color: theme.palette.text.primary,
    '& .MuiOutlinedInput-root': {
      borderColor: !nameValid ? '#f15c6d' : theme.palette.primary.main, // Dynamic border color
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.text.primary,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
      },
      '&.Mui-focused fieldset': {
        borderColor: !nameValid ? '#f15c6d' : theme.palette.primary.main,
      },
      ...(nameValid &&
        !name && {
          '&.MuiOutlinedInput-root': {
            borderColor: '#f15c6d',
          },
        }),
      '&.MuiOutlinedInput-root:focus-out fieldset': {
        borderColor: '#f15c6d',
      },
    },
  };
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundImage: `url(${imgBgGreeen})`,
        }}
      >
        <Container
          sx={{
            backgroundColor: theme.palette.background.default,
            padding: '20px',
            width: '400px',
            // margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '16px',
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
            placeholder='Enter your name here'
            type='text'
            size='small'
            fullWidth
            value={name}
            onChange={handleNameChange}
            margin='normal'
            variant='outlined'
            autoFocus={false}
            required
            error={!nameValid} // Combine first-time focus and empty value logic
            helperText={!nameValid && 'Name is required'}
            InputProps={{
              inputRef,
            }}
            sx={{ ...sx }}
          />
          <TextField
            label='Email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin='normal'
            variant='outlined'
            required
            error={!email.trim() && error.includes('email')}
            helperText={!email.trim() && error.includes('email') && error}
            sx={{ ...sx }}
          />
          <TextField
            label='Number'
            type='tel'
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            fullWidth
            margin='normal'
            variant='outlined'
            required
            error={!number.trim() && error.includes('number')}
            helperText={!number.trim() && error.includes('number') && error}
            sx={{ ...sx }}
          />
          {/* <TextField
            label='Password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin='normal'
            variant='outlined'
            required
            error={!password.trim() && error.includes('password')}
            helperText={!password.trim() && error.includes('password') && error}
            sx={{ ...sx }}
          /> */}
          <PasswordInputWithIcon
            label='Password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!password.trim() && error.includes('password')}
            helperText={!password.trim() && error.includes('password') && error}
            sx={{ ...sx }}
          />

          {/* <TextField
            label='Confirm Password'
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            margin='normal'
            variant='outlined'
            required
          /> */}
          <PasswordInputWithIcon
            label='Confirm Password'
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!confirmPassword.trim() && error.includes('confirmPassword')}
            helperText={
              !confirmPassword.trim() &&
              error.includes('confirmPassword') &&
              error
            }
            fullWidth
            sx={{ ...sx }}
          />
          {/* <PasswordInputWithIcon /> */}
          {loading && <CircularProgress style={{ marginBottom: '12px' }} />}
          {error && (
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
              gap: '16px',
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
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default SignupEmail;
