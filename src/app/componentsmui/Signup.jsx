import React, { useContext, useState } from 'react';
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

const Signup = () => {
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

  const validateForm = () => {
    return (
      name.trim() !== '' &&
      email.trim() !== '' &&
      number.trim() !== '' &&
      password.trim() !== '' &&
      confirmPassword.trim() !== ''
    );
  };

  const handleSignup = async () => {
    try {
      if (!validateForm()) {
        setError('Please fill in all fields.');
        return;
      }

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
  const { theme, toggleDarkMode, isDarkMode } = useContext(ThemeContext);
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
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin='normal'
            variant='outlined'
            required
            error={!name.trim() && error.includes('name')}
            helperText={!name.trim() && error.includes('name') && error}
            sx={{
              marginBottom: '12px',
              color: theme.palette.text.primary, // Set text color
              '& .MuiInputLabel-root': {
                color: theme.palette.text.primary, // Set label color
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: theme.palette.text.primary, // Set border color
                },
                '&:hover fieldset': {
                  borderColor: theme.palette.primary.main, // Set border color on hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme.palette.primary.main, // Set border color when focused
                },
              },
            }}
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
            sx={{
              marginBottom: '12px',
              color: theme.palette.text.primary, // Set text color
              '& .MuiInputLabel-root': {
                color: theme.palette.text.primary, // Set label color
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: theme.palette.text.primary, // Set border color
                },
                '&:hover fieldset': {
                  borderColor: theme.palette.primary.main, // Set border color on hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme.palette.primary.main, // Set border color when focused
                },
              },
            }}
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
            sx={{
              marginBottom: '12px',
              color: theme.palette.text.primary, // Set text color
              '& .MuiInputLabel-root': {
                color: theme.palette.text.primary, // Set label color
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: theme.palette.text.primary, // Set border color
                },
                '&:hover fieldset': {
                  borderColor: theme.palette.primary.main, // Set border color on hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme.palette.primary.main, // Set border color when focused
                },
              },
            }}
          />
          <TextField
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
            sx={{
              marginBottom: '12px',
              color: theme.palette.text.primary, // Set text color
              '& .MuiInputLabel-root': {
                color: theme.palette.text.primary, // Set label color
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: theme.palette.text.primary, // Set border color
                },
                '&:hover fieldset': {
                  borderColor: theme.palette.primary.main, // Set border color on hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme.palette.primary.main, // Set border color when focused
                },
              },
            }}
          />
          <TextField
            label='Confirm Password'
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            margin='normal'
            variant='outlined'
            required
            error={!confirmPassword.trim() && error.includes('confirmPassword')}
            helperText={
              !confirmPassword.trim() &&
              error.includes('confirmPassword') &&
              error
            }
            sx={{
              marginBottom: '12px',
              color: theme.palette.text.primary, // Set text color
              '& .MuiInputLabel-root': {
                color: theme.palette.text.primary, // Set label color
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: theme.palette.text.primary, // Set border color
                },
                '&:hover fieldset': {
                  borderColor: theme.palette.primary.main, // Set border color on hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme.palette.primary.main, // Set border color when focused
                },
              },
            }}
          />
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

export default Signup;

{
  /* <Button
  variant='outlined'
  onClick={handleSignup}
  sx={{
    bgcolor: '#0aa884',
    border: 'none',
    color: '#fff',
    fontSize: '16px',
    '&:hover': {
      bgcolor: '#0aa884',
      color: '##fff',
      fontWeight: 'bold',
      outline: 'none',
      border: 'none',
    },
  }}
>
  Signup
</Button>; */
}

// Link
{
  /* <Box
            sx={{
              marginTop: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                padding: '10px 20px',
                bgcolor: '#0aa884',
                color: '#fff',
                borderRadius: '4px',
              }}
            >
              Already have an account?
            </Typography>
            <Link href={'/signin'}>
              <Button
                variant='contained'
                sx={{
                  bgcolor: '#0aa884',
                  border: 'none',
                  color: '#fff',
                  fontSize: '16px',
                  '&:hover': {
                    bgcolor: '#0aa884',
                    color: '##fff',
                    fontWeight: 'bold',
                    outline: 'none',
                    border: 'none',
                  },
                }}
              >
                Signin
              </Button>
            </Link>
          </Box> */
}
