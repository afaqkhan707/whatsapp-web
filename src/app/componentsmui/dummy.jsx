{
  /* <SettingsSideBox
          icon={<NotificationsIcon fontSize='small' />}
          text='Notifications'
        />
        <SettingsSideBox icon={<LockIcon fontSize='small' />} text='Privacy' />
        <SettingsSideBox
          icon={<SecurityIcon fontSize='small' />}
          text='Security'
        />

      
        <SettingsSideBox
          icon={<DownloadIcon fontSize='small' />}
          text='Media auto-download'
        />
        <SettingsSideBox
          icon={<DescriptionIcon fontSize='small' />}
          text='Request account info'
        />
        <SettingsSideBox
          icon={<KeyboardIcon fontSize='small' />}
          text='Keyboard shortcuts'
        />
        <SettingsSideBox icon={<HelpIcon fontSize='small' />} text='Help' />
        <SettingsSideBox icon={<LogoutIcon fontSize='small' />} text='Logout' /> */
}

// const Message = ({ message, userId, onDelete }) => {
//   const isSentByMe = message.senderId === userId;

//   const messageStyle = {
//     borderRadius: isSentByMe ? '8px 0px 8px 8px' : '0px 8px 8px 8px',
//     bgcolor: isSentByMe ? '#d9fdd3' : '#f5f7fa',
//     maxWidth: '340px',
//     width: 'fit-content',
//     alignItems: 'center',
//     display: 'flex',
//     flexWrap: 'wrap',
//     wordWrap: 'break-word',
//     overflow: 'hidden',
//     marginBottom: '10px',
//     lineHeight: '19px',
//     justifySelf: isSentByMe ? 'end' : 'start',
//   };

//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const downloadFile = () => {
//     console.log('Downloaded');
//     // {
//     //   message.filesObj.fileDownloadLink;
//     // }
//   };
//   return (
//     <Box
//       sx={{
//         width: '100%',
//         padding: '8px 10px 8px 10px',
//         display: 'grid',
//       }}
//     >
//       <Box sx={messageStyle}>
//         <Typography
//           variant='h6'
//           sx={{
//             fontSize: '14px',
//             position: 'relative',
//             padding: '10px 4px 0px 10px',
//           }}
//         >
//           {message.filesObj && (
//             <Box
//               sx={{
//                 width: '300px',
//                 height: '192px',
//               }}
//             >
//               <Box sx={{ width: '300px', height: '124px' }}>
//                 <Avatar
//                   src={message.filesObj.fileDownloadLink}
//                   sx={{ width: '100%', height: '100%' }}
//                   variant='square'
//                 />
//                 {/* <Box
//                   component='img'
//                   sx={{
//                     height: 233,
//                     width: 350,
//                     maxHeight: { xs: 233, md: 167 },
//                     maxWidth: { xs: 350, md: 250 },
//                   }}
//                   alt='The house from the offer.'
//                 src={message.filesObj.fileDownloadLink}
//                 /> */}
//               </Box>
//               <Box sx={{ bgcolor: 'pink', flexGrow: 1 }}>
//                 <Typography
//                   variant='h3'
//                   sx={{ fontSize: '16px', color: '#333' }}
//                 >
//                   {message.filesObj.fileName}
//                 </Typography>
//                 <Box sx={{ display: 'flex' }}>
//                   <Download onClick={downloadFile} />
//                   <Typography
//                     variant='h6'
//                     sx={{ fontSize: '12px', color: '#333' }}
//                   >
//                     {message.filesObj.fileType}
//                   </Typography>
//                   {/* <Typography
//                   variant='h6'
//                   sx={{ fontSize: '12px', color: '#333' }}
//                 >
//                   {message.filesObj.fileSize}
//                 </Typography> */}
//                 </Box>
//               </Box>
//             </Box>
//           )}
//           {message.messageText}
//           <IconButton
//             id='basic-button'
//             aria-controls={open ? 'basic-menu' : undefined}
//             aria-haspopup='true'
//             aria-expanded={open ? 'true' : undefined}
//             onClick={handleClick}
//             onClose={handleClose}
//           >
//             <MoreVertOutlinedIcon sx={{ fontSize: '11px' }} />
//           </IconButton>
//         </Typography>
//         <Box
//           sx={{
//             marginTop: '6px',
//             display: 'flex',
//             justifyContent: 'space-between',
//           }}
//         >
//           <Menu
//             id='basic-menu'
//             anchorEl={anchorEl}
//             open={open}
//             onClose={handleClose}
//             MenuListProps={{
//               'aria-labelledby': 'basic-button',
//             }}
//           >
//             <MenuItem onClick={() => onDelete(message.msgDocId)} onClose={handleClose}>
//               Delete Msg
//             </MenuItem>
//             <MenuItem>Edit Msg</MenuItem>
//           </Menu>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';

export default function CircularIntegration() {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ m: 1, position: 'relative' }}>
        <Fab
          aria-label='save'
          color='primary'
          sx={buttonSx}
          onClick={handleButtonClick}
        >
          {success ? <CheckIcon /> : <SaveIcon />}
        </Fab>
        {loading && (
          <CircularProgress
            size={68}
            sx={{
              color: green[500],
              position: 'absolute',
              top: -6,
              left: -6,
              zIndex: 1,
            }}
          />
        )}
      </Box>
      <Box sx={{ m: 1, position: 'relative' }}>
        <Button
          variant='contained'
          sx={buttonSx}
          disabled={loading}
          onClick={handleButtonClick}
        >
          Accept terms
        </Button>
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              color: green[500],
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Box>
    </Box>
  );
}

// api for country callings
//   const [countries, setCountries] = React.useState([]);
//   const fetchCountries = async () => {
//     try {
//       const response = await fetch('https://restcountries.com/v3.1/all');

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       const data = await response.json();
//       setCountries(data.idd);
//       console.log(data.idd); // You can handle the data here
//     } catch (error) {
//       console.error('Error fetching countries:', error.message);
//       // You can handle errors here, e.g., show an error message to the user
//     }
//   };

//   React.useEffect(() => {
//     fetchCountries();
//   }, []);

// const bgLanding =
//   'https://img.freepik.com/premium-photo/3d-rendering-bunch-square-badges-with-whatsapp-logo-green-background_284880-352.jpg?size=626&ext=jpg&ga=GA1.1.1803636316.1701302400&semt=ais';

// const bgGreenImg = './bggreen.jpeg';
// const imgBgGreeen = './bg.jpg';
// const bgImg =
//   'https://img.freepik.com/premium-photo/3d-rendering-bunch-square-badges-with-whatsapp-logo-green-background_284880-352.jpg?size=626&ext=jpg&ga=GA1.1.1803636316.1701302400&semt=ais';

// const bgGreenImg = './bggreen.jpeg';

{
  /* <TextField
              label='Password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin='normal'
              variant='outlined'
              required
              error={!password.trim() && error.includes('password')}
              helperText={!password.trim() && error.includes('password') && error}
              sx={{ ...inputFieldCss }}
            /> */
}

{
  /* <TextField
              label='Confirm Password'
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              margin='normal'
              variant='outlined'
              required
              error={!confirmPassword.trim() && error.includes('confirmPassword')}
              helperText={
                !confirmPassword.trim() &&
                error.includes('confirmPassword') &&
                error
              }
              sx={{ ...inputFieldCss }}
            /> */
}
