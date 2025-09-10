import React from 'react';
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="sticky">
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
