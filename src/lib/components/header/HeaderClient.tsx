'use client';

import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  useScrollTrigger
} from '@mui/material';
import type { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { createClient } from '@/lib/providers/supabase/client';
import { SignOutButton } from './SignOutButton';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Link } from '@/i18n/routing';
import { LocalizedButtonLink } from './LocalizedButtonLink';

export const HeaderClient = ({ initialUser }: { initialUser: User | null }) => {
  const t = useTranslations('Header');
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(initialUser);
  const router = useRouter();
  const locale = useLocale();
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push(`/${locale}`);
  };

  return (
    <AppBar position="sticky" elevation={trigger ? 4 : 0}>
      <Container maxWidth="xl">
        <Toolbar sx={{ display: 'flex' }}>
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 'bold',
            }}
          >
            REST Client
          </Typography>

          <Box ml="auto" sx={{ display: 'flex', alignItems: 'center' }}>
            <LanguageSwitcher />

            {!user ? (
              <>
                <LocalizedButtonLink href="/signin" color="inherit">
                  {t('signin')}
                </LocalizedButtonLink>
                <LocalizedButtonLink href="/signup" color="inherit">
                  {t('signup')}
                </LocalizedButtonLink>
              </>
            ) : (
              <SignOutButton onSignOut={handleSignOut} />
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
