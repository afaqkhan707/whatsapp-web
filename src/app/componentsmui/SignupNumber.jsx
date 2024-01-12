import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import CustomButton from './BaseBtn';
import { useThemeContext } from '../Contexts/ThemeContext';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import {
  auth,
  db,
  setDoc,
  doc,
  signInWithPopup,
  googleAuthSignin,
} from '../firebase/friebaseConfig';
// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { getLoggedUser, useLoggedUserContext } from '../Contexts/GetLoggedUser';
import Link from 'next/link';
import { AccountBox, Email, Google } from '@mui/icons-material';
// import { PhoneInput } from 'react-international-phone';
// import 'react-international-phone/style.css';
import MuiPhone from './PhoneInput';
import OtpInput from './OtpInput';
import {} from '../firebase/friebaseConfig';

const SignupNumber = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loggedUser, setLoggedUser] = useState(null);
  const [otp, setOtp] = useState('');
  const router = useRouter();
  // console.log(loggedUser);
  // const [error, setError] = useState('');
  const { setUser } = useLoggedUserContext();
  const signInWithGoogle = async () => {
    try {
      const data = await signInWithPopup(auth, googleAuthSignin);
      // console.log('data from google account', data);
      const userId = data.user.uid;
      const email = data.user.email;
      await setDoc(doc(db, 'users', userId), {
        userId,
        email,
      });
      await setUser(data.user);
      toast.success('Welcome to Whatsapp Clone', email, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      router.push('whatsapp');
    } catch (error) {
      toast.success(error.code, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };
  const sendOtp = async (e) => {
    try {
      const recaptcha = new RecaptchaVerifier(auth, 'recaptcha', {});
      const confirmOtp = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        recaptcha
      );
      toast.success('OtpSend', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

      setLoggedUser(confirmOtp);
      console.log(confirmOtp);
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
    }
  };
  const verifyOtp = async (e) => {
    try {
      const data = await loggedUser.confirm(otp);
      const userId = data.user.uid;
      await setUser(data.user);
      await setDoc(doc(db, 'users', userId), {
        userId,
        number: phoneNumber,
      });

      router.push('whatsapp');
    } catch (error) {
      console.log(error.code);
    }
  };
  const { theme } = useThemeContext();

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
  const reCapchaResponsivenes = {
    '@media (max-width: 440px)': {
      maxWidth: '340px',
    },
    '@media (max-width: 350px)': {
      maxWidth: '280px',
      padding: '16px',
    },
    '@media (max-width: 300px)': {
      maxWidth: '250px',
      padding: '16px',
    },
  };
  // const refresh = () => {
  //   console.log('refresh');
  // };
  // useEffect(() => {
  //   refresh();
  // }, [refresh]);
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            width: '100vw',
            height: '100vh',
            bgcolor: '#01260c',
            // overflow: 'hidden',
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
            {/* <Refresh onClick={refresh} /> */}
            <MuiPhone
              value={phoneNumber}
              onChange={(number) => setPhoneNumber('+' + number)}
              sx={inputFieldCss}
            />
            <CustomButton text='Send Otp' pressed={sendOtp} />
            <Box
              id='recaptcha'
              sx={{
                maxWidth: '380px',
                overflowX: 'auto',
                overflowY: 'hidden',
                ...reCapchaResponsivenes,
                marginBottom: '10px',
              }}
            ></Box>
            {/* <TextField
              label='Enter OTP here'
              type='tel'
              size='small'
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              fullWidth
              margin='normal'
              variant='outlined'
              required
              sx={{ ...inputFieldCss }}
            /> */}
            <OtpInput value={otp} onChange={setOtp} />

            <CustomButton
              text='Verify OTP'
              pressed={verifyOtp}
              sx={{ marginTop: '10px' }}
            />
            <Box
              sx={{
                marginTop: '20px',
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
                Signin with with Email?
              </Typography>
              <Email sx={{ color: '#00401A' }} />
              <Link href={'/signin'} style={{ textDecoration: 'none' }}>
                <Typography
                  variant='contained'
                  sx={{
                    color: '#00401A',
                    fontSize: '16px',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    flexWrap: 'nowrap',
                  }}
                >
                  Sign in
                </Typography>
              </Link>
            </Box>
            <CustomButton
              icon={
                <Google
                  sx={{ color: '#fff', marginRight: '10px' }}
                  size='small'
                />
              }
              text='Google Sign in'
              pressed={signInWithGoogle}
              sx={{ marginTop: '10px' }}
            />
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
                No account?
              </Typography>
              <AccountBox sx={{ color: '#00401A' }} />
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
                  Create one
                </Typography>
              </Link>
            </Box>
          </Container>
        </Box>
      </ThemeProvider>
      {/* <ToastContainer /> */}
    </>
  );
};

export default SignupNumber;

{
  /* <TextField
            label='Number'
            type='number'
            value={phoneNumber}
            size='small'
            onChange={(e) => setPhoneNumber(e.target.value)}
            fullWidth
            margin='normal'
            variant='outlined'
            required
            error={!phoneNumber.trim() && error.includes('number')}
            helperText={
              !phoneNumber.trim() && error.includes('number') && error
            }
            sx={{ ...inputFieldCss }}
          /> */
}
{
  /* <PhoneInput
            country={'pk'}
            value={phoneNumber}
            onChange={(number) => setPhoneNumber('+' + number)}
            placeholder='Phone Number'
            enableSearch={true}
           style={{width:'10%',marginBottom:'10px'}}
          /> */
}
