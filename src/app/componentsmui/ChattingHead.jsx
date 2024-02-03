'use client';
import React from 'react';
import { useContext, useState } from 'react';
import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  MenuItem,
  Menu,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import VideocamIcon from '@mui/icons-material/Videocam';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { useThemeContext } from '../Contexts/ThemeContext';
import { GetAddedUsers } from '../Contexts/GetAddedUsers';

const ChattingHead = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [send, setSend] = useState(null);

  const open = Boolean(anchorEl);
  // const openDoc = Boolean(send);
  const { currentChatUser, setCurrentChatUser } = useContext(GetAddedUsers);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickDoc = (event) => {
    setSend(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setSend(null);
  };
  const handleCloseDropDown = () => {
    setAnchorEl(null);
    setSend(null);
  };
  const handleCloseChat = () => {
    setCurrentChatUser(null);
  };
  const { theme } = useThemeContext();
  const themeModeMenu = {
    color: theme.palette.text.primary,
    bgcolor: theme.palette.background.default,
    '&:hover': {
      color: theme.palette.hover.primay,
      bgcolor: theme.palette.hover.primary,
    },
  };
  return (
    <>
      <Box
        sx={{
          width: '100%',
          padding: '8px 16px ',
          bgcolor: '#f0f2f5',
          bgcolor: theme.palette.background.default,
          minHeight: '54px',
          maxHeight: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Avatar alt='User' src={currentChatUser.proImgLink} />
          <Box
            sx={{
              fontSize: '14px',
              color: '#111b21',
              color: theme.palette.text.primary,
            }}
          >
            <Typography variant='h6'>{currentChatUser.name}</Typography>
            <Typography variant='p'>
              <small>Last seen today at 13:08</small>
            </Typography>
          </Box>
        </Box>
        <Box sx={{ color: '#54656f', color: theme.palette.text.primary }}>
          <Tooltip title='Get the App for calling'>
            <Button
              variant='filledTonal'
              sx={{
                borderRadius: '25px',
              }}
            >
              <VideocamIcon />
              <ExpandMoreIcon />
            </Button>
          </Tooltip>
          <Tooltip title='Search...'>
            <IconButton
              sx={{ color: '#54656f', color: theme.palette.text.primary }}
            >
              <SearchIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Menu'>
            <IconButton
              id='basic-button'
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              sx={{
                color: theme.palette.text.primary,
                bgcolor: theme.palette.background.default,
              }}
            >
              <MoreVertOutlinedIcon fontSize='md' />
            </IconButton>
          </Tooltip>
          <Menu
            id='basic-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem sx={{ ...themeModeMenu }}>Contact info</MenuItem>
            <MenuItem sx={{ ...themeModeMenu }}>Select messages</MenuItem>
            <MenuItem sx={{ ...themeModeMenu }} onClick={handleCloseChat}>
              Close chat
            </MenuItem>
            <MenuItem sx={{ ...themeModeMenu }}>Mute notifications</MenuItem>
            <MenuItem sx={{ ...themeModeMenu }}>Disappering messages</MenuItem>
            <MenuItem sx={{ ...themeModeMenu }}>Clear chat</MenuItem>
            <MenuItem sx={{ ...themeModeMenu }}>Delete chat</MenuItem>
            <MenuItem sx={{ ...themeModeMenu }}>Report</MenuItem>
            <MenuItem sx={{ ...themeModeMenu }}>Block</MenuItem>
          </Menu>
        </Box>
      </Box>
    </>
  );
};

export default ChattingHead;
