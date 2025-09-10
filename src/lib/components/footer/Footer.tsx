import React from 'react';
import { Box, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
  return (
    <Box
      display="flex"
      justifyContent="space-evenly"
      alignItems="center"
      paddingY={1}
      mt="auto"
      borderTop="1px solid"
    >
      <Box
        component="a"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <GitHubIcon />
        <Typography>GitHub</Typography>
      </Box>
      <Box>2025</Box>
      <Box>logo</Box>
    </Box>
  );
};

export default Footer;
