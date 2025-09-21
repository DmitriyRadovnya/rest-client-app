import { Button } from '@mui/material';
import { useTranslations } from 'next-intl';

export const SignOutButton = ({ onSignOut }: { onSignOut: () => void }) => {
  const t = useTranslations('SignOut');
  return (
    <Button color="inherit" onClick={onSignOut}>
      {t('signout')}
    </Button>
  );
};
