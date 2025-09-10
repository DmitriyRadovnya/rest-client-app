import React from 'react';
import { Box, Container } from '@mui/material';

const Page = () => {
  return (
    <>
      <Container maxWidth="xl">
        main content here
        <Box sx={{ height: '1500px' }}>example very long content</Box>
      </Container>
    </>
  );
};
export default Page;
