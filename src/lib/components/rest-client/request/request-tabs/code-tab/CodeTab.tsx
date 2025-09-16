import React from 'react';
import { Autocomplete, FormControl, Stack, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { CODE_VARIANTS } from '@/lib/static/codeGen/codeGen';
import { UserRequest } from '@/lib/components/rest-client/request/request.types';

const CodeTab = () => {
  const { control, watch, setValue } = useFormContext<UserRequest>();
  const snippet = watch('snippet');

  return (
    <Stack spacing={2}>
      <FormControl>
        <Controller
          name="codeVariant"
          control={control}
          render={({ field }) => (
            <Autocomplete
              value={field.value}
              onChange={(_, v) => field.onChange(v)}
              getOptionLabel={(o) => o.label}
              isOptionEqualToValue={(a, b) =>
                a.lang === b.lang && a.variant === b.variant
              }
              options={CODE_VARIANTS}
              renderInput={(params) => (
                <TextField {...params} label="Language / Variant" />
              )}
            />
          )}
        />
      </FormControl>
      <FormControl>
        <Controller
          name="snippet"
          control={control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                value={snippet}
                multiline
                minRows={8}
                maxRows={24}
                label="Code"
                aria-readonly
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
              />
            );
          }}
        />
      </FormControl>
    </Stack>
  );
};

export default CodeTab;
