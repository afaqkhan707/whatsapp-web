'use client';
import { Box, Grid, ThemeProvider } from '@mui/material';
import React, { useContext } from 'react';
import ChatBg from './ChatBg';
import UserInfo from './UserInfo';
import SearchField from './SearchField';
import Chat from './Chat';
import SettingsBar from './SettingsBar';
import UserProfile from './UserProfile';
import NewChat from './NewChat';
import ChatHead from './ChatHead';
import { GetAddedUsers } from '../Contexts/GetAddedUsers';
import { ThemeContext } from '../Contexts/ThemeContext';

const Layout = () => {
  const { theme, toggleDarkMode, isDarkMode } = useContext(ThemeContext);
  const { currentChatUser } = useContext(GetAddedUsers);
  const menuStyles = {
    position: 'absolute',
    // bgcolor: '#fff',
    bgcolor: theme.palette.background.default,
    zIndex: '1000',
    width: '100%',
    height: '100%',
    left: '0',
    top: '0',
    transition: 'all 0.3s ease-in-out',
  };
  return (
    <ThemeProvider theme={theme}>
      {/* START OF LAYOUT BG*/}
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          bgcolor: '#8696a0',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ height: '20%', width: '100vw', bgcolor: '#00a884' }}></Box>
      </Box>
      {/* END OF LAYOUT BG*/}

      <Box
        sx={{
          width: '98vw',
          height: '95vh',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          margin: 'auto',
          display: 'flex',
        }}
      >
        {/* SIDE BAR SECTION START */}
        <Box
          sx={{
            minWidth: '400px',
            width: '400px',
            height: '100%',
            bgcolor: '#f0f2f6',
            bgcolor: theme.palette.background.default,
            display: 'flex',
            flexDirection: 'column',
            transition: 'all 0.5s ease-in-out',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* SIDEBAR SETTINGS START*/}
          <SettingsBar sx={menuStyles} />
          {/* SIDEBAR SETTINGS END*/}

          {/* UserProfile SETTINGS START*/}
          <UserProfile sx={menuStyles} />
          {/* UserProfile SETTINGS END*/}

          {/* SIDEBAR NEWCHAT START*/}
          <NewChat sx={menuStyles} />
          {/* SIDEBAR NEWCHAT END*/}

          {/*SIDEBAR CHAT START */}
          <Box
            sx={{
              height: '100%',
              bgcolor: '#f0f2f6',
              bgcolor: theme.palette.background.default,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box>
              <ChatHead />
              <SearchField />
            </Box>
            <Box
              sx={{
                overflow: 'auto',
                flexGrow: '1',
              }}
            >
              <UserInfo />
            </Box>
          </Box>
          {/*SIDEBAR CHAT END */}
        </Box>

        {/* SIDE BAR SECTION END */}

        {/* Chat SECTION  START*/}
        <Box
          sx={{
            bgcolor: '#f0f2f5',
            bgcolor: theme.palette.background.default,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',

            flexGrow: '1',
          }}
        >
          {currentChatUser ? <Chat /> : <ChatBg />}
        </Box>
        {/* Chat SECTION  END*/}
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
