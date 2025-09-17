import React from 'react';
import { Box, Container } from '@mui/material';
import AboutUs from '@/lib/components/about-us/AboutUs';

const Page = () => {
  return (
    <>
      <Container maxWidth="xl">
        <AboutUs />
        main content here
        <Box sx={{ height: '1500px' }}>example very long content</Box>
      </Container>
    </>
  );
};
export default Page;
