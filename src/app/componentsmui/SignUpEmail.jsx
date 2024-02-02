import React, { useContext, useState, useEffect, useRef } from 'react';
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  CircularProgress,
  ThemeProvider,
  IconButton,
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
import { Visibility, VisibilityOff } from '@mui/icons-material';

const SignupEmail = () => {
  // const theme = useTheme();
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  // const [number, setNumber] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    password: '',
    confirmPassword: '',
  });
  const handleFormData = (e) => {
    const { name, value } = e.target;
    console.log(value, 'value');
    setFormData({ ...formData, [name]: value });
  };

  const [error, setError] = useState('');
  const [passwordChecker, setPasswordChecker] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const imgBgGreeen = './bg.jpg';

  const handleSignup = async () => {
    try {
      setLoading(true);
      if (passwordMatch)
        // const userCredential = await createUserWithEmailAndPassword(
        //   auth,
        //   email,
        //   password
        // );
        // const user = userCredential.user;

        // await setDoc(doc(db, 'users', user.uid), {
        //   userId: user.uid,
        //   name,
        //   email,
        //   number,
        // });

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
  const sx = {
    marginBottom: '12px',
    color: theme.palette.text.primary,
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.text.primary,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
      },
    },
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  useEffect(() => {
    if (formData.password && formData.confirmPassword) {
      setPasswordChecker(true);
    }
    if (formData.password === formData.confirmPassword) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  }, [formData.password, formData.confirmPassword]);
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
            size='small'
            name='name'
            fullWidth
            value={formData.name}
            onChange={handleFormData}
            margin='normal'
            variant='outlined'
            autoFocus={false}
            required
            sx={{ ...sx }}
          />
          <TextField
            label='Email'
            type='email'
            size='small'
            name='email'
            value={formData.email}
            onChange={handleFormData}
            fullWidth
            margin='normal'
            variant='outlined'
            required
            sx={{ ...sx }}
            endAdornment={
              <IconButton onClick={handleClickShowPassword}>
                {showPassword ? <VisibilityOff /> : <Visibility size='small' />}
              </IconButton>
            }
          />
          <TextField
            label='Number'
            name='number'
            type='tel'
            size='small'
            value={formData.number}
            onChange={handleFormData}
            fullWidth
            margin='normal'
            variant='outlined'
            required
            sx={{ ...sx }}
          />

          <PasswordInputWithIcon
            label='Password'
            type='password'
            name='password'
            htmlfor='password'
            value={formData.password}
            onChange={handleFormData}
            sx={{ ...sx }}
          />

          <PasswordInputWithIcon
            label='Confirm Password'
            htmlfor='cPassword'
            type='password'
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={handleFormData}
            sx={{ ...sx }}
          />
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
          {passwordChecker && (
            <Typography
              variant='body2'
              color={passwordMatch ? 'green' : 'error'}
              style={{ margin: '12px 0px 0px 0px ' }}
            >
              {passwordMatch ? 'Password Match' : 'Password do Not Match'}
            </Typography>
          )}
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
