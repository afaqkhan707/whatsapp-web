import React from 'react';
import { Box, CircularProgress, Button } from '@mui/material';

const CustomButton = ({ text, pressed }) => {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();

  const buttonSx = {
    ...(success && {
      bgcolor: '#00401A',
      '&:hover': {
        bgcolor: '#00401A',
      },
    }),
  };

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = (e) => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      pressed(e);
      // console.log('button clicked');
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Button
        variant='contained'
        sx={buttonSx}
        disabled={loading}
        onClick={handleButtonClick}
        fullWidth
      >
        {text}
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              color: '#00401A',
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Button>
    </Box>
  );
};

export default CustomButton;
