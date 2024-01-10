import React from 'react';
import { RecaptchaVerifier } from 'firebase/auth';
import { auth } from '../firebase/friebaseConfig';
import { Box, Container, Typography } from '@mui/material';
import CustomButton from './BaseBtn';
import { useThemeContext } from '../Contexts/ThemeContext';

const SignupNumber = () => {
  //   window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button',
  //   {
  //     size: 'invisible',
  //     callback: (response) => {
  //       onSignInSubmit();
  //     },
  //   });
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
  return (
    <>
      <Box
        sx={{
          width: '100vw',
          height: '100vh',

          bgcolor: '#01260c',
          overflow: 'hidden',
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

          <CustomButton text='Sign In'/>
        </Container>
      </Box>
    </>
  );
};

export default SignupNumber;
