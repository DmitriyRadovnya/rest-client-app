import React from 'react';
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import { SignOutButton } from '@/features/auth/sign-out';

const Header = () => {
  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar sx={{ display: 'flex' }}>
          <Typography variant="h6" component="a">
            REST Client
          </Typography>
          <Box ml="auto">
            <SignOutButton />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
