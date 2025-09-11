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
import RequestTabs from '@/lib/components/rest-client/request/RequestTabs/RequestTabs';
import SendIcon from '@mui/icons-material/Send';
import { UserRequest } from '@/lib/components/rest-client/request/request.types';
import { Controller, SubmitHandler, useFormContext } from 'react-hook-form';

const RequestForm = () => {
  const { control, handleSubmit } = useFormContext<UserRequest>();

  const onSubmit: SubmitHandler<UserRequest> = (data) => console.log(data);

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
