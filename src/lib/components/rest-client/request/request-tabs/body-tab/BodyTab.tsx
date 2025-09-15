import React from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { UserRequest } from '@/lib/components/rest-client/request/request.types';
import { checkContentType } from '@/lib/utils/checkContentType';
import { isJSON } from '@/lib/utils/isJSON';

const BodyTab = () => {
  const { watch, setValue, control } = useFormContext<UserRequest>();
  const body = watch('body');
  const mode = watch('bodyMode');
  const headers = watch('headers');

  const handleChange = (
    _: React.MouseEvent<HTMLElement>,
    newMode: UserRequest['bodyMode'] | null
  ) => {
    if (!newMode) return;
    setValue('bodyMode', newMode, { shouldDirty: true });
    if (newMode === 'json') {
      const checkedHeaders = checkContentType(headers);
      setValue('headers', checkedHeaders, { shouldDirty: true });
    }
  };

  return (
    <Stack gap={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
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
        <ButtonGroup
          color="primary"
          variant="outlined"
          aria-label="body format"
          disabled={!body || mode !== 'json'}
        >
          <Button>Prettify</Button>
          <Button>Minify</Button>
        </ButtonGroup>
      </Box>
      <Controller
        name="body"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              multiline
              minRows={8}
              maxRows={24}
              onChange={(e) =>
                setValue('body', e.target.value, { shouldDirty: true })
              }
              label={mode === 'json' ? 'JSON' : 'Text'}
              error={mode === 'json' && !isJSON(body)}
              helperText={
                mode === 'json' && !isJSON(body) ? 'Enter valid JSON' : ' '
              }
            />
          );
        }}
      />
    </Stack>
  );
};

export default BodyTab;
