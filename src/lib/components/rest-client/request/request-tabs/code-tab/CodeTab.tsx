import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { CodeLangType } from '@/lib/static/codeGen/codeGen.types';
import { CODE_LANG_META, CODE_LANGS } from '@/lib/static/codeGen/codeGen';

const CodeTab = () => {
  const { control } = useFormContext<{ codeLang: CodeLangType }>();

  return (
    <Stack gap={2}>
      <Box display="flex">
        <FormControl size="small">
          <InputLabel id="code-lang-label">{'</>'}</InputLabel>
          <Controller
            name="codeLang"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                labelId="code-lang-label"
                id="code-lang"
                label="</>"
              >
                {CODE_LANGS.map((item) => (
                  <MenuItem key={item} value={item}>
                    {CODE_LANG_META[item].label}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
      </Box>
    </Stack>
  );
};

export default CodeTab;
