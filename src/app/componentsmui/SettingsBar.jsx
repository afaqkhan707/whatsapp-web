import React, { useContext } from 'react';
import {
  Box,
  Button,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchField from './SearchField';
import SettingsSideBox from './SettingsSideBox';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LockIcon from '@mui/icons-material/Lock';
import SecurityIcon from '@mui/icons-material/Security';
import Brightness6Icon from '@mui/icons-material/Brightness6';
import DownloadIcon from '@mui/icons-material/Download';
import DescriptionIcon from '@mui/icons-material/Description';
import HelpIcon from '@mui/icons-material/Help';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import LogoutIcon from '@mui/icons-material/Logout';
import ProfileSideBarBox from './ProfileSideBarBox';
import { DataContext } from '../Contexts/MyContextProvider';
import DialogBox from './DialogBox';
import ThemeCard from './ThemeCard';
import SideBarHeading from './SideBarHead';
import { useLoggedUserContext } from '../Contexts/GetLoggedUser';

const SettingsBar = ({ sx }) => {
  const { openSettings, setOpenSettings } = useContext(DataContext);
  const { logout } = useLoggedUserContext();
  const SideBarIconBox = [
    {
      icon: <NotificationsIcon fontSize='small' />,
      text: 'Notifications',
      method: () => alert('hello'),
    },
    {
      icon: <LockIcon fontSize='small' />,
      text: 'Privacy',
    },
    {
      icon: <SecurityIcon fontSize='small' />,
      text: 'Security',
    },
    {
      content: <ThemeCard />,
      // method: () => console.log('hello'),
      button: (
        <SettingsSideBox
          icon={<Brightness6Icon fontSize='small' />}
          text='Theme'
        />
      ),
    },
    {
      icon: <DownloadIcon fontSize='small' />,
      text: 'Media auto-download',
    },
    {
      icon: <DescriptionIcon fontSize='small' />,
      text: 'Request account info',
    },

    {
      icon: <KeyboardIcon fontSize='small' />,
      text: 'Keyboard shortcuts',
    },
    {
      icon: <HelpIcon fontSize='small' />,
      text: 'Help',
    },
    {
      content: <DialogTitle>Are you sure you want to logout?</DialogTitle>,
      method: logout,
      button: (
        <SettingsSideBox
          icon={<LogoutIcon fontSize='small' />}
          text='Logout'
          color='#f15c6d'
        />
      ),
    },
  ];

  return (
    <Box
      sx={sx}
      style={
        openSettings
          ? { transform: 'translateX(0%)' }
          : { transform: 'translateX(-100%)' }
      }
    >
      <SideBarHeading label='Settings' onClick={() => setOpenSettings(false)} />
      <SearchField />
      <Box
        sx={{
          overflow: 'auto',
          flexGrow: '1',
          height: '70vh',
        }}
      >
        <ProfileSideBarBox />
        {SideBarIconBox.map((item, index) => (
          <Box key={index}>
            {item.content && item.button ? (
              <DialogBox
                key={index}
                openBtn={item.button}
                content={item.content}
                yesFunction={item.method}
              />
            ) : (
              <SettingsSideBox
                key={index}
                icon={item.icon}
                text={item.text}
                onClick={item.method}
                sx={{ color: '#fff' }}
              />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SettingsBar;
