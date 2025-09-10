import { Container } from '@mui/material';
import React from 'react';
import SignInForm from '@/lib/components/auth/sign-up/SignInForm';
import SignUpForm from '@/lib/components/auth/sign-in/SignUpForm';

const Page = () => {
  return (
    <>
      <Container maxWidth="xl">
        <SignInForm />
        <SignUpForm />
      </Container>
    </>
  );
};
export default Page;
