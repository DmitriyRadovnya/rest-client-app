import React from 'react';
import { Box, Link } from '@mui/material';
import Image from 'next/image';
import GitHubIcon from '@mui/icons-material/GitHub';
import schoolLogo from '../../../../public/rss-logo.png';

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
      <Link
        href="https://github.com/DmitriyRadovnya/rest-client-app"
        display="flex"
        flexDirection="column"
        alignItems="center"
        target="_blank"
        rel="noopener noreferrer"
        underline="hover"
        sx={{ mt: 1, fontWeight: 'bold', color: 'text.secondary' }}
      >
        <GitHubIcon />
        GitHub
      </Link>

      <Box>2025</Box>
      <Link
        href="https://rs.school/"
        target="_blank"
        rel="noopener noreferrer"
        sx={{ display: 'inline-block' }}
        textAlign={'center'}
      >
        <Image src={schoolLogo} alt="RS School" width={50} height={50} />
      </Link>
    </Box>
  );
};

export default Footer;
