import React, { useContext, useState } from 'react';
import { Box, IconButton, Typography, Avatar, TextField } from '@mui/material';
import { getLoggedUser } from '../Contexts/GetLoggedUser';
import { DataContext } from '../Contexts/MyContextProvider';
import SideBarHeading from './SideBarHead';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import { updateDoc, db, doc } from '../firebase/friebaseConfig';
import { useThemeContext } from '../Contexts/ThemeContext';

const UserProfile = ({ sx }) => {
  const { user } = useContext(getLoggedUser);
  const { openProfile, setOpenProfile, updateUserInfo } =
    useContext(DataContext);

  const [editingName, setEditingName] = useState(false);
  const [editingAbout, setEditingAbout] = useState(false);
  const [editingNumber, setEditingNumber] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || '');
  const [editedAbout, setEditedAbout] = useState(user?.about || '');
  const [editedNumber, setEditedNumber] = useState(user?.number || '');

  const handleSaveName = async () => {
    if (user && user.userId) {
      const docRef = doc(db, 'users', user.userId);

      try {
        await updateDoc(docRef, {
          name: editedName,
        });
        setEditingName(false);
      } catch (error) {
        console.error('Error updating document:', error);
      }
    }
  };
  const handleSaveBio = async () => {
    if (user && user.userId) {
      const docRef = doc(db, 'users', user.userId);

      try {
        await updateDoc(docRef, {
          bio: editedAbout,
        });
        setEditingAbout(false);
      } catch (error) {
        console.error('Error updating document:', error);
      }
    }
  };
  const handleSaveNumber = async () => {
    if (user && user.userId) {
      const docRef = doc(db, 'users', user.userId);

      try {
        await updateDoc(docRef, {
          number: editedNumber,
        });
        setEditingNumber(false);
      } catch (error) {
        console.error('Error updating document:', error);
      }
    }
  };
  const { theme } = useThemeContext();
  const iconsCss = {
    color: theme.palette.text.primary,
    bgcolor: theme.palette.background.default,
  };
  return (
    <>
      <Box
        sx={sx}
        style={
          openProfile
            ? {
                transform: 'translateX(0%)',
                display: 'flex',
                flexDirection: 'column',
              }
            : { transform: 'translateX(-100%)' }
        }
      >
        <SideBarHeading label='Profile' onClick={() => setOpenProfile(false)} />
        <Box
          sx={{
            bgcolor: '#f0f2f6',
            bgcolor: theme.palette.background.default,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: '20px 0px',
          }}
        >
          <label htmlFor='avatar-input'>
            <Avatar
              src={user?.proImgLink}
              alt='userProImg'
              sx={{ width: 180, height: 180, cursor: 'pointer' }}
            />

            <input
              id='avatar-input'
              type='file'
              accept='image/*'
              // onChange={handleChange}
              style={{ display: 'none' }}
            />
          </label>
        </Box>

        <Box
          sx={{
            bgcolor: '#f0f2f6',
            bgcolor: theme.palette.background.default,
            flexGrow: '1',
          }}
        >
          <Box
            sx={{
              minHeight: '56px',
              padding: '10px 30px',
              bgcolor: '#fff',
              bgcolor: theme.palette.background.default,
            }}
          >
            <Typography
              variant='subtitle1'
              sx={{ color: '#008069', fontSize: '12px' }}
            >
              Your Name
            </Typography>
            {editingName ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  type='text'
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  fullWidth
                  size='small'
                  defaulValue={user?.name}
                  helperText='edit your name here...'
                />
                <IconButton onClick={handleSaveName}>
                  <DoneIcon sx={{ color: iconsCss }} />
                </IconButton>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                  variant='subtitle1'
                  flexGrow={1}
                  sx={{
                    color: '#3b4a54',
                    color: theme.palette.text.primary,
                    fontSize: '14px',
                  }}
                >
                  {user?.name}
                </Typography>
                <IconButton onClick={() => setEditingName(true)}>
                  <EditIcon fontSize='small' sx={{ color: iconsCss }} />
                </IconButton>
              </Box>
            )}
          </Box>

          <Box
            sx={{
              minHeight: '66px',
              padding: '14px 30px',
              bgcolor: '#f0f2f6',
              bgcolor: theme.palette.background.default,
            }}
          >
            <Typography
              variant='body1'
              sx={{
                color: '#667781',
                color: theme.palette.text.primary,
                fontSize: '0.8rem',
                lineHeight: '1.4',
              }}
            >
              This is not your username or pin. This name will be visible to
              your WhatsApp contacts.
            </Typography>
          </Box>
          <Box
            sx={{
              minHeight: '56px',
              padding: '10px 30px',
              bgcolor: '#fff',
              bgcolor: theme.palette.background.default,
            }}
          >
            <Typography
              variant='subtitle1'
              sx={{
                color: '#008069',
                color: theme.palette.text.primary,
                fontSize: '12px',
              }}
            >
              About
            </Typography>
            {editingAbout ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  type='text'
                  value={editedAbout}
                  onChange={(e) => setEditedAbout(e.target.value)}
                  fullWidth
                  size='small'
                  defaulValue={user?.bio}
                  helperText='edit your bio here...'
                />
                <IconButton onClick={handleSaveBio}>
                  <DoneIcon sx={{ color: iconsCss }} />
                </IconButton>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                  variant='subtitle1'
                  flexGrow={1}
                  sx={{
                    color: '#3b4a54',
                    color: theme.palette.text.primary,
                    fontSize: '14px',
                  }}
                >
                  {user?.bio}
                </Typography>
                <IconButton onClick={() => setEditingAbout(true)}>
                  <EditIcon fontSize='small' sx={{ color: iconsCss }} />
                </IconButton>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              minHeight: '66px',
              padding: '14px 30px',
              bgcolor: '#fff',
              bgcolor: theme.palette.background.default,
            }}
          >
            <Typography
              variant='subtitle1'
              sx={{ color: '#008069', fontSize: '12px' }}
            >
              Contact Number
            </Typography>
            {editingNumber ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  type='text'
                  value={editedNumber}
                  onChange={(e) => setEditedNumber(e.target.value)}
                  fullWidth
                  size='small'
                  defaulValue={user?.number}
                  helperText='edit your number here...'
                />
                <IconButton onClick={handleSaveNumber}>
                  <DoneIcon sx={{ color: iconsCss }} />
                </IconButton>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                  variant='subtitle1'
                  flexGrow={1}
                  sx={{
                    color: '#3b4a54',
                    color: theme.palette.text.primary,
                    fontSize: '14px',
                  }}
                >
                  {user?.number}
                </Typography>
                <IconButton onClick={() => setEditingNumber(true)}>
                  <EditIcon fontSize='small' sx={{ color: iconsCss }} />
                </IconButton>
              </Box>
            )}

            {/* <Typography
              variant='subtitle1'
              flexGrow={1}
              sx={{
                color: '#3b4a54',
                color: theme.palette.text.primary,
                fontSize: '14px',
              }}
            >
              {user?.number}
            </Typography> */}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UserProfile;
