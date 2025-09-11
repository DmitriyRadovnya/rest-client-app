import React from 'react';
import RestClientContainer from '@/lib/components/rest-client/RestClientContainer';
import { Container } from '@mui/material';

const Page = () => {
  return (
    <>
      <Container maxWidth="xl" sx={{ flex: 1 }}>
        <RestClientContainer />
      </Container>
    </>
  );
};

export default Page;
