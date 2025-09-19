'use client';

import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, useScrollTrigger } from '@mui/material';
import Link from 'next/link';
import type { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/providers/supabase/client';
import { SignOutButton } from './SignOutButton';

export const HeaderClient = ({ initialUser }: { initialUser: User | null }) => {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(initialUser);
  const router = useRouter();

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push('/');
  };

  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });

  return (
   <AppBar position="sticky" elevation={trigger ? 4 : 0}>
      <Container maxWidth="xl">
        <Toolbar sx={{ display: 'flex' }}>
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}
          >
            REST Client
          </Typography>

          <Box ml="auto">
            {!user ? (
              <>
                <Button component={Link} href="/signin" color="inherit">Sign In</Button>
                <Button component={Link} href="/signup" color="inherit">Sign Up</Button>
              </>
            ) : (
              <SignOutButton onSignOut={handleSignOut} />
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}