import { SyntheticEvent, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
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
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import { convertHeaders } from '@/lib/utils/convertHeaders';
import { resolveUrl } from '@/lib/utils/resolveUrl';

const RequestForm = () => {
  const { control, handleSubmit } = useFormContext<UserRequest>();
  const [open, setOpen] = useState(false);
  const methodHasBody = (m: MethodType) => m !== 'GET';

  const handleClose = (
    event: SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

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

    try {
      const res = await fetch(req.url, {
        method: req.method,
        headers,
        body,
      });
    } catch (e) {
      setOpen(true);
      console.error(e);
    }
  };

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      gap={2}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="message should be here"
      />
      <Box display="flex" alignItems="start" gap={2}>
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
          <FormHelperText>&nbsp;</FormHelperText>
        </FormControl>
        <FormControl sx={{ flex: 1 }}>
          <Controller
            name="url"
            control={control}
            rules={{
              required: 'Enter valid URL',
              validate: (arg) => !!resolveUrl(arg) || 'Enter valid URL',
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                id="url"
                label="Enter URL"
                size="small"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
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
