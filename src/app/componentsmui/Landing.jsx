import React from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { AppBar, ListItemIcon, Toolbar, Typography } from '@mui/material';
import Image from 'next/image';
import whatsappTextLogo from '../assets/whatsappLogo.png';
import {
  PersonAdd,
  Login,
  MenuOpen,
  Home,
  ContactEmergency,
  FeaturedPlayList,
} from '@mui/icons-material';
import Link from 'next/link';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useRouter } from 'next/router';

const Landing = () => {
  const [open, setOpen] = React.useState(false);
  const [isMobileView, setIsMobileView] = React.useState(false);
  const router = useRouter();
  const toggleDrawer = () => setOpen(!open);
  // const handleResponsive = () => {
  //   if (window.innerWidth < 600) {
  //     setIsMobileView(true);
  //   } else {
  //     setIsMobileView(false);
  //   }
  // };

  React.useEffect(() => {
    const handleResize = () => {
      const isMobileWidth = window.innerWidth < 600;
      setIsMobileView(isMobileWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const routeToSignUp = () => {
    router.push('/signup');
  };
  const routeToLogin = () => {
    router.push('/signin');
  };

  return (
    <>
      <Box
        sx={{
          bgcolor: '#01260c',
          width: '100%',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <AppBar
          sx={{
            minHeight: '80px',
            color: '#fff',
            background: '#3333339e',
            backdropFilter: 'blur(16px)',
          }}
        >
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Image
              src={whatsappTextLogo}
              alt='TextLogo'
              width={130}
              height={30}
            />
            {isMobileView && (
              <Button onClick={toggleDrawer}>
                <MenuOpen color='primary' />
              </Button>
            )}

            {!isMobileView ? (
              <>
                <Box>
                  <Button color='inherit'>Home</Button>
                  <Button color='inherit'>Features</Button>
                  <Button color='inherit'>Contact</Button>
                </Box>
                <Box>
                  <Link href={'signin'} color='inherit'>
                    <Button
                      startIcon={<Login />}
                      color='inherit'
                      sx={{ color: '#fff' }}
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href={'signup'}>
                    <Button
                      endIcon={<PersonAdd />}
                      color='inherit'
                      sx={{ color: '#fff' }}
                    >
                      Signup
                    </Button>
                  </Link>
                </Box>
              </>
            ) : (
              <>
                <Drawer
                  anchor='right'
                  open={open}
                  onClose={toggleDrawer}
                  
                  PaperProps={{
                    sx: {
                      width: '100%',
                      maxWidth: 200,
                    },
                  }}
                >
                  <Box
                    sx={{ width: 200 }}
                    role='presentation'
                    onClick={toggleDrawer}
                  >
                    <List>
                      <ListItem>
                        <ListItemButton>
                          <ListItemIcon>
                            <Home />
                          </ListItemIcon>
                          <ListItemText primary='Home' />
                        </ListItemButton>
                      </ListItem>
                      <ListItem>
                        <ListItemButton>
                          <ListItemIcon>
                            <FeaturedPlayList />
                          </ListItemIcon>
                          <ListItemText primary='Features' />
                        </ListItemButton>
                      </ListItem>
                      <ListItem>
                        <ListItemButton>
                          <ListItemIcon>
                            <ContactEmergency />
                          </ListItemIcon>
                          <ListItemText primary='Contact' />
                        </ListItemButton>
                      </ListItem>
                      <ListItem onClick={routeToSignUp}>
                        <ListItemButton>
                          <ListItemIcon>
                            <PersonAdd />
                          </ListItemIcon>
                          <ListItemText primary='Singup' />
                        </ListItemButton>
                      </ListItem>
                      <ListItem onClick={routeToLogin}>
                        <ListItemButton>
                          <ListItemIcon>
                            <Login />
                          </ListItemIcon>
                          <ListItemText primary='SignIn' />
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </Box>
                </Drawer>
              </>
            )}
          </Toolbar>
        </AppBar>

        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            marginTop: '140px',
          }}
        >
          <Typography
            variant='h4'
            sx={{ color: '#25d366', color: '#fff', marginBottom: '16px' }}
          >
            WHATSAPP
          </Typography>
          <Typography variant='h6' sx={{ color: '#ccc', width: '80vw' }}>
            Whatsapp helps you connect and share with the people in your life
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Landing;
