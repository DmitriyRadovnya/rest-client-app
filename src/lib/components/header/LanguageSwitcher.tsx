'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { IconButton, Menu, MenuItem } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleSelect = (newLocale: 'en' | 'ru') => {
    handleClose();
    if (newLocale !== locale) {
      const segments = pathname.split('/');
      segments[1] = newLocale; 
      router.push(segments.join('/'));
      document.cookie = `locale=${newLocale}; path=/`;
    }
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleOpen}>
        <LanguageIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => handleSelect('en')}>English</MenuItem>
        <MenuItem onClick={() => handleSelect('ru')}>Русский</MenuItem>
      </Menu>
    </>
  );
}