import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';

const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        textAlign: 'center',
        p: 3,
      }}
    >
      <Typography variant="h1" color="primary" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" color="text.secondary" gutterBottom>
        Page not found
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Sorry, but the page you requested does not exist. You may have entered
        an incorrect address or the page has been removed.
      </Typography>
      <Link href="/" passHref>
        <Button variant="contained" color="primary">
          Return to home page
        </Button>
      </Link>
    </Box>
  );
};

export default NotFound;
