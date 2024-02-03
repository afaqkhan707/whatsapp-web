'use client';
import React, { useState, useContext, useEffect } from 'react';
import { Menu, MenuItem } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { GetAddedUsers } from '../Contexts/GetAddedUsers';
import { deleteDoc, db, doc } from '../firebase/friebaseConfig';
import { getLoggedUser } from '../Contexts/GetLoggedUser';
import { ThemeContext } from '../Contexts/ThemeContext';

const CustomMenu = ({ chatUser }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { user } = useContext(getLoggedUser);
  const { setCurrentChatUser } = useContext(GetAddedUsers);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const DeleteAddedUser = async (deletedDocId) => {
    const contactedUsersRef = doc(
      db,
      'users',
      user.userId,
      'contactedUsers',
      deletedDocId
    );
    await deleteDoc(contactedUsersRef);
    setCurrentChatUser(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { theme } = useContext(ThemeContext);

  const iconsCss = {
    color: theme.palette.text.primary,
    bgcolor: theme.palette.background.default,
  };
  return (
    <>
      <ExpandMoreIcon
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ color: iconsCss }}
      />

      <Menu
        className='moreIcon-sub'
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem className='moreIcon-sub' onClick={handleClose}>
          Archive Chat
        </MenuItem>
        <MenuItem className='moreIcon-sub' onClick={handleClose}>
          Mute notifications
        </MenuItem>
        <MenuItem
          className='moreIcon-sub'
          onClick={() => DeleteAddedUser(chatUser.id)}
        >
          Delete chat
        </MenuItem>
        <MenuItem className='moreIcon-sub' onClick={handleClose}>
          Pin chat
        </MenuItem>
        <MenuItem className='moreIcon-sub' onClick={handleClose}>
          Mark as unread
        </MenuItem>
        <MenuItem className='moreIcon-sub' onClick={handleClose}>
          Block
        </MenuItem>
      </Menu>
    </>
  );
};
export default CustomMenu;
