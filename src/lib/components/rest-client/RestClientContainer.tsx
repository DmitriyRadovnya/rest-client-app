'use client';
import React, { ChangeEvent, useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { METHOD_META, METHODS } from '@/lib/static/http/methods';

type MethodType = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface UserRequest {
  method: MethodType;
  url: string;
  headers: {
    [key: string]: string;
  };
  body: string;
}

const initialState: UserRequest = {
  method: 'GET',
  url: '',
  headers: {},
  body: '',
};

const RestClientContainer = () => {
  const [request, setRequest] = useState<UserRequest>(initialState);
  const selectHandleChange = (e: SelectChangeEvent<MethodType>) => {
    const { value } = e.target;
    setRequest((prevState) => ({ ...prevState, method: value }));
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRequest((prevState) => ({ ...prevState, [name]: value }));
  };
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography>
        {request.url ? request.url : 'Enter URL to perform a request'}
      </Typography>
      <Typography>current {request.method}</Typography>
      <Box component="form" display="flex" gap={2}>
        <FormControl>
          <InputLabel id="method-select-label">Method</InputLabel>
          <Select
            labelId="method-select-label"
            id="method-select"
            value={request.method}
            name="method"
            label="Method"
            onChange={selectHandleChange}
          >
            {METHODS.map((item) => (
              <MenuItem key={item} value={item}>
                {METHOD_META[item].label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <TextField
            id="url"
            label="Enter URL"
            value={request.url}
            name="url"
            onChange={handleChange}
          />
        </FormControl>
      </Box>
    </Box>
  );
};

export default RestClientContainer;
