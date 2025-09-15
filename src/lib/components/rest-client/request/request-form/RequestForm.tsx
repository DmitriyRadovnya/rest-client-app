import React from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { METHOD_META, METHODS } from '@/lib/static/http/methods';
import RequestTabs from '@/lib/components/rest-client/request/request-tabs/RequestTabs';
import SendIcon from '@mui/icons-material/Send';
import { UserRequest } from '@/lib/components/rest-client/request/request.types';
import { Controller, SubmitHandler, useFormContext } from 'react-hook-form';
import { MethodType } from '@/lib/static/http/methods.types';
import { convertHeaders } from '@/lib/utils/convertHeaders';

const RequestForm = () => {
  const { control, handleSubmit } = useFormContext<UserRequest>();
  const methodHasBody = (m: MethodType) => m !== 'GET';

  const onSubmit: SubmitHandler<UserRequest> = async (req) => {
    const headers = convertHeaders(req.headers);

    const hasContentType = [...headers.keys()].some(
      (k) => k.toLowerCase() === 'content-type'
    );
    let body: BodyInit | undefined = undefined;

    if (methodHasBody(req.method) && req.body) {
      try {
        const parsed = JSON.parse(req.body);
        if (!hasContentType) headers.set('Content-Type', 'application/json');
        body = JSON.stringify(parsed);
      } catch {
        body = req.body;
      }
    }

    const res = await fetch(req.url, {
      method: req.method,
      headers,
      body,
    });

    const ct = res.headers.get('content-type') ?? '';
    const data = ct.includes('application/json')
      ? await res.json()
      : await res.text();

    console.log('status', res.status);
    console.log('headers', Object.fromEntries(res.headers.entries()));
    console.log('body', data);
  };

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      gap={2}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <FormControl>
          <InputLabel id="method-select-label">Method</InputLabel>
          <Controller
            name="method"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                labelId="method-select-label"
                id="method-select"
                label="Method"
                size="small"
              >
                {METHODS.map((item) => (
                  <MenuItem key={item} value={item}>
                    {METHOD_META[item].label}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
        <FormControl sx={{ flex: 1 }}>
          <Controller
            name="url"
            control={control}
            render={({ field }) => (
              <TextField {...field} id="url" label="Enter URL" size="small" />
            )}
          />
        </FormControl>
        <FormControl>
          <Button
            type="submit"
            variant="contained"
            size="medium"
            endIcon={<SendIcon />}
          >
            send
          </Button>
        </FormControl>
      </Box>
      <RequestTabs />
    </Box>
  );
};

export default RequestForm;
