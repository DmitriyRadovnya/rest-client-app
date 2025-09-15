import React from 'react';
import { Box, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { UserRequest } from '@/lib/components/rest-client/request/request.types';

const BodyTab = () => {
  const { watch, setValue } = useFormContext<UserRequest>();
  const body = watch('body');
  const mode = watch('bodyMode');
  const headers = watch('headers');

  const handleChange = (
    _: React.MouseEvent<HTMLElement>,
    newMode: UserRequest['bodyMode'] | null
  ) => {
    if (!newMode) return;
    setValue('bodyMode', newMode, { shouldDirty: true });
  };

  return (
    <Stack>
      <Box>
        <ToggleButtonGroup
          size="small"
          color="primary"
          exclusive
          aria-label="body mode"
          value={mode}
          onChange={handleChange}
        >
          <ToggleButton value="json">JSON</ToggleButton>
          <ToggleButton value="text">Text</ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Stack>
  );
};

export default BodyTab;
