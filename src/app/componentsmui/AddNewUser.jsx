'use client';
import React, { useContext } from 'react';
import { Avatar, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { GetRegUsersContext } from '../Contexts/getRegUsers';
import { GetAddedUsers } from '../Contexts/GetAddedUsers';
import { DataContext } from '../Contexts/MyContextProvider';
import { ThemeContext } from '../Contexts/ThemeContext';

const AddNewUser = () => {
  const { userCollection } = useContext(GetRegUsersContext);

  const { addNewUser } = useContext(GetAddedUsers);

  const { setOpenNewChat } = useContext(DataContext);
  const { theme } = useContext(ThemeContext);
  return (
    <>
      {userCollection?.map((addUser, index) => (
        <Box
          key={index}
          onClick={() => addNewUser(addUser, setOpenNewChat)}
          sx={{
            // bgcolor: '#fff',
            bgcolor: theme.palette.background.default,
            // color: '#3b4a54',
            // color: '#111b21',
            color: theme.palette.text.primary,
            display: 'flex',
            alignItems: 'center',
            minHeight: '50px',
            cursor: 'pointer',
            borderTop: '1px solid #e9edef',
            '&:hover': {
              transition: 'all 0.4s',
              bgcolor: '#f0f2f5',
              bgcolor: theme.palette.hover.primary,
            },
          }}
        >
          <Box sx={{ padding: '8px 16px' }}>
            <Avatar alt='User' src={addUser.proImgLink} />
          </Box>
          <Box
            sx={{
              flexGrow: '1',
            }}
          >
            <Box>
              <Typography variant='p'>{addUser.name}</Typography>
            </Box>
            <Box
              sx={{
                color: '#667781',
                fontSize: '12px',
                marginTop: '3px',
              }}
            >
              <Typography variant='p'>{addUser.bio}</Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </>
  );
};

export default AddNewUser;
