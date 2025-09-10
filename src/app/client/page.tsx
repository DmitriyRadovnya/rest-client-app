import React from 'react';
import RestClientContainer from '@/lib/components/rest-client/RestClientContainer';
import { Container } from '@mui/material';

const Page = () => {
  return (
    <>
      <Container maxWidth="xl" sx={{ flex: 1, border: '1px solid red' }}>
        <RestClientContainer />
      </Container>
    </>
  );
};

export default Page;
