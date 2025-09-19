import React, { useCallback, useEffect, useState } from 'react';
import { Autocomplete, FormControl, Stack, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { CODE_VARIANTS } from '@/lib/static/codeGen/codeGen';
import { UserRequest } from '@/lib/components/rest-client/request/request.types';

const CodeTab = () => {
  const { control, watch, getValues, setValue } = useFormContext<UserRequest>();
  const snippet = watch('snippet');
  const codeVariant = watch('codeVariant');
  const [loading, setLoading] = useState(false);

  const { lang, variant } = codeVariant;

  const generate = useCallback(async () => {
    const { method, url, headers, body } = getValues();
    const newHeaders = headers
      .filter((h) => h.enabled && h.key)
      .map((h) => ({ key: h.key, value: h.value ?? '' }));
    setLoading(true);
    setValue('snippet', '// Generating…', { shouldDirty: false });
    try {
      const res = await fetch('/api/codegen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lang: lang,
          variant: variant,
          request: {
            method,
            url,
            headers: newHeaders,
            body: body,
          },
        }),
      });
      const data = await res.json();

      setValue('snippet', data.snippet ?? '', { shouldDirty: false });
    } catch (e) {
      setValue('snippet', `// Codegen error: ${(e as Error).message}`, {
        shouldDirty: false,
      });
    } finally {
      setLoading(false);
    }
  }, [getValues, setValue, lang, variant]);

  useEffect(() => {
    if (!codeVariant) return;
    void generate();
  }, [codeVariant, codeVariant.lang, codeVariant.variant, generate]);

  return (
    <Stack spacing={2}>
      <FormControl>
        <Controller
          name="codeVariant"
          control={control}
          render={({ field }) => (
            <Autocomplete
              loading={loading}
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
