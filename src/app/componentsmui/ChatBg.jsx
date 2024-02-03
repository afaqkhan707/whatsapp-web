import React, { useContext } from 'react';
import Image from 'next/image';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LockIcon from '@mui/icons-material/Lock';
import Box from '@mui/material/Box';
import bgImg from '../assets/img.png';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { ThemeContext } from '../Contexts/ThemeContext';

const ChatBg = () => {
  const handleButtonClick = () => {
    const isConfirmed = window.confirm(
      'https://web.whatsapp.com wants to open this application.'
    );
    if (isConfirmed) {
      window.location.href =
        'https://www.microsoft.com/store/productId/9NKSQGP7F2NH?ocid=pdpshare';
    } else {
    }
  };
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Card
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: theme.palette.background.default,
            padding: '10px 20px',
            width: '80%',
            minHeight: '400px',
            border: 'none',
            color: '#41525d',
            color: theme.palette.text.primary,
            boxShadow: 'none',
          }}
        >
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '20px',
                fontWeight: 'thin',
              }}
            >
              <Image
                src={bgImg}
                alt='bgImg'
                width={320}
                height={188}
                priority='true'
              />
            </Box>
            <Box sx={{ margin: '13px 0px' }}>
              <Typography
                variant='h5'
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  margin: '13px',
                }}
              >
                Download WhatsApp for Windows
              </Typography>
              <Typography
                variant='p'
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              >
                Make calls, share your screen and get a faster experience when
                you download the Windows app.
              </Typography>
              <Box>
                <Button
                  onClick={handleButtonClick}
                  variant='contained'
                  sx={{
                    display: 'flex',
                    margin: '15px auto',
                    color: '#fff',
                    borderRadius: '25px',
                    backgroundColor: '#008069',
                    '&:hover': {
                      backgroundColor: '#045849',
                    },
                  }}
                >
                  Get the app
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
        <Box
          sx={{
            position: 'absolute',
            bottom: '10%',
            color: '#8696a0',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <LockIcon />
          <Typography variant='span'>
            Your personal messages are end-to-end encrypted
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default ChatBg;
