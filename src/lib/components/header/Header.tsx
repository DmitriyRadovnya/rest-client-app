import React from 'react';
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@mui/material';

const Header = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return (
    <AppBar position="sticky" elevation={trigger ? 4 : 0}>
      <Container maxWidth="xl">
        <Toolbar sx={{ display: 'flex' }}>
          <Typography variant="h6" component="a">
            REST Client
          </Typography>
          <Box ml="auto">sign out button here</Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
