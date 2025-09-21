import { Button } from '@mui/material';

export const SignOutButton = ({ onSignOut }: { onSignOut: () => void }) => {
  return (
    <Button color="inherit" onClick={onSignOut}>
      Sign Out
    </Button>
  );
};
