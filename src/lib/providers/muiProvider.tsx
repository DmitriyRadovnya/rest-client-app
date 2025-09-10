'use client';

import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import theme from '@/app/theme';
import { FC, PropsWithChildren } from 'react';
import Header from '@/lib/components/header/Header';
import Footer from '@/lib/components/footer/Footer';

const MuiProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container
        maxWidth="xl"
        disableGutters
        sx={{
          border: '1px solid red',
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
