'use client';

import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import theme from '@/app/theme';
import { FC, PropsWithChildren } from 'react';
import Footer from '@/lib/components/footer/Footer';

const MuiProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
        <Footer />
      </Container>
    </ThemeProvider>
  );
};

export default MuiProvider;
