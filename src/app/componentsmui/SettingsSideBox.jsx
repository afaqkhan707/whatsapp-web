import { Box, ListItemIcon, ListItemText } from '@mui/material';
import React, { useContext } from 'react';
import { ThemeContext } from '../Contexts/ThemeContext';

const SettingsSideBox = ({ icon, text, onClick, color, sx }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <Box
        onClick={onClick}
        sx={{
          ...sx,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // color: '#3b4a54',
          color: theme.palette.text.primary,
          // color: color,
          height: '60px',
          bgcolor: '#fff',
          bgcolor: theme.palette.background.default,
          cursor: 'pointer',
          '&:hover': {
            transition: 'all 0.3s',
            bgcolor: '#f0f2f5',
            bgcolor: theme.palette.hover.primary,
          },
        }}
      >
        <ListItemIcon
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // color: '#3b4a54',
            color: theme.palette.text.primary,
          }}
        >
          {icon}
        </ListItemIcon>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            borderBottom: '1px solid #e9edef',
          }}
        >
          <ListItemText
            sx={{
              flexGrow: '1',
              color: theme.palette.text.primary,
              fontWeight: '100',
            }}
          >
            {text}
          </ListItemText>
        </Box>
      </Box>
    </>
  );
};

export default SettingsSideBox;
