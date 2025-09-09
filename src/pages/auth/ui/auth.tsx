import React from 'react';
import { Container } from '@mui/material';
import { SignInForm } from '@/features/auth/sign-in';

const Auth = () => {
  return (
    <>
      <Container maxWidth="xl">
        <SignInForm />
      </Container>
    </>
  );
};

export default Auth;
