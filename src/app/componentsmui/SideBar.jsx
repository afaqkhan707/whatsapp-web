import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
const Sidebar = () => {
  return (
    <>
      <Box component='section' sx={{ height: '30vh' }}>
        <Button color='primary' variant='contained'>
          Button
        </Button>
        <Button color='primary' variant='contained'>
          Button
        </Button>
        <Button color='primary' variant='contained'>
          b3
        </Button>
      </Box>
    </>
  );
};

export default Sidebar;
