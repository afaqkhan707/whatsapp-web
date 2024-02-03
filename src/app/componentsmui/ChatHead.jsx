'use client';
import Box from '@mui/material/Box';
import { useContext, useState } from 'react';
import DonutLargeOutlinedIcon from '@mui/icons-material/DonutLargeOutlined';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import {
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Divider,
  Avatar,
  DialogTitle,
} from '@mui/material';
import AddCommentRoundedIcon from '@mui/icons-material/AddCommentRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import { DataContext } from '../Contexts/MyContextProvider';
import { useLoggedUserContext } from '../Contexts/GetLoggedUser';
import { ThemeContext, useThemeContext } from '../Contexts/ThemeContext';
import DialogBox from './DialogBox';

const ChatHead = () => {
  const { user, logout } = useLoggedUserContext();
  const { setOpenSettings, openProfile, setOpenProfile, setOpenNewChat } =
    useContext(DataContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { theme } = useThemeContext();

  const iconsCss = {
    color: theme.palette.text.primary,
    bgcolor: theme.palette.background.default,
  };
  const themeModeMenu = {
    color: theme.palette.text.primary,
    bgcolor: theme.palette.background.default,
    '&:hover': {
      color: theme.palette.hover.primay,
      bgcolor: theme.palette.hover.primary,
    },
  };
  const handleSetting = () => {
    setOpenSettings(true);
    handleClose();
  };
  const handleLogout = () => {
    handleClose();
    logout();
  };
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 16px ',
          color: '#54656f',
          bgcolor: '#f0f2f5',
          color: theme.palette.text.primary,
          bgcolor: theme.palette.background.default,
          minHeight: '54px',
        }}
      >
        <Box>
          <Avatar src={user?.proImgLink} onClick={() => setOpenProfile(true)} />
        </Box>
        <Box sx={{ display: 'flex', gap: '2px', cursor: 'pointer' }}>
          <Tooltip title='Communities'>
            <IconButton>
              <GroupsRoundedIcon fontSize='md' sx={{ color: iconsCss }} />
            </IconButton>
          </Tooltip>
          <Tooltip title='Status'>
            <IconButton>
              <DonutLargeOutlinedIcon fontSize='md' sx={{ color: iconsCss }} />
            </IconButton>
          </Tooltip>
          <Tooltip title='Channels'>
            <IconButton>
              <RadioButtonCheckedOutlinedIcon
                fontSize='md'
                sx={{ color: iconsCss }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title='New chat'>
            <IconButton onClick={() => setOpenNewChat(true)}>
              <AddCommentRoundedIcon fontSize='md' sx={{ color: iconsCss }} />
            </IconButton>
          </Tooltip>

          <Tooltip title='Menu'>
            <IconButton
              id='basic-button'
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MoreVertOutlinedIcon fontSize='md' sx={{ color: iconsCss }} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{
              '.css-3dzjca-MuiPaper-root-MuiPopover-paper-MuiMenu-paper': {
                borderRadius: ' 16px',
                left: '190px !important',
                top: '70px !important',
                bgcolor: '#333',
                color: 'red',
              },
            }}
            id='basic-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem sx={{ ...themeModeMenu }} onClick={handleClose}>
              New Group
            </MenuItem>
            <MenuItem sx={{ ...themeModeMenu }} onClick={handleClose}>
              New commuinty
            </MenuItem>
            <MenuItem sx={{ ...themeModeMenu }} onClick={handleClose}>
              Starred messages
            </MenuItem>
            <MenuItem sx={{ ...themeModeMenu }} onClick={handleClose}>
              Select chats
            </MenuItem>
            <MenuItem sx={{ ...themeModeMenu }} onClick={handleSetting}>
              Settings
            </MenuItem>

            <DialogBox
              openBtn={<MenuItem sx={{ ...themeModeMenu }}>Log out</MenuItem>}
              content={
                <DialogTitle>Are you sure you want to logout?</DialogTitle>
              }
              yesFunction={handleLogout}
              noFunction={handleClose}
              BtnColor='#bf360c'
            />
            <Divider />
            <MenuItem sx={{ ...themeModeMenu }} onClick={handleClose}>
              Get Whatsapp for Windows
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </>
  );
};

export default ChatHead;
